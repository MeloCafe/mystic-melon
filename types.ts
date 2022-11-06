import { BigNumberish, ethers } from 'ethers'

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
  proposals: Proposal[]
}

export type Transaction = {
  to: string
  value: string
  data: string
  gas: string
}

export type Proposal = {
  id: string
  executed: boolean
  title: string
  description: string
  vault: Vault
  endBlock: number
  transactions?: Transaction[]
}
