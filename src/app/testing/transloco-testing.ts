import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import en from '../../../public/i18n/en.json';
import it from '../../../public/i18n/it.json';

/** TranslocoTestingModule con le traduzioni reali, sincrono (nessun loader HTTP) */
export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, it },
    translocoConfig: {
      availableLangs: ['en', 'it'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
