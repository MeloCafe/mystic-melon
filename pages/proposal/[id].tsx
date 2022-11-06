import { gql } from '@apollo/client'
import styled from '@emotion/styled'

import apolloClient from '../../apollo-client'
import { colors } from '../../styles/colors'
import { Proposal as ProposalType } from '../../types'

export default function Proposal({ proposal }: { proposal: ProposalType }) {
  if (!proposal) {
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
      <div>Proposal</div>
      <Title>{proposal.title}</Title>
      <VaultDetails>{proposal.vault.name}</VaultDetails>
    </div>
  )
}

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.green400};
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
        }
      }
    `,
    variables: { id: params.id },
  })

  return {
    props: {
      proposal: data.proposal,
    },
  }
}
