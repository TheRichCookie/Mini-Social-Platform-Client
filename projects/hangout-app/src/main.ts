import {bootstrapApplication} from '@angular/platform-browser';

import {HangAppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

bootstrapApplication(HangAppComponent, appConfig).catch(err => console.error(err));
