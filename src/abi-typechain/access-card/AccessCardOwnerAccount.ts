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
} from 'ethers';
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../common';

export interface AccessCardOwnerAccountInterface extends utils.Interface {
  functions: {
    'call(address,bytes,uint256)': FunctionFragment;
    'init(address,uint256)': FunctionFragment;
    'nftContract()': FunctionFragment;
    'nftID()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: 'call' | 'init' | 'nftContract' | 'nftID',
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'call',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'init',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: 'nftContract',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'nftID', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'call', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'init', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'nftContract',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'nftID', data: BytesLike): Result;

  events: {
    'Initialized(uint8)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface AccessCardOwnerAccount extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccessCardOwnerAccountInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    call(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    init(
      _nftContract: PromiseOrValue<string>,
      _nftID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    nftContract(overrides?: CallOverrides): Promise<[string]>;

    nftID(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  call(
    to: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  init(
    _nftContract: PromiseOrValue<string>,
    _nftID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  nftContract(overrides?: CallOverrides): Promise<string>;

  nftID(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    call(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    init(
      _nftContract: PromiseOrValue<string>,
      _nftID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    nftContract(overrides?: CallOverrides): Promise<string>;

    nftID(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    'Initialized(uint8)'(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    call(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    init(
      _nftContract: PromiseOrValue<string>,
      _nftID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    nftContract(overrides?: CallOverrides): Promise<BigNumber>;

    nftID(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    call(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    init(
      _nftContract: PromiseOrValue<string>,
      _nftID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    nftContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
