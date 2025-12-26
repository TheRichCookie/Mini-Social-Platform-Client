import type { Routes } from '@angular/router';
import { BcsErrorsComponent } from '@pages/errors/__/errors.component';

export const ERRORS_ROUTES: Routes = [
  {
    path: '',
    component: BcsErrorsComponent,
    children: [],
  },
];
