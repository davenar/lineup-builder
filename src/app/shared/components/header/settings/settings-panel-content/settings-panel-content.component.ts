import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  onFormationChange(option: SelectOption): void {
    this.lineupState.setFormation(option.value);
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
  }

  onReset(): void {
    this.lineupState.resetLineup();
  }

  onLoad(): void {
    const loaded = this.lineupState.loadLineup();

    if (loaded) {
      this.panelService.close('programmatic');
    }
  }
}