import styled from '@emotion/styled'
import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

export function HeaderNav() {
  return (
    <Container>
      <Left>
        <Title>🍈 Secret Melon</Title>
      </Left>
      <Right>
        <Link href="/">Proposals</Link>
        <ConnectKitButton theme="rounded" />
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`

const Left = styled.div``
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

const Title = styled.div`
  font-size: 32px;
`
