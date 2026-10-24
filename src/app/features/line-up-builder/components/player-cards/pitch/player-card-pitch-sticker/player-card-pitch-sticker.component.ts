import { CommonModule } from '@angular/common';
import { ImgFallbackDirective } from '../../../../../../shared/directives/img-fallback.directive';
import {
  afterNextRender,
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  Input,
  OnDestroy,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { FormationSlot } from '../../../../models/formation.models';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { PositionLabelPipe } from '../../../../../../shared/pipes/position-label.pipe';
import { LineupAnnouncerService } from '../../../../a11y/lineup-announcer.service';

@Component({
  selector: 'app-player-card-pitch-sticker',
  standalone: true,
  imports: [ImgFallbackDirective, CommonModule, TranslocoPipe, PositionLabelPipe],
  templateUrl: './player-card-pitch-sticker.component.html',
  host: { class: 'block w-full' },
})
export class PlayerCardPitchStickerComponent {
  @Input({ required: true }) slot!: FormationSlot;

  // Signal queries: si aggiornano quando il @if monta/smonta gli elementi
  private readonly nameViewport = viewChild<ElementRef<HTMLElement>>('nameViewport');
  private readonly nameText = viewChild<ElementRef<HTMLElement>>('nameText');
  private readonly addButton = viewChild<ElementRef<HTMLButtonElement>>('addButton');

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly transloco = inject(TranslocoService);
  private readonly announcer = inject(LineupAnnouncerService);

  private resizeObserver?: ResizeObserver;

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.pitchAssignments().get(this.slot.cellIndex) ?? null,
  );
  readonly isNameOverflowing = signal(false);

  constructor() {
    // Rigira quando: il viewport appare/scompare (@if) o il player cambia.
    // Gli effect girano DOPO il rendering del template, quindi il DOM
    // che misuriamo è già quello aggiornato — niente race con la CD.
    effect(() => {
      const viewport = this.nameViewport()?.nativeElement;
      this.player(); // dipendenza esplicita: nuovo player → nuova misura

      this.resizeObserver?.disconnect();

      if (!viewport) {
        this.isNameOverflowing.set(false);
        return;
      }

      this.resizeObserver = new ResizeObserver(() => this.scheduleOverflowCheck());
      this.resizeObserver.observe(viewport);
      this.scheduleOverflowCheck();
    });

    this.destroyRef.onDestroy(() => this.resizeObserver?.disconnect());
  }

  private scheduleOverflowCheck(): void {
    // rAF: misura dopo che layout e unità cqw sono applicati.
    requestAnimationFrame(() => this.checkNameOverflow());
  }

  private checkNameOverflow(): void {
    const viewport = this.nameViewport()?.nativeElement;
    const text = this.nameText()?.nativeElement;
    if (!viewport || !text) return;
    this.isNameOverflowing.set(text.scrollWidth > viewport.clientWidth + 1);
  }

  onOpenSearchPanel(): void {
    const slotName = this.announcer.pitchSlotName(this.slot);

    this.panelService.open(
      PlayerSearchPanelContentComponent,
      { ariaLabel: this.transloco.translate('panel.selectPlayer', { slot: slotName }) },
      {
        slotLabel: slotName,
        onPlayerSelected: (player: PlayerInfoData) => {
          this.lineupState.assignPitchPlayer(this.slot.cellIndex, player);
          this.announcer.announce('a11y.playerAdded', { player: player.shortname, slot: slotName });
          // niente scheduleOverflowCheck manuale: ci pensa l'effect
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    const playerName = this.player()?.shortname ?? '';
    this.lineupState.removePitchPlayer(this.slot.cellIndex);
    this.announcer.announce('a11y.playerRemoved', {
      player: playerName,
      slot: this.announcer.pitchSlotName(this.slot),
    });
    // il pulsante premuto sparisce: sposta il focus sul pulsante "aggiungi" dello slot
    afterNextRender(() => this.addButton()?.nativeElement.focus(), { injector: this.injector });
  }
}