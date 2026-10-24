import { CommonModule, DOCUMENT } from '@angular/common';
import { ImgFallbackDirective } from '../../../../shared/directives/img-fallback.directive';
import { afterNextRender, Component, computed, inject, Injector, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  LineupStateService,
  BENCH_SLOTS_COUNT,
  DragOrigin,
} from '../../services/lineup-state.service';
import { PlayerInfoData } from '../../models/player-info-response.model';
import { FormationSlot } from '../../models/formation.models';
import { PlayerCardPitchComponent } from '../../components/player-cards/pitch/player-card-pitch/player-card-pitch.component';
import { PlayerCardBenchComponent } from '../../components/player-cards/bench/player-card-bench/player-card-bench.component';
import { PITCH_BACKGROUND_CLASSES } from '../../constants/player-card-style.data';
import { LineupAnnouncerService } from '../../a11y/lineup-announcer.service';

@Component({
  selector: 'app-line-up-builder',
  standalone: true,
  imports: [ImgFallbackDirective, CommonModule, DragDropModule, TranslocoPipe, PlayerCardPitchComponent, PlayerCardBenchComponent],
  templateUrl: './line-up-builder.component.html',
  styleUrl: './line-up-builder.component.css',
})
export class LineUpBuilderComponent {
  readonly lineupState = inject(LineupStateService);
  private readonly announcer = inject(LineupAnnouncerService);
  private readonly transloco = inject(TranslocoService);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);

  readonly activeSlots = computed(() =>
    Array.from(this.lineupState.activeSlotsByCell().values()),
  );
  readonly benchSlots = Array.from({ length: BENCH_SLOTS_COUNT }, (_, i) => i + 1);

  readonly pitchClasses = computed(
    () => PITCH_BACKGROUND_CLASSES[this.lineupState.pitchBackground()],
  );

  // ── Drag & Drop ────────────────────────────────────────────

  /** 0ms su mouse, 150ms su touch: tocco breve = scroll, pressione = drag */
  readonly dragStartDelay = { mouse: 0, touch: 150 };

  pitchOrigin(cellIndex: number): DragOrigin {
    return { zone: 'pitch', index: cellIndex };
  }

  benchOrigin(benchIndex: number): DragOrigin {
    return { zone: 'bench', index: benchIndex };
  }

  pitchPlayer(cellIndex: number): PlayerInfoData | null {
    return this.lineupState.pitchAssignments().get(cellIndex) ?? null;
  }

  benchPlayer(benchIndex: number): PlayerInfoData | null {
    return this.lineupState.benchAssignments().get(benchIndex) ?? null;
  }

  hasPitchPlayer(cellIndex: number): boolean {
    return this.lineupState.pitchAssignments().has(cellIndex);
  }

  hasBenchPlayer(benchIndex: number): boolean {
    return this.lineupState.benchAssignments().has(benchIndex);
  }

  onDrop(event: CdkDragDrop<DragOrigin>): void {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const announce = this.announcer.prepareMoveAnnouncement(source, target);
    this.lineupState.swapOrMovePlayer(source, target);
    announce();
  }

  // ── Accessibilità: nomi degli slot ─────────────────────────

  formationName(): string {
    return this.announcer.formationName(this.lineupState.currentFormation());
  }

  pitchSlotLabel(slot: FormationSlot): string {
    return this.slotLabel(this.announcer.pitchSlotName(slot), this.pitchPlayer(slot.cellIndex));
  }

  benchSlotLabel(benchIndex: number): string {
    return this.slotLabel(this.announcer.benchSlotName(benchIndex), this.benchPlayer(benchIndex));
  }

  originName(origin: DragOrigin): string {
    return this.announcer.originName(origin);
  }

  private slotLabel(slot: string, player: PlayerInfoData | null): string {
    return player
      ? this.transloco.translate('lineup.slotPlayer', { slot, player: player.shortname })
      : this.transloco.translate('lineup.slotEmpty', { slot });
  }

  // ── Alternativa da tastiera al drag & drop ─────────────────
  // 1) "Sposta <giocatore>" sullo slot di partenza
  // 2) "Sposta qui" sullo slot di destinazione
  // Riusa swapOrMovePlayer, la stessa logica del drop.

  readonly moveSource = signal<DragOrigin | null>(null);

  isMoveSource(origin: DragOrigin): boolean {
    const source = this.moveSource();
    return !!source && source.zone === origin.zone && source.index === origin.index;
  }

  moveButtonId(origin: DragOrigin): string {
    return `kbd-move-${origin.zone}-${origin.index}`;
  }

  playerNameAt(origin: DragOrigin): string {
    return this.announcer.playerAt(origin) ?? '';
  }

  startMove(origin: DragOrigin): void {
    this.moveSource.set(origin);
    this.announcer.announce('a11y.moveStarted', { player: this.playerNameAt(origin) });
    this.focusMoveButton(origin);
  }

  completeMove(target: DragOrigin): void {
    const source = this.moveSource();

    if (!source) {
      return;
    }

    const announce = this.announcer.prepareMoveAnnouncement(source, target);
    this.lineupState.swapOrMovePlayer(source, target);
    this.moveSource.set(null);
    announce();
    this.focusMoveButton(target);
  }

  cancelMove(): void {
    const source = this.moveSource();

    if (!source) {
      return;
    }

    this.moveSource.set(null);
    this.announcer.announce('a11y.moveCancelled');
    this.focusMoveButton(source);
  }

  /** Il pulsante cambia (sposta → annulla → sposta) e il vecchio nodo viene distrutto: ridai il focus */
  private focusMoveButton(origin: DragOrigin): void {
    afterNextRender(
      () => this.document.getElementById(this.moveButtonId(origin))?.focus(),
      { injector: this.injector },
    );
  }
}
