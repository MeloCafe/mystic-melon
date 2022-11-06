import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'

import FactoryABI from './abis/factory.abi.json'
import VaultABI from './abis/vault.abi.json'
import { FactoryAbi, VaultAbi } from './types/ethers-contracts'

export const VERIFIER_GOERLI = '0xd6b9e04598f87b154a4797465c194c27341d5031'

export function getVaultContract(provider: Provider | Signer, address: string) {
  return new Contract(address, VaultABI, provider) as VaultAbi
}

export function getFactoryContract(signer: Signer) {
  return new Contract('0xB51C1ec185de4fC8a910Cb6b9bD9b2a6ce9fBC18', FactoryABI, signer) as FactoryAbi
}
