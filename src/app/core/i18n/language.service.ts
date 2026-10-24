import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import {
  AppLang,
  AVAILABLE_LANGS,
  DEFAULT_LANG,
  isAppLang,
  LANG_NATIVE_NAMES,
  LANG_STORAGE_KEY,
} from './i18n.config';

/**
 * Rilevamento, persistenza e cambio della lingua dell'interfaccia.
 *
 * Priorità della lingua iniziale:
 *   1. lingua salvata in localStorage (se supportata)
 *   2. prima lingua di navigator.languages supportata (confronto sul prefisso)
 *   3. DEFAULT_LANG
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);

  readonly availableLangs = AVAILABLE_LANGS;
  readonly nativeNames = LANG_NATIVE_NAMES;

  readonly activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  /** Usato dall'app initializer: imposta la lingua e attende il caricamento del JSON */
  init(): Promise<unknown> {
    const lang = this.detectInitialLang();
    this.applyLang(lang);
    return firstValueFrom(this.transloco.load(lang)).catch(() => undefined);
  }

  /** Cambia lingua, la salva e attende che le traduzioni siano disponibili */
  async setLang(lang: AppLang): Promise<void> {
    if (!isAppLang(lang)) {
      return;
    }

    // carica prima, così il cambio di lingua avviene in un solo render
    await firstValueFrom(this.transloco.load(lang)).catch(() => undefined);
    this.applyLang(lang);
    this.persist(lang);
  }

  private applyLang(lang: AppLang): void {
    this.transloco.setActiveLang(lang);
    this.document.documentElement.lang = lang;
  }

  private detectInitialLang(): AppLang {
    const stored = this.readStored();

    if (stored) {
      return stored;
    }

    return this.detectBrowserLang() ?? DEFAULT_LANG;
  }

  private detectBrowserLang(): AppLang | null {
    const nav = this.document.defaultView?.navigator;

    if (!nav) {
      return null;
    }

    const candidates = nav.languages?.length ? nav.languages : [nav.language];

    for (const candidate of candidates) {
      const prefix = candidate?.toLowerCase().split('-')[0];

      if (isAppLang(prefix)) {
        return prefix;
      }
    }

    return null;
  }

  private readStored(): AppLang | null {
    try {
      const value = localStorage.getItem(LANG_STORAGE_KEY);
      return isAppLang(value) ? value : null;
    } catch {
      // localStorage non disponibile (es. private mode)
      return null;
    }
  }

  private persist(lang: AppLang): void {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage non disponibile: la scelta vale solo per la sessione
    }
  }
}
