import { Injectable } from '@angular/core';

import type { UkStepperItems } from './stepper.interface';

@Injectable()
export abstract class UkStepperAbstract {
  // public abstract baseUrl: string;
  public abstract currentStep: number;
  public abstract steps: UkStepperItems;
  public abstract onChangeRouteByIndex(index: number): void;
  // public abstract ngOnDestroy(): void;
  protected abstract checkUrlAndRedirect(url: string): void;
  protected abstract onChangeStep(index: number): void;
  protected abstract restStep(): void;
}
