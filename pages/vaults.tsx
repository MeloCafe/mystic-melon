import { gql } from '@apollo/client'

import apolloClient from '../apollo-client'
import { Vault } from '../types'

export default function Vaults({ vaults }: { vaults: Vault[] }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      {vaults.map((vault) => (
        <div key={vault.id}>
          <div>{vault.name}</div>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
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
