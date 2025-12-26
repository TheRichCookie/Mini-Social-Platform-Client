import { ErrorHandler, NgModule } from '@angular/core';

import { UkGlobalErrorHandlerService } from '../../services';

@NgModule({
  imports: [],
  providers: [{ provide: ErrorHandler, useClass: UkGlobalErrorHandlerService }],
})
export class UkErrorInitializer {}
