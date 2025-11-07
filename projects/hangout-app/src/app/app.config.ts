import type {ApplicationConfig} from '@angular/core';
import {provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {BarController, Colors, Legend} from 'chart.js';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideCharts(withDefaultRegisterables()),
        provideCharts({registerables: [BarController, Legend, Colors]}),
    ],
};
