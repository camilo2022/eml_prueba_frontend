import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideNgxWebstorage, withNgxWebstorageConfig, withLocalStorage, withSessionStorage } from 'ngx-webstorage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: '', caseSensitive: true, prefix: '' }),
      withLocalStorage(),
      withSessionStorage()
    )
  ]
};
