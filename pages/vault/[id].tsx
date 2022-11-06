import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { chain, useNetwork } from 'wagmi'

import apolloClient from '../../apollo-client'
import { colors } from '../../styles/colors'
import { NftDetails as NftDetailsType, Vault as VaultType } from '../../types'

export default function Vault({ vault }: { vault: VaultType }) {
  const [nftDetails, setNftDetails] = useState<NftDetailsType | null>(null)
  const [nftDetailsLoading, setNftDetailsLoading] = useState(true)
  const chainInfo = useNetwork().chain ?? chain.goerli

  useEffect(() => {
    if (!vault?.collection) return

    async function fetchNftDetails() {
      try {
        setNftDetailsLoading(true)

        const res = await fetch(`https://api.melo.cafe/collection?address=${vault.collection}&chainId=${chainInfo.id}`)
        const details = await res.json()
        setNftDetails(details.collection)
      } catch (e) {
        // TODO: handle error??
      }
      setNftDetailsLoading(false)
    }

    fetchNftDetails()
  }, [vault?.collection, chainInfo])

  if (!vault)
    return (
      <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        🤨 Invalid URL 🤨
      </div>
    )

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center"
      style={{ paddingLeft: '48px', paddingRight: '48px', gap: '24px' }}
    >
      <div style={{ textAlign: 'center' }}>
        <div>Vault</div>
        <Title>{vault.name}</Title>
      </div>
      <VaultDetails>
        For holders of NFT collection:
        {nftDetails && (
          <StyledLink href={(chainInfo?.blockExplorers?.etherscan?.url || '') + '/address/' + nftDetails.address}>
            {nftDetails.name}
          </StyledLink>
        )}
        {nftDetailsLoading && !nftDetails && (
          <RotatingLines
            visible={nftDetailsLoading}
            strokeColor={colors.green400}
            strokeWidth="5"
            animationDuration="0.75"
            width="25"
          />
        )}
      </VaultDetails>
      {vault.proposals.length === 0 && (
        <NoProposal>
          This vault has no proposals yet! <Link href={`/new-proposal?vault_id=${vault.id}`}>Create a proposal.</Link>
        </NoProposal>
      )}
      {vault.proposals.length > 0 && (
        <div className="flex flex-col items-center">
          <Title>Proposals</Title>
          <ProposalsContainer>
            {vault.proposals.map((proposal, i) => (
              <Link href={`/proposal/${proposal.id}`} key={proposal.id}>
                {i + 1}. {proposal.title}
              </Link>
            ))}
          </ProposalsContainer>
        </div>
      )}
    </div>
  )
}

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.green400};
`

const ProposalsContainer = styled.div`
  display: flex;
  flex-flow: column;
  a:hover {
    color: ${colors.gray300};
  }
`

const NoProposal = styled.div`
  a {
    color: ${colors.green400};
  }

  a:hover {
    color: ${colors.green300};
  }
`

const VaultDetails = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;

  background: ${colors.yellow100};
  border: 2px solid ${colors.yellow400};
  border-radius: 25px;
  padding: 8px 20px;
`

const StyledLink = styled(Link)`
  font-weight: 500;

  &:hover {
    color: ${colors.gray300};
  }
`

export async function getServerSideProps({ params }: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query Vault($vault: String!) {
        vault(id: $vault) {
          id
          collection
          name
          proposed
          executed
          proposals {
            title
            id
            executed
            description
          }
        }
      }
    `,
    variables: { vault: params.id },
  })

  return {
    props: {
      vault: data.vault,
    },
  }
}
