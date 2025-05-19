import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient} from '@angular/common/http';
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter([]),
        provideCharts(withDefaultRegisterables())
    ]
};
