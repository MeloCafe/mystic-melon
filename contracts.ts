import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'

import VaultABI from './abis/vault.abi.json'
import { VaultAbi } from './types/ethers-contracts'

export function getVaultContract(provider: Provider | Signer, address: string) {
  return new Contract(address, VaultABI, provider) as VaultAbi
}
