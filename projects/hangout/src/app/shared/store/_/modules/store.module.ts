import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BASE_EFFECTS } from '@store/_base/_base.effects';
import { UkStoreRouteCustomSerializer } from '@utils/ui-kit/helpers';

@NgModule({
  imports: [
    EffectsModule.forRoot(BASE_EFFECTS),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      // logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  declarations: [],
  providers: [
    { provide: RouterStateSerializer, useClass: UkStoreRouteCustomSerializer },
  ],
})
export class HangStoreModule {}
