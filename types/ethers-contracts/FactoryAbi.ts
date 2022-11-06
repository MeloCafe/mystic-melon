/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common'

export interface FactoryAbiInterface extends utils.Interface {
  functions: {
    'createVault(string,address,address)': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'createVault'): FunctionFragment

  encodeFunctionData(
    functionFragment: 'createVault',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string

  decodeFunctionResult(functionFragment: 'createVault', data: BytesLike): Result

  events: {}
}

export interface FactoryAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: FactoryAbiInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    createVault(
      _name: PromiseOrValue<string>,
      _nft: PromiseOrValue<string>,
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>
  }

  createVault(
    _name: PromiseOrValue<string>,
    _nft: PromiseOrValue<string>,
    _verifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    createVault(
      _name: PromiseOrValue<string>,
      _nft: PromiseOrValue<string>,
      _verifier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>
  }

  filters: {}

  estimateGas: {
    createVault(
      _name: PromiseOrValue<string>,
      _nft: PromiseOrValue<string>,
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    createVault(
      _name: PromiseOrValue<string>,
      _nft: PromiseOrValue<string>,
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>
  }
}