import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';


@Component({
  selector: 'app-player-card-bench-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card-bench-default.component.html',
})
export class PlayerCardBenchDefaultComponent {
  @Input({ required: true }) benchIndex!: number;

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.benchAssignments().get(this.benchIndex) ?? null,
  );

  onOpenSearchPanel(): void {
    this.panelService.open(
      PlayerSearchPanelContentComponent,
      {
        desktopDirection: 'right',
        mobileDirection: 'bottom',
        bottomHeight: '85dvh',
        ariaLabel: `Seleziona giocatore panchina - slot ${this.benchIndex}`,
        closeModes: ['close-button', 'backdrop', 'escape'],
      },
      {
        slotLabel: `Riserva ${this.benchIndex}`,
        onPlayerSelected: (player: PlayerInfoData) => {
          this.lineupState.assignBenchPlayer(this.benchIndex, player);
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    this.lineupState.removeBenchPlayer(this.benchIndex);
  }
}