import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PanelService } from '../../../../../core/services/panel.service';
import { FORMATION_OPTIONS } from '../../../../../features/line-up-builder/constants/formations.data';
import { PITCH_CARD_STYLE_OPTIONS, BENCH_CARD_STYLE_OPTIONS, PITCH_BACKGROUND_OPTIONS } from '../../../../../features/line-up-builder/constants/player-card-style.data';
import { LineupStateService } from '../../../../../features/line-up-builder/services/lineup-state.service';
import { PitchCardStyle, BenchCardStyle, PitchBackground } from '../../../../../features/line-up-builder/types/line-up-builder-settings.types';
import { SelectComponent, SelectOption } from '../../../select/select.component';

@Component({
  selector: 'app-settings-panel-content',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './settings-panel-content.component.html',
})
export class SettingsPanelContentComponent {
  private readonly panelService = inject(PanelService);
  readonly lineupState = inject(LineupStateService);

  readonly formationOptions = FORMATION_OPTIONS;
  readonly pitchCardStyleOptions = PITCH_CARD_STYLE_OPTIONS;
  readonly benchCardStyleOptions = BENCH_CARD_STYLE_OPTIONS;
  readonly pitchBackgroundOptions = PITCH_BACKGROUND_OPTIONS;

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
      return;
    }

    // secondo click entro 3s: esegui
    clearTimeout(this.resetConfirmTimer);
    this.confirmingReset.set(false);
    this.lineupState.resetLineup();
  }

  onLoad(): void {
    const loaded = this.lineupState.loadLineup();

    if (loaded) {
      this.panelService.close('programmatic');
    }
  }
}