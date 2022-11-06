import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { chain, useNetwork } from 'wagmi'

import apolloClient from '../../apollo-client'
import NftDetails from '../../components/NftDetails'
import { colors } from '../../styles/colors'
import { NftDetails as NftDetailsType, Vault as VaultType } from '../../types'

export default function Vault({ vault }: { vault: VaultType }) {
  const [nftDetails, setNftDetails] = useState<NftDetailsType | null>(null)
  const [nftDetailsLoading, setNftDetailsLoading] = useState(true)
  const chainId = useNetwork().chain ?? chain.goerli

  useEffect(() => {
    if (!vault?.collection) return

    async function fetchNftDetails() {
      try {
        setNftDetailsLoading(true)

        const res = await fetch(`https://api.melo.cafe/collection?address=${vault.collection}&chainId=${chainId.id}`)
        const details = await res.json()
        setNftDetails(details.collection)
      } catch (e) {
        // TODO: handle error??
      }
      setNftDetailsLoading(false)
    }

    fetchNftDetails()
  }, [vault?.collection, chainId])

  if (!vault)
    return (
      <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        🤨 Invalid URL 🤨
      </div>
    )

  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      <Title>{vault.name}</Title>
      <br />
      <br />
      For holders of NFT collection:
      {nftDetails && <NftDetails details={nftDetails} />}
      {nftDetailsLoading && !nftDetails && (
        <RotatingLines
          visible={nftDetailsLoading}
          strokeColor={colors.green400}
          strokeWidth="5"
          animationDuration="0.75"
          width="25"
        />
      )}
    </div>
  )
}

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${colors.green400};
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
