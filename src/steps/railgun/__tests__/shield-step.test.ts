import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ShieldStep } from '../shield-step';
import { BigNumber } from 'ethers';
import { StepInput } from '../../../models/export-models';
import { NETWORK_CONFIG, NetworkName } from '@railgun-community/shared-models';
import { setRailgunFees } from '../../../init';
import {
  MOCK_SHIELD_FEE_BASIS_POINTS,
  MOCK_UNSHIELD_FEE_BASIS_POINTS,
} from '../../../test/mocks.test';

chai.use(chaiAsPromised);
const { expect } = chai;

const networkName = NetworkName.Ethereum;
const tokenAddress = NETWORK_CONFIG[networkName].baseToken.wrappedAddress;

describe('shield-step', () => {
  before(() => {
    setRailgunFees(
      networkName,
      MOCK_SHIELD_FEE_BASIS_POINTS,
      MOCK_UNSHIELD_FEE_BASIS_POINTS,
    );
  });

  it('Should create shield step', async () => {
    const step = new ShieldStep();

    const stepInput: StepInput = {
      networkName: networkName,
      erc20Amounts: [
        {
          tokenAddress,
          decimals: 18,
          isBaseToken: false,
          expectedBalance: BigNumber.from('12000'),
          minBalance: BigNumber.from('12000'),
          approvedSpender: undefined,
        },
      ],
      nfts: [],
    };
    const output = await step.getValidStepOutput(stepInput);

    expect(output.name).to.equal('Shield');
    expect(output.description).to.equal(
      'Shield ERC20s and NFTs into private RAILGUN balance.',
    );

    expect(output.spentERC20Amounts).to.equal(undefined);

    expect(output.outputERC20Amounts).to.deep.equal([
      {
        tokenAddress,
        expectedBalance: BigNumber.from('11970'),
        minBalance: BigNumber.from('11970'),
        approvedSpender: undefined,
        isBaseToken: false,
        decimals: 18,
      },
    ]);

    expect(output.spentNFTs).to.equal(undefined);
    expect(output.outputNFTs).to.deep.equal([]);

    expect(output.feeERC20AmountRecipients).to.deep.equal([
      {
        tokenAddress,
        decimals: 18,
        amount: BigNumber.from('30'),
        recipient: 'RAILGUN Shield Fee',
      },
    ]);

    expect(output.populatedTransactions).to.deep.equal([]);
  });

  it('Should test shield step error cases', async () => {
    const step = new ShieldStep();

    // No matching erc20 inputs
    const stepInputNoERC20s: StepInput = {
      networkName: networkName,
      erc20Amounts: [
        {
          tokenAddress,
          decimals: 18,
          isBaseToken: true,
          expectedBalance: BigNumber.from('12000'),
          minBalance: BigNumber.from('12000'),
          approvedSpender: undefined,
        },
      ],
      nfts: [],
    };
    await expect(step.getValidStepOutput(stepInputNoERC20s)).to.be.rejectedWith(
      'Shield step is invalid. Cannot shield base token.',
    );
  });
});
