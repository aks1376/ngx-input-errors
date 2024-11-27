import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNgxInputErrorMessages } from '../../../ngx-input-errors/src/public-api';
import { errorMessages } from './config/ngx-input-errors-messages';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNgxInputErrorMessages({ defaultLanguage: 'en', errorMessages: errorMessages }),
    provideAnimationsAsync()
  ]
};
