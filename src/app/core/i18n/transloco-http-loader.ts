import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

/**
 * Carica i file public/i18n/<lang>.json.
 *
 * Usa un HttpClient costruito direttamente su HttpBackend, quindi la
 * richiesta NON passa dagli interceptor registrati con provideHttpClient
 * (né da HttpClientBaseService): niente base URL, header, auth o
 * fullscreen loader applicati per sbaglio ai file di traduzione.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = new HttpClient(inject(HttpBackend));

  getTranslation(lang: string) {
    // path relativo: risolto rispetto al <base href> dell'app
    return this.http.get<Translation>(`i18n/${lang}.json`);
  }
}
