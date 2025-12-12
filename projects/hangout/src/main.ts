import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from '@app/app.config';

import {HangApp} from './app/app';

bootstrapApplication(HangApp, appConfig).catch((err) => console.error(err));
