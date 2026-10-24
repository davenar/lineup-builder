import { CommonModule } from '@angular/common';
import { ImgFallbackDirective } from '../../../../../../shared/directives/img-fallback.directive';
import { afterNextRender, Component, computed, ElementRef, inject, Injector, Input, viewChild } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';
import { LineupAnnouncerService } from '../../../../a11y/lineup-announcer.service';


@Component({
  selector: 'app-player-card-bench-sticker',
  standalone: true,
  imports: [ImgFallbackDirective, CommonModule, TranslocoPipe],
  templateUrl: './player-card-bench-sticker.component.html',
})
export class PlayerCardBenchStickerComponent {
  @Input({ required: true }) benchIndex!: number;

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);
  private readonly transloco = inject(TranslocoService);
  private readonly announcer = inject(LineupAnnouncerService);
  private readonly injector = inject(Injector);

  private readonly addButton = viewChild<ElementRef<HTMLButtonElement>>('addButton');

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.benchAssignments().get(this.benchIndex) ?? null,
  );

  onOpenSearchPanel(): void {
    const slotName = this.announcer.benchSlotName(this.benchIndex);

    this.panelService.open(
      PlayerSearchPanelContentComponent,
      {
        desktopDirection: 'right',
        mobileDirection: 'bottom',
        bottomHeight: '85dvh',
        ariaLabel: this.transloco.translate('panel.selectPlayer', { slot: slotName }),
        closeModes: ['close-button', 'backdrop', 'escape'],
      },
      {
        slotLabel: slotName,
        onPlayerSelected: (player: PlayerInfoData) => {
          this.lineupState.assignBenchPlayer(this.benchIndex, player);
          this.announcer.announce('a11y.playerAdded', { player: player.shortname, slot: slotName });
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    const playerName = this.player()?.shortname ?? '';
    this.lineupState.removeBenchPlayer(this.benchIndex);
    this.announcer.announce('a11y.playerRemoved', {
      player: playerName,
      slot: this.announcer.benchSlotName(this.benchIndex),
    });
    // il pulsante premuto sparisce: sposta il focus sul pulsante "aggiungi" dello slot
    afterNextRender(() => this.addButton()?.nativeElement.focus(), { injector: this.injector });
  }
}