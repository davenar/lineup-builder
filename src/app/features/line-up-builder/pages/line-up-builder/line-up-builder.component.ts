import { CommonModule } from '@angular/common';
import { ImgFallbackDirective } from '../../../../shared/directives/img-fallback.directive';
import { Component, computed, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  LineupStateService,
  BENCH_SLOTS_COUNT,
  DragOrigin,
} from '../../services/lineup-state.service';
import { PlayerInfoData } from '../../models/player-info-response.model';
import { PlayerCardPitchComponent } from '../../components/player-cards/pitch/player-card-pitch/player-card-pitch.component';
import { PlayerCardBenchComponent } from '../../components/player-cards/bench/player-card-bench/player-card-bench.component';
import { PITCH_BACKGROUND_CLASSES } from '../../constants/player-card-style.data';

@Component({
  selector: 'app-line-up-builder',
  standalone: true,
  imports: [ImgFallbackDirective, CommonModule, DragDropModule, PlayerCardPitchComponent, PlayerCardBenchComponent],
  templateUrl: './line-up-builder.component.html',
  styleUrl: './line-up-builder.component.css',
})
export class LineUpBuilderComponent {
  readonly lineupState = inject(LineupStateService);

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
    this.lineupState.swapOrMovePlayer(source, target);
  }
}