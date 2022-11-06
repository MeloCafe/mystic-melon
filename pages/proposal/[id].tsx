import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import { ConnectKitButton } from 'connectkit'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { chain, useNetwork, useSigner, useSignMessage } from 'wagmi'

import apolloClient from '../../apollo-client'
import { useAccount, useContracts } from '../../contracts'
import { getStorageUrl } from '../../lib/ipfs'
import { colors } from '../../styles/colors'
import { Proposal as ProposalType, Transaction } from '../../types'

export default function Proposal({
  proposal,
  transactions,
}: {
  proposal?: ProposalType
  transactions?: Transaction[]
}) {
  const [description, setDescription] = useState('')
  const [eligibleVoters, setEligibleVoters] = useState(null)
  const [executing, setExecuting] = useState(false)
  const [numVotes, setNumVotes] = useState(null)
  const chainInfo = useNetwork().chain ?? chain.goerli
  const { data: signer } = useSigner()
  const { getVaultContract } = useContracts()

  const proposalExecuted = proposal?.executed ?? false

  const fetchNumVotes = useCallback(async () => {
    if (!proposal) return

    const votesRes = await fetch(`https://api.melo.cafe/votes?vault=${proposal.vault.id}&proposal=${proposal.id}`)
    const { votes } = await votesRes.json()
    setNumVotes(votes)
  }, [setNumVotes, proposal])

  useEffect(() => {
    async function prepareInfo() {
      if (!proposal) return

      const nftRes = await fetch(
        `https://api.melo.cafe/collection?address=${proposal.vault.collection}&chainId=${chainInfo.id}`
      )

      const {
        collection: { supply },
      } = await nftRes.json()
      setEligibleVoters(supply)

      fetchNumVotes()

      if (!proposal.description) return

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

    prepareInfo()
  }, [proposal, chainInfo.id, fetchNumVotes])

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

    fetchNumVotes()
  }, [proposal, address, signMessageAsync, fetchNumVotes])

  const executeProposal = async () => {
    if (!signer || !proposal || proposalExecuted) return

    setExecuting(true)
    try {
      const vaultContract = getVaultContract(proposal?.vault.id, signer)
      const proposalIdWithoutVault = BigNumber.from(proposal.id.split('-')[1]).toHexString()
      const proofRes = await fetch(
        `https://api.melo.cafe/proof/governor/${proposal.vault.id}/proposal/${proposalIdWithoutVault}`
      )
      const { proof } = await proofRes.json()

      const gasLimitTotal =
        proposal?.transactions?.reduce((total, tx) => BigNumber.from(tx.gas).add(total), BigNumber.from(0)) ??
        BigNumber.from('100000')

      const res = await vaultContract.executeProposal(
        {
          endBlock: proposal.endBlock,
          title: proposal.title,
          descriptionHash: proposal.description,
          transactions: proposal.transactions ?? [],
        },
        '0x' + proof,
        { gasLimit: gasLimitTotal.mul(50).toString() }
      )

      await res.wait()
    } catch (e) {
      // TODO: error
      console.log('error!', e)
    }

    setExecuting(false)
  }

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
      <VaultLabel href={`/vault/${proposal.vault.id}`}>{proposal.vault.name}</VaultLabel>

      <Title>{proposal.title}</Title>
      {eligibleVoters && numVotes !== null && (
        <div className="text-center text-lg">
          {numVotes ?? 0}/{eligibleVoters} votes
        </div>
      )}
      <div className="max-w-prose text-center">{description}</div>
      <div className="text-lg mt-6">Transactions</div>
      <div className="mt-4">
        {transactions.map((tx, i) => (
          <div key={i} className="flex flex-col">
            <div className="text-sm">To: {tx.to}</div>
            <div className="text-sm">
              Value: {tx.value} ({formatEther(tx.value)} ETH)
            </div>
            <div className="text-sm">Data: {tx.data}</div>
            <div className="text-sm">Gas: {tx.gas}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-sm flex flex-col items-center justify-center text-center">
        {statusMessage && <div className="text-sm">{statusMessage}</div>}
        {proposalExecuted && <div style={{ color: colors.green400 }}>Proposal executed!</div>}
        {address ? (
          <VoteButton className="w-full" disabled={proposalExecuted} onClick={submitVote}>
            Vote
          </VoteButton>
        ) : !proposalExecuted ? (
          <ConnectKitButton label="Connect to vote" theme="rounded" />
        ) : null}
        {numVotes !== null && eligibleVoters && numVotes / eligibleVoters > 0.5 && (
          <ExecuteButton disabled={executing || proposalExecuted} className="w-full" onClick={executeProposal}>
            {executing ? 'Executing...' : 'Execute proposal!'}
          </ExecuteButton>
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
  color: ${colors.green400};

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

const ExecuteButton = styled(VoteButton)`
  background-color: ${colors.green300};
  border: 3px solid ${colors.green400};
  color: ${colors.green400};
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.green400};
`

const VaultLabel = styled(Link)`
  background-color: ${colors.green300};
  color: ${colors.green400};
  padding: 2px 4px;
  border-radius: 5px;
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
          endBlock
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
