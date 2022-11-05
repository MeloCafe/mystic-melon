import styled from '@emotion/styled'
import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

import { colors } from '../styles/colors'

export function HeaderNav() {
  return (
    <Container>
      <Left>
        <Title>🍈 Secret Melon</Title>
      </Left>
      <Right>
        <StyledLink href="/">Proposals</StyledLink>
        <StyledLink href="/">Votes</StyledLink>
        <ConnectKitButton theme="rounded" />
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;

  padding: 48px;
  color: ${colors.green400};
`

const Left = styled.div``

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  font-weight: 500;
  font-size: 24px;

  // connect kit button
  button:hover {
    transform: scale(1.05);
    transition-duration: 0.2s;
  }

  button {
    transition-duration: 0.2s;
  }
`

const StyledLink = styled(Link)`
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background-color: ${colors.green300};
    border-radius: 20px;
  }
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`
