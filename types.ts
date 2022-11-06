import { BigNumberish } from 'ethers'

export type NftDetails = {
  address: string
  name: string
  supply: number
  symbol: string
  type: string
  description?: string
  imageUrl?: string
}

export type Vault = {
  collection: string
  executed: BigNumberish
  proposed: BigNumberish
  id: string
  name: string
}

export type Proposal = {
  id: string
  executed: BigNumberish
  title: string
  description: string
  vault: Vault
}
