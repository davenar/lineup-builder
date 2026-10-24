import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkMenu, CdkMenuItemRadio, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LanguageService } from '../../../../core/i18n/language.service';
import { AppLang } from '../../../../core/i18n/i18n.config';

/**
 * Pulsante mappamondo + sigla lingua, con menu a tendina delle lingue.
 *
 * CDK Menu gestisce: aria-haspopup / aria-expanded sul trigger, role="menu"
 * e menuitemradio + aria-checked sulle voci, frecce / Home / End / Invio /
 * Escape, chiusura al click esterno e focus restituito al trigger.
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgClass, CdkMenuTrigger, CdkMenu, CdkMenuItemRadio, TranslocoPipe],
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  private readonly transloco = inject(TranslocoService);
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  readonly langs = this.languageService.availableLangs;
  readonly nativeNames = this.languageService.nativeNames;
  readonly activeLang = this.languageService.activeLang;

  /** menu allineato al bordo destro del pulsante, subito sotto */
  readonly menuPositions: ConnectedPosition[] = [
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
  ];

  nativeName(lang: string): string {
    return this.nativeNames[lang as AppLang] ?? lang;
  }

  async selectLang(lang: AppLang): Promise<void> {
    this.trigger().nativeElement.focus();

    if (lang === this.activeLang()) {
      return;
    }

    await this.languageService.setLang(lang);
    this.liveAnnouncer.announce(
      this.transloco.translate('a11y.languageChanged', { lang: this.nativeName(lang) }),
      'polite',
    );
  }
}
