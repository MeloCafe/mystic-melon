import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { chain, useAccount as useWagmiAccount, useNetwork } from 'wagmi'

import FactoryABI from './abis/factory.abi.json'
import VaultABI from './abis/vault.abi.json'
import { FactoryAbi, VaultAbi } from './types/ethers-contracts'

const VERIFIER_GOERLI = '0xdc5e5904dc9549e2a0045885145d4009c30b600a'
const VERIFIER_MUMBAI = '0x16c91389c6d37605e6141211707e2de1c34b4713'

const FACTORY_GOERLI = '0xB51C1ec185de4fC8a910Cb6b9bD9b2a6ce9fBC18'
const FACTORY_MUMBAI = '0xf54A3de5162D49098a94314eE6946807772aFA2A'

// grab addresses and ABIs via function so we're chain-aware
export function useContracts() {
  const network = useNetwork().chain ?? chain.goerli

  const factoryAddress = useMemo(() => {
    if (network.id === chain.polygonMumbai.id) {
      return FACTORY_MUMBAI
    }

    return FACTORY_GOERLI
  }, [network.id])

  const verifierAddress = useMemo(() => {
    if (network.id === chain.polygonMumbai.id) {
      return VERIFIER_MUMBAI
    }

    return VERIFIER_GOERLI
  }, [network.id])

  const getVaultContract = useCallback((address: string, provider: Provider | Signer) => {
    return new Contract(address, VaultABI, provider) as VaultAbi
  }, [])

  const getFactoryContract = useCallback(
    (signer: Signer) => {
      const address = network.id === chain.polygonMumbai.id ? FACTORY_MUMBAI : FACTORY_GOERLI
      return new Contract(address, FactoryABI, signer) as FactoryAbi
    },
    [network.id]
  )

  return {
    factoryAddress,
    verifierAddress,
    getFactoryContract,
    getVaultContract,
  }
}

// override wagmi's useAccount to work with NextJS SSR
// https://github.com/wagmi-dev/wagmi/issues/542
export function useAccount() {
  const { address, connector, isConnected } = useWagmiAccount()
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return { isLoaded, address: isLoaded ? address : null, connector, isConnected }
}
