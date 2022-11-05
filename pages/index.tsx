import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import { HeaderNav } from '../components/HeaderNav'

export default function Home() {
  const { address } = useAccount()

  useEffect(() => {
    console.info('account is now', address)
  }, [address])

  return (
    <div className="w-full h-full min-h-screen">
      <HeaderNav />
    </div>
  )
}
