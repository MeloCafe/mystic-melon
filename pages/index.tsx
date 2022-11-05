import { ConnectKitButton } from 'connectkit'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  useEffect(() => {
    console.info('account is now', address)
  }, [address])

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <ConnectKitButton theme="rounded" />
      </div>
    </div>
  )
}
