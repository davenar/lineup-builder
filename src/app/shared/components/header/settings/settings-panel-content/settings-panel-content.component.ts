import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { PanelService } from '../../../../../core/services/panel.service';
import { FORMATION_OPTIONS } from '../../../../../features/line-up-builder/constants/formations.data';
import { PITCH_CARD_STYLE_OPTIONS, BENCH_CARD_STYLE_OPTIONS, PITCH_BACKGROUND_OPTIONS } from '../../../../../features/line-up-builder/constants/player-card-style.data';
import { LineupStateService } from '../../../../../features/line-up-builder/services/lineup-state.service';
import { PitchCardStyle, BenchCardStyle, PitchBackground } from '../../../../../features/line-up-builder/types/line-up-builder-settings.types';
import { SelectComponent, SelectOption } from '../../../select/select.component';
import { LanguageService } from '../../../../../core/i18n/language.service';
import { FORMATION_NAME_KEYS, LineupAnnouncerService } from '../../../../../features/line-up-builder/a11y/lineup-announcer.service';

/** Chiavi di traduzione per le etichette delle opzioni (value → chiave) */
const CARD_STYLE_LABEL_KEYS: Record<string, string> = {
  'sticker': 'settings.cardStyles.sticker',
  'crazy-time': 'settings.cardStyles.crazyTime',
};

const PITCH_BACKGROUND_LABEL_KEYS: Record<string, string> = {
  'grass': 'settings.backgrounds.grass',
  'grass-night': 'settings.backgrounds.grassNight',
  'glass': 'settings.backgrounds.glass',
  'default': 'settings.backgrounds.default',
};

@Component({
  selector: 'app-settings-panel-content',
  standalone: true,
  imports: [CommonModule, SelectComponent, TranslocoPipe],
  templateUrl: './settings-panel-content.component.html',
})
export class SettingsPanelContentComponent {
  private readonly panelService = inject(PanelService);
  readonly lineupState = inject(LineupStateService);
  private readonly transloco = inject(TranslocoService);
  private readonly activeLang = inject(LanguageService).activeLang;
  private readonly announcer = inject(LineupAnnouncerService);

  // etichette tradotte, ricalcolate al cambio lingua; i value restano quelli delle costanti
  readonly formationOptions = computed(() =>
    this.translateOptions(FORMATION_OPTIONS, value => FORMATION_NAME_KEYS[value]),
  );
  readonly pitchCardStyleOptions = computed(() =>
    this.translateOptions(PITCH_CARD_STYLE_OPTIONS, value => CARD_STYLE_LABEL_KEYS[value]),
  );
  readonly benchCardStyleOptions = computed(() =>
    this.translateOptions(BENCH_CARD_STYLE_OPTIONS, value => CARD_STYLE_LABEL_KEYS[value]),
  );
  readonly pitchBackgroundOptions = computed(() =>
    this.translateOptions(PITCH_BACKGROUND_OPTIONS, value => PITCH_BACKGROUND_LABEL_KEYS[value]),
  );

  readonly canLoadSavedLineup = this.lineupState.canLoadSavedLineup;

  /** feedback temporaneo "Salvato ✓" dopo il save */
  readonly justSaved = signal(false);

  /** conferma a due step per il reset (azione distruttiva) */
  readonly confirmingReset = signal(false);

  private savedFeedbackTimer?: ReturnType<typeof setTimeout>;
  private resetConfirmTimer?: ReturnType<typeof setTimeout>;

  onFormationChange(option: SelectOption): void {
    this.lineupState.setFormation(option.value);
    // il modulo è l'azione primaria: chiudi per mostrare subito il risultato
    this.panelService.close('programmatic');
  }

  onPitchCardStyleChange(option: SelectOption): void {
    this.lineupState.setPitchCardStyle(option.value as PitchCardStyle);
  }

  onBenchCardStyleChange(option: SelectOption): void {
    this.lineupState.setBenchCardStyle(option.value as BenchCardStyle);
  }

  onPitchBackgroundChange(option: SelectOption): void {
    this.lineupState.setPitchBackground(option.value as PitchBackground);
  }

  onSave(): void {
    this.lineupState.saveLineup();
    this.announcer.announce('a11y.lineupSaved');

    this.justSaved.set(true);
    clearTimeout(this.savedFeedbackTimer);
    this.savedFeedbackTimer = setTimeout(() => this.justSaved.set(false), 2500);
  }

  onReset(): void {
    if (!this.confirmingReset()) {
      // primo click: chiedi conferma per 3 secondi
      this.confirmingReset.set(true);
      clearTimeout(this.resetConfirmTimer);
      this.resetConfirmTimer = setTimeout(() => this.confirmingReset.set(false), 3000);
      this.announcer.announce('a11y.resetConfirm');
      return;
    }

    // secondo click entro 3s: esegui
    clearTimeout(this.resetConfirmTimer);
    this.confirmingReset.set(false);
    this.lineupState.resetLineup();
    this.announcer.announce('a11y.lineupCleared');
  }

  onLoad(): void {
    const loaded = this.lineupState.loadLineup();

    if (loaded) {
      this.announcer.announce('a11y.lineupLoaded');
      this.panelService.close('programmatic');
    }
  }

  /** Traduce l'etichetta di ogni opzione; se la chiave manca tiene l'etichetta originale */
  private translateOptions(
    options: SelectOption[],
    keyOf: (value: string) => string | undefined,
  ): SelectOption[] {
    this.activeLang(); // dipendenza: ricalcola al cambio lingua

    return options.map(option => {
      const key = keyOf(option.value);
      const translated = key ? this.transloco.translate(key) : undefined;
      return { ...option, label: translated && translated !== key ? translated : option.label };
    });
  }
}