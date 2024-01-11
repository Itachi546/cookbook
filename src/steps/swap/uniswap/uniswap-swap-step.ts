import {
  RecipeERC20AmountRecipient,
  RecipeERC20Info,
  StepConfig,
  StepInput,
  StepOutputERC20Amount,
  UnvalidatedStepOutput,
} from '../../../models/export-models';
import { compareERC20Info, isApprovedForSpender } from '../../../utils/token';
import { Step } from '../../step';
import { UniswapPermit2Contract } from '../../../contract/uniswap/permit2-contract';
import { UniswapSwapQuoteData } from '../../../models/uni-quote';
import { UniswapQuote } from '../../../api/uni-quote';

export class UniswapSwapStep extends Step {
  readonly config: StepConfig = {
    name: 'Uniswap Exchange Swap',
    description: 'Swaps two ERC20 tokens using Uniswap Exchange.',
    hasNonDeterministicOutput: true,
  };

  private readonly quote: UniswapSwapQuoteData;
  private readonly sellERC20Info: RecipeERC20Info;

  constructor(quote: UniswapSwapQuoteData, sellERC20Info: RecipeERC20Info) {
    super();
    this.quote = quote;
    this.sellERC20Info = sellERC20Info;
  }

  protected async getStepOutput(
    input: StepInput,
  ): Promise<UnvalidatedStepOutput> {
    const {
      buyERC20Amount,
      minimumBuyAmount,
      crossContractCall,
      sellTokenValue,
      sellTokenAddress,
      spender,
    } = this.quote;
    const { erc20Amounts } = input;

    const sellERC20Amount = BigInt(sellTokenValue);
    const { erc20AmountForStep, unusedERC20Amounts } =
      this.getValidInputERC20Amount(
        erc20Amounts,
        erc20Amount =>
          compareERC20Info(erc20Amount, this.sellERC20Info) &&
          isApprovedForSpender(erc20Amount, spender),
        sellERC20Amount,
      );

    const sellERC20AmountRecipient: RecipeERC20AmountRecipient = {
      ...this.sellERC20Info,
      amount: erc20AmountForStep.expectedBalance,
      recipient: 'Uniswap Exchange',
    };
    const outputBuyERC20Amount: StepOutputERC20Amount = {
      tokenAddress: buyERC20Amount.tokenAddress,
      decimals: buyERC20Amount.decimals,
      isBaseToken: buyERC20Amount.isBaseToken,
      expectedBalance: buyERC20Amount.amount,
      minBalance: minimumBuyAmount,
      approvedSpender: undefined,
    };

    const permit2ContractAddress = UniswapQuote.getUniswapPermit2ContractAddressForNetwork(input.networkName);
    const permit2Contract = new UniswapPermit2Contract(permit2ContractAddress)
    const nowTime = Math.floor(Date.now() / 1000);

    const unit48timeout = nowTime + (10 * 60);
    const permit2AllowanceContractCall = await permit2Contract.createApproval(
      crossContractCall.to,
      sellTokenAddress,
      BigInt(unit48timeout),
      sellERC20Amount,
    );

    return {
      crossContractCalls: [permit2AllowanceContractCall, crossContractCall],
      spentERC20Amounts: [sellERC20AmountRecipient],
      outputERC20Amounts: [outputBuyERC20Amount, ...unusedERC20Amounts],
      outputNFTs: input.nfts,
    };
  }
}
