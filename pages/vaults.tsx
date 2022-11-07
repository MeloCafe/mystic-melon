import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import Link from 'next/link'

import apolloClient from '../apollo-client'
import { colors } from '../styles/colors'
import { Vault } from '../types'

export default function Vaults({ vaults }: { vaults: Vault[] }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      {vaults.map((vault, i) => {
        return (
          <StyledLink key={vault.id} href={`/vault/${vault.id}`}>
            <div>
              {i + 1}. {vault.name}
            </div>
          </StyledLink>
        )
      })}
    </div>
  )
}

const StyledLink = styled(Link)`
  color: ${colors.green400};
  align-self: flex-start;

  &:hover {
    color: ${colors.green300};
  }
`

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: gql`
      query Vaults {
        vaults {
          id
          collection
          name
          proposed
          executed
        }
      }
    `,
  })

  return {
    props: {
      vaults: data.vaults,
    },
  }
}
