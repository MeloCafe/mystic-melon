import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import Link from 'next/link'

import apolloClient from '../apollo-client'
import { colors } from '../styles/colors'
import { Proposal } from '../types'

export default function Proposals({ proposals }: { proposals: Proposal[] }) {
  return (
    <div
      className="w-full h-full min-h-screen flex flex-col"
      style={{ paddingLeft: '48px', paddingRight: '48px', gap: '12px' }}
    >
      <Title>All proposals</Title>
      {proposals.map((proposal, i) => {
        return (
          <ProposalItem key={proposal.id}>
            <StyledLink href={`/proposal/${proposal.id}`}>
              <div>
                {i + 1}. {proposal.title}
              </div>
            </StyledLink>
            <VaultLabel>{proposal.vault.name}</VaultLabel>
            {proposal.executed && <VaultLabel>Executed</VaultLabel>}
          </ProposalItem>
        )
      })}
    </div>
  )
}

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.green400};
`

const ProposalItem = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: ${colors.gray400};

  &:hover {
    color: ${colors.gray300};
  }
`

const VaultLabel = styled.div`
  background-color: ${colors.green300};
  color: ${colors.green400};
  padding: 2px 4px;
  border-radius: 5px;
`

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query Proposals {
        proposals {
          executed
          id
          title
          description
          executedAt
          executedTx
          vault {
            id
            collection
            name
            proposed
            executed
          }
        }
      }
    `,
  })

  return {
    props: {
      proposals: data.proposals,
    },
  }
}
