import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import Link from 'next/link'

import apolloClient from '../apollo-client'
import { colors } from '../styles/colors'
import { Proposal } from '../types'

export default function Proposals({ proposals }: { proposals: Proposal[] }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      {proposals.map((proposal, i) => {
        return (
          <StyledLink key={proposal.id} href={`/proposal/${proposal.id}`}>
            <div>
              {i + 1}. {proposal.title}
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
