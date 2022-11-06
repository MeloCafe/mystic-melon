import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

import apolloClient from '../../apollo-client'
import { getStorageUrl } from '../../lib/ipfs'
import { colors } from '../../styles/colors'
import { Proposal as ProposalType } from '../../types'

export default function Proposal({
  proposal,
  transactions,
}: {
  proposal?: ProposalType
  transactions:
    | {
        to: string
        value: string
        data: string
        gas: string
      }[]
    | undefined
}) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (proposal?.description) {
      const url = getStorageUrl(proposal.description)
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            return res.text()
          }
          return ''
        })
        .then(setDescription)
    }
  }, [proposal])

  const { address } = useAccount()

  const dataToSign = useMemo(() => {
    if (!proposal) return undefined
    return [`Voter: ${address}`, `Vault: ${proposal.vault.id}`, `Proposal: ${proposal.id}`].join('\n')
  }, [proposal, address])

  const { signMessageAsync } = useSignMessage({ message: dataToSign })

  const [statusMessage, setStatusMessage] = useState('')

  const submitVote = useCallback(async () => {
    if (!proposal || !address) return

    setStatusMessage('')

    let signature: string | undefined
    try {
      signature = await signMessageAsync()
    } catch (e) {
      console.error(e)

      if ((e as Error).message !== 'User rejected request') {
        setStatusMessage('Error signing message')
      }
      return
    }

    const res = await fetch('https://api.melo.cafe/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
        vault: proposal.vault.id,
        proposal: proposal.id,
        signature: signature,
      }),
    })

    if (res.status === 200) {
      setStatusMessage('Vote submitted!')
    } else {
      setStatusMessage('Error submitting vote! Please try again.')
    }
  }, [proposal, address, signMessageAsync])

  if (!proposal || !transactions) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        🤨 Invalid URL 🤨
      </div>
    )
  }

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center"
      style={{ paddingLeft: '48px', paddingRight: '48px' }}
    >
      <div className="mb-2">Proposal</div>
      <VaultDetails href={`/vault/${proposal.vault.id}`}>{proposal.vault.name}</VaultDetails>

      <Title className="mt-8">{proposal.title}</Title>
      <div className="max-w-prose text-center">{description}</div>
      <div className="text-lg mt-6">Transactions</div>
      <div className="mt-4">
        {transactions.map((tx, i) => (
          <div key={i} className="flex flex-col">
            <div className="text-sm">To: {tx.to}</div>
            <div className="text-sm">Value: {tx.value}</div>
            <div className="text-sm">Data: {tx.data}</div>
            <div className="text-sm">Gas: {tx.gas}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-sm flex flex-col items-center justify-center text-center">
        {statusMessage && <div className="text-sm">{statusMessage}</div>}
        {address ? (
          <VoteButton className="w-full" onClick={submitVote}>
            Vote
          </VoteButton>
        ) : (
          <ConnectKitButton label="Connect to vote" theme="rounded" />
        )}
      </div>
    </div>
  )
}

const VoteButton = styled.button`
  margin-top: 12px;
  background-color: ${colors.yellow100};
  padding: 12px;
  border-radius: 25px;
  text-align: center;
  border: 3px solid ${colors.yellow400};
  font-weight: 600;
  font-size: 24px;

  &:disabled {
    background-color: ${colors.gray100};
    border: 3px solid ${colors.gray300};
    color: ${colors.gray400};
  }

  &:disabled:hover {
    transform: none;
  }

  &:hover {
    transform: scale(1.05);
    transition-duration: 0.2s;
  }

  transition-duration: 0.2s;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.green400};
`

const VaultDetails = styled(Link)`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;

  background: ${colors.yellow100};
  border: 2px solid ${colors.yellow400};
  border-radius: 25px;
  padding: 8px 20px;
`

export async function getServerSideProps({ params }: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query Proposal($id: String!) {
        proposal(id: $id) {
          id
          executed
          title
          description
          executedAt
          executedTx
          vault {
            id
            collection
            name
          }
          transactions {
            to
            value
            data
            gas
          }
        }
      }
    `,
    variables: { id: params.id },
  })

  return {
    props: {
      proposal: data.proposal,
      transactions: data.proposal.transactions,
    },
  }
}
