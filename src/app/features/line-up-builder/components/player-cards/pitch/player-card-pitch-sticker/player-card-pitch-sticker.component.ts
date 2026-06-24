import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { FormationSlot } from '../../../../models/formation.models';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';


@Component({
  selector: 'app-player-card-pitch-sticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card-pitch-sticker.component.html',
})
export class PlayerCardPitchStickerComponent {
  @Input({ required: true }) slot!: FormationSlot;

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.pitchAssignments().get(this.slot.cellIndex) ?? null,
  );

  onOpenSearchPanel(): void {
    this.panelService.open(
      PlayerSearchPanelContentComponent,
      {
        desktopDirection: 'right',
        mobileDirection: 'bottom',
        bottomHeight: '85dvh',
        ariaLabel: `Seleziona giocatore - ${this.slot.fullLabel}`,
        closeModes: ['close-button', 'backdrop', 'escape'],
      },
      {
        slotLabel: this.slot.fullLabel,
        onPlayerSelected: (player: PlayerInfoData) => {
          this.lineupState.assignPitchPlayer(this.slot.cellIndex, player);
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    this.lineupState.removePitchPlayer(this.slot.cellIndex);
  }
}