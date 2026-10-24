import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { LANG_STORAGE_KEY } from './i18n.config';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let languagesSpy: jasmine.Spy;

  function setup(): LanguageService {
    TestBed.configureTestingModule({ imports: [getTranslocoTestingModule()] });
    return TestBed.inject(LanguageService);
  }

  beforeEach(() => {
    localStorage.removeItem(LANG_STORAGE_KEY);
    languagesSpy = spyOnProperty(navigator, 'languages', 'get').and.returnValue(['en-US']);
  });

  afterEach(() => {
    localStorage.removeItem(LANG_STORAGE_KEY);
    document.documentElement.lang = 'en';
  });

  it('uses the stored language first', async () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'it');
    languagesSpy.and.returnValue(['en-US']);
    const service = setup();

    await service.init();

    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('it');
    expect(document.documentElement.lang).toBe('it');
  });

  it('ignores an unsupported stored language and falls back to the browser language', async () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'fr');
    languagesSpy.and.returnValue(['de-DE', 'it-IT', 'en']);
    const service = setup();

    await service.init();

    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('it');
  });

  it('defaults to English when no browser language is supported', async () => {
    languagesSpy.and.returnValue(['fr-FR', 'de']);
    const service = setup();

    await service.init();

    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('en');
  });

  it('persists the choice and updates <html lang> on change', async () => {
    const service = setup();
    await service.init();

    await service.setLang('it');

    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('it');
    expect(document.documentElement.lang).toBe('it');
    expect(service.activeLang()).toBe('it');
  });
});
