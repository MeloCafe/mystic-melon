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
    <div className="w-full h-full min-h-screen" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      <StyledLink href="/new-proposal">+ New proposal</StyledLink>
    </div>
  )
}

const StyledLink = styled(Link)`
  padding: 12px 12px;
  background-color: ${colors.green400};
  color: white;
  border-radius: 12px;
`
