import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import { colors } from '../styles/colors'

export default function Home() {
  const { address } = useAccount()

  useEffect(() => {
    console.info('account is now', address)
  }, [address])

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center"
      style={{ paddingLeft: '48px', paddingRight: '48px' }}
    >
      <Title>Welcome to Melo Cafe, a platform for on-chain anonymous voting using zk proofs!</Title>
      <Links>
        <StyledLink href="/new-vault">
          <ActionTitle>Create a vault</ActionTitle>
          <MainImage>🍉</MainImage>
          <Description>New to Melo Cafe? Create a vault for owners of a specific NFT collection.</Description>
        </StyledLink>
        <StyledLink href="/new-proposal">
          <ActionTitle>Create a proposal</ActionTitle>
          <MainImage>🍈</MainImage>
          <Description>Already have a vault? Create a proposal for eligible signers.</Description>
        </StyledLink>
      </Links>
    </div>
  )
}

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.green400};
  text-align: center;
`

const Description = styled.div``

const ActionTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.green400};
`

const MainImage = styled.div`
  font-size: 120px;
`

const Links = styled.div`
  display: flex;
  gap: 64px;
  align-self: stretch;
  margin: 32px 64px;

  @media only screen and (max-width: 900px) {
    flex-flow: column;
    gap: 24px;
  }
`

const StyledLink = styled(Link)`
  padding: 20px;
  flex: 1;
  text-align: center;

  background-color: white;
  border: 2px solid ${colors.green400};
  color: ${colors.green400};
  border-radius: 25px;

  &:hover,
  &:focus {
    transform: scale(1.05);
    transition-duration: 0.2s;
    outline: none;
  }

  transition-duration: 0.2s;
`
