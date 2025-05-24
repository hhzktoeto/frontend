import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {AuraNordDark} from "../styles/themes/aura-nord-dark";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter([]),
        provideAnimationsAsync(),
        providePrimeNG({
                theme: {
                    preset: AuraNordDark
                },
                ripple: true
            }
        )
    ]
};
