import { Recipe } from '../recipe';
import { Step } from '../../steps';
import { EmptyTransferBaseTokenStep } from '../../steps/adapt/empty-transfer-base-token-step';

export class EmptyRecipe extends Recipe {
  readonly config = {
    name: 'Empty',
    description: 'Empty recipe for testing. Sends 0 tokens to null address.',
  };

  constructor() {
    super();
  }

  protected supportsNetwork(): boolean {
    return true;
  }

  protected async getInternalSteps(): Promise<Step[]> {
    return [new EmptyTransferBaseTokenStep()];
  }
}
