import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Input,
  signal,
  viewChild,
} from '@angular/core';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { FormationSlot } from '../../../../models/formation.models';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';

@Component({
  selector: 'app-player-card-pitch-crazy-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card-pitch-crazy-time.component.html',
  styleUrl: './player-card-pitch-crazy-time.component.css',
})
export class PlayerCardPitchCrazyTimeComponent {
  @Input({ required: true }) slot!: FormationSlot;

  // Signal queries: si aggiornano quando il @if monta/smonta gli elementi
  private readonly nameViewport = viewChild<ElementRef<HTMLElement>>('nameViewport');
  private readonly nameText = viewChild<ElementRef<HTMLElement>>('nameText');

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);
  private readonly destroyRef = inject(DestroyRef);

  private resizeObserver?: ResizeObserver;

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.pitchAssignments().get(this.slot.cellIndex) ?? null,
  );
  readonly isNameOverflowing = signal(false);

  constructor() {
    // Rigira quando: il viewport appare/scompare (@if) o il player cambia.
    // Gli effect girano DOPO il rendering del template, quindi il DOM
    // misurato è già quello aggiornato — niente race con la CD.
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
    if (!viewport || !text) {
      return;
    }
    // +1px di tolleranza per evitare falsi positivi da rounding.
    this.isNameOverflowing.set(text.scrollWidth > viewport.clientWidth + 1);
  }

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
          // niente scheduleOverflowCheck manuale: ci pensa l'effect
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    this.lineupState.removePitchPlayer(this.slot.cellIndex);
  }
}