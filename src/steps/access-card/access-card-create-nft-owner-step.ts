import { BigNumber } from '@ethersproject/bignumber';
import {
  RecipeNFTInfo,
  StepConfig,
  StepInput,
  UnvalidatedStepOutput,
} from '../../models/export-models';
import { Step } from '../step';
import {
  NFTTokenType,
  RailgunNFTAmount,
} from '@railgun-community/shared-models';
import { compareNFTs, nftAmountOne } from '../../utils/token';
import { AccessCardNFT } from '../../api/access-card/access-card-nft';
import { BaseProvider } from '@ethersproject/providers';
import { AccessCardAccountCreatorContract } from '../../contract/access-card/access-card-account-creator-contract';

export class AccessCardCreateNFTOwnerStep extends Step {
  readonly config: StepConfig = {
    name: 'Access Card Create NFT Owner',
    description:
      'Creates an Ownable Contract and assigns Access Card NFT as owner.',
  };

  private readonly accessCardNFTAddress: string;

  private readonly nftTokenSubID: BigNumber;

  private readonly ownableContractAddress: string;

  private readonly provider: BaseProvider;

  constructor(
    accessCardNFTAddress: string,
    nftTokenSubID: BigNumber,
    ownableContractAddress: string,
    provider: BaseProvider,
  ) {
    super();
    this.accessCardNFTAddress = accessCardNFTAddress;
    this.nftTokenSubID = nftTokenSubID;
    this.ownableContractAddress = ownableContractAddress;
    this.provider = provider;
  }

  protected async getStepOutput(
    input: StepInput,
  ): Promise<UnvalidatedStepOutput> {
    const { networkName, nfts } = input;

    const accessCardNFT: RailgunNFTAmount = {
      nftAddress: this.accessCardNFTAddress,
      nftTokenType: NFTTokenType.ERC721,
      tokenSubID: this.nftTokenSubID.toHexString(),
      amountString: nftAmountOne(),
    };

    // Ensure that NFT exists.
    const { nftAmountForStep, unusedNFTAmounts } = this.getValidInputNFTAmount(
      nfts,
      nftAmount =>
        compareNFTs(accessCardNFT, nftAmount) && nftAmount.owns == null,
    );

    const { accountCreator } =
      AccessCardNFT.getAddressesForNetwork(networkName);

    const creator = new AccessCardAccountCreatorContract(
      accountCreator,
      this.provider,
    );
    const populatedTransaction = await creator.createDeploy(
      this.accessCardNFTAddress,
      this.nftTokenSubID,
    );

    const ownerNFT: RecipeNFTInfo = {
      ...nftAmountForStep,
      owns: this.ownableContractAddress,
    };

    return {
      populatedTransactions: [populatedTransaction],
      outputERC20Amounts: input.erc20Amounts,
      outputNFTs: [ownerNFT, ...unusedNFTAmounts],
    };
  }
}
