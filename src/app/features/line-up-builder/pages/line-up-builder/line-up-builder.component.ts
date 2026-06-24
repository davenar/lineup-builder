import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LineupStateService, BENCH_SLOTS_COUNT } from '../../services/lineup-state.service';
import { PlayerCardPitchComponent } from '../../components/player-cards/pitch/player-card-pitch/player-card-pitch.component';
import { PlayerCardBenchComponent } from '../../components/player-cards/bench/player-card-bench/player-card-bench.component';
import { PITCH_BACKGROUND_CLASSES } from '../../constants/player-card-style.data';

@Component({
  selector: 'app-line-up-builder',
  standalone: true,
  imports: [CommonModule, PlayerCardPitchComponent, PlayerCardBenchComponent],
  templateUrl: './line-up-builder.component.html',
  styleUrl: './line-up-builder.component.css',
})
export class LineUpBuilderComponent {
  readonly lineupState = inject(LineupStateService);

  readonly pitchCells = Array.from({ length: 30 }, (_, i) => i + 1);
  readonly benchSlots = Array.from({ length: BENCH_SLOTS_COUNT }, (_, i) => i + 1);

  readonly pitchClasses = computed(
    () => PITCH_BACKGROUND_CLASSES[this.lineupState.pitchBackground()],
  );
}