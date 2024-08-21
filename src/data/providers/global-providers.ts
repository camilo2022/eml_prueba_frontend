import { Provider } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const GLOBAL_PROVIDERS: Provider[] = [
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
];