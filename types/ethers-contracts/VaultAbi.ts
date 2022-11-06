/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common'

export declare namespace MeloVault {
  export type TransactionStruct = {
    to: PromiseOrValue<string>
    value: PromiseOrValue<BigNumberish>
    data: PromiseOrValue<BytesLike>
    gas: PromiseOrValue<BigNumberish>
  }

  export type TransactionStructOutput = [string, BigNumber, string, BigNumber] & {
    to: string
    value: BigNumber
    data: string
    gas: BigNumber
  }

  export type ProposalStruct = {
    endBlock: PromiseOrValue<BigNumberish>
    title: PromiseOrValue<string>
    descriptionHash: PromiseOrValue<string>
    transactions: MeloVault.TransactionStruct[]
  }

  export type ProposalStructOutput = [BigNumber, string, string, MeloVault.TransactionStructOutput[]] & {
    endBlock: BigNumber
    title: string
    descriptionHash: string
    transactions: MeloVault.TransactionStructOutput[]
  }
}

export interface VaultAbiInterface extends utils.Interface {
  functions: {
    'blocksAllowedForExecution()': FunctionFragment
    'executeProposal((uint256,string,string,(address,uint256,bytes,uint256)[]),bytes)': FunctionFragment
    'maxBlocksInFuture()': FunctionFragment
    'name()': FunctionFragment
    'nft()': FunctionFragment
    'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)': FunctionFragment
    'onERC1155Received(address,address,uint256,uint256,bytes)': FunctionFragment
    'onERC721Received(address,address,uint256,bytes)': FunctionFragment
    'proposalBlockTimes(uint64)': FunctionFragment
    'proposalExecuted(uint64)': FunctionFragment
    'proposalHash((uint256,string,string,(address,uint256,bytes,uint256)[]))': FunctionFragment
    'propose((uint256,string,string,(address,uint256,bytes,uint256)[]))': FunctionFragment
    'setVerifier(address)': FunctionFragment
    'supportsInterface(bytes4)': FunctionFragment
    'verifier()': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'blocksAllowedForExecution'
      | 'executeProposal'
      | 'maxBlocksInFuture'
      | 'name'
      | 'nft'
      | 'onERC1155BatchReceived'
      | 'onERC1155Received'
      | 'onERC721Received'
      | 'proposalBlockTimes'
      | 'proposalExecuted'
      | 'proposalHash'
      | 'propose'
      | 'setVerifier'
      | 'supportsInterface'
      | 'verifier'
  ): FunctionFragment

  encodeFunctionData(functionFragment: 'blocksAllowedForExecution', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'executeProposal',
    values: [MeloVault.ProposalStruct, PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(functionFragment: 'maxBlocksInFuture', values?: undefined): string
  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(functionFragment: 'nft', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'onERC1155BatchReceived',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'onERC1155Received',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'onERC721Received',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(functionFragment: 'proposalBlockTimes', values: [PromiseOrValue<BigNumberish>]): string
  encodeFunctionData(functionFragment: 'proposalExecuted', values: [PromiseOrValue<BigNumberish>]): string
  encodeFunctionData(functionFragment: 'proposalHash', values: [MeloVault.ProposalStruct]): string
  encodeFunctionData(functionFragment: 'propose', values: [MeloVault.ProposalStruct]): string
  encodeFunctionData(functionFragment: 'setVerifier', values: [PromiseOrValue<string>]): string
  encodeFunctionData(functionFragment: 'supportsInterface', values: [PromiseOrValue<BytesLike>]): string
  encodeFunctionData(functionFragment: 'verifier', values?: undefined): string

  decodeFunctionResult(functionFragment: 'blocksAllowedForExecution', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'executeProposal', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'maxBlocksInFuture', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'nft', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'onERC1155BatchReceived', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'onERC1155Received', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'onERC721Received', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'proposalBlockTimes', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'proposalExecuted', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'proposalHash', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'propose', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setVerifier', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'verifier', data: BytesLike): Result

  events: {
    'MeloVaultCreated(string,address)': EventFragment
    'ProposalCreated(uint64,bytes32,tuple)': EventFragment
    'ProposalExecuted(uint64,tuple)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'MeloVaultCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ProposalCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ProposalExecuted'): EventFragment
}

export interface MeloVaultCreatedEventObject {
  name: string
  token: string
}
export type MeloVaultCreatedEvent = TypedEvent<[string, string], MeloVaultCreatedEventObject>

export type MeloVaultCreatedEventFilter = TypedEventFilter<MeloVaultCreatedEvent>

export interface ProposalCreatedEventObject {
  id: BigNumber
  snapshotBlockHash: string
  proposal: MeloVault.ProposalStructOutput
}
export type ProposalCreatedEvent = TypedEvent<
  [BigNumber, string, MeloVault.ProposalStructOutput],
  ProposalCreatedEventObject
>

export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>

export interface ProposalExecutedEventObject {
  id: BigNumber
  proposal: MeloVault.ProposalStructOutput
}
export type ProposalExecutedEvent = TypedEvent<[BigNumber, MeloVault.ProposalStructOutput], ProposalExecutedEventObject>

export type ProposalExecutedEventFilter = TypedEventFilter<ProposalExecutedEvent>

export interface VaultAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: VaultAbiInterface

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
    blocksAllowedForExecution(overrides?: CallOverrides): Promise<[BigNumber]>

    executeProposal(
      proposal: MeloVault.ProposalStruct,
      proof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    maxBlocksInFuture(overrides?: CallOverrides): Promise<[BigNumber]>

    name(overrides?: CallOverrides): Promise<[string]>

    nft(overrides?: CallOverrides): Promise<[string]>

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>

    proposalBlockTimes(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>

    proposalExecuted(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>

    proposalHash(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<[BigNumber]>

    propose(
      proposal: MeloVault.ProposalStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setVerifier(
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>

    verifier(overrides?: CallOverrides): Promise<[string]>
  }

  blocksAllowedForExecution(overrides?: CallOverrides): Promise<BigNumber>

  executeProposal(
    proposal: MeloVault.ProposalStruct,
    proof: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  maxBlocksInFuture(overrides?: CallOverrides): Promise<BigNumber>

  name(overrides?: CallOverrides): Promise<string>

  nft(overrides?: CallOverrides): Promise<string>

  onERC1155BatchReceived(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>[],
    arg3: PromiseOrValue<BigNumberish>[],
    arg4: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>

  onERC1155Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BigNumberish>,
    arg4: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>

  onERC721Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>

  proposalBlockTimes(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>

  proposalExecuted(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>

  proposalHash(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<BigNumber>

  propose(
    proposal: MeloVault.ProposalStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setVerifier(
    _verifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>

  verifier(overrides?: CallOverrides): Promise<string>

  callStatic: {
    blocksAllowedForExecution(overrides?: CallOverrides): Promise<BigNumber>

    executeProposal(
      proposal: MeloVault.ProposalStruct,
      proof: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>

    maxBlocksInFuture(overrides?: CallOverrides): Promise<BigNumber>

    name(overrides?: CallOverrides): Promise<string>

    nft(overrides?: CallOverrides): Promise<string>

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>

    proposalBlockTimes(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>

    proposalExecuted(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>

    proposalHash(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<BigNumber>

    propose(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<void>

    setVerifier(_verifier: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>

    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>

    verifier(overrides?: CallOverrides): Promise<string>
  }

  filters: {
    'MeloVaultCreated(string,address)'(name?: null, token?: null): MeloVaultCreatedEventFilter
    MeloVaultCreated(name?: null, token?: null): MeloVaultCreatedEventFilter

    'ProposalCreated(uint64,bytes32,tuple)'(
      id?: null,
      snapshotBlockHash?: null,
      proposal?: null
    ): ProposalCreatedEventFilter
    ProposalCreated(id?: null, snapshotBlockHash?: null, proposal?: null): ProposalCreatedEventFilter

    'ProposalExecuted(uint64,tuple)'(id?: null, proposal?: null): ProposalExecutedEventFilter
    ProposalExecuted(id?: null, proposal?: null): ProposalExecutedEventFilter
  }

  estimateGas: {
    blocksAllowedForExecution(overrides?: CallOverrides): Promise<BigNumber>

    executeProposal(
      proposal: MeloVault.ProposalStruct,
      proof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    maxBlocksInFuture(overrides?: CallOverrides): Promise<BigNumber>

    name(overrides?: CallOverrides): Promise<BigNumber>

    nft(overrides?: CallOverrides): Promise<BigNumber>

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    proposalBlockTimes(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>

    proposalExecuted(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>

    proposalHash(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<BigNumber>

    propose(
      proposal: MeloVault.ProposalStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setVerifier(
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>

    verifier(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    blocksAllowedForExecution(overrides?: CallOverrides): Promise<PopulatedTransaction>

    executeProposal(
      proposal: MeloVault.ProposalStruct,
      proof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    maxBlocksInFuture(overrides?: CallOverrides): Promise<PopulatedTransaction>

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>

    nft(overrides?: CallOverrides): Promise<PopulatedTransaction>

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    proposalBlockTimes(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    proposalExecuted(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    proposalHash(proposal: MeloVault.ProposalStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>

    propose(
      proposal: MeloVault.ProposalStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setVerifier(
      _verifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    verifier(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
