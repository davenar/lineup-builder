import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { PlayerCardBenchStickerComponent } from '../player-card-bench-sticker/player-card-bench-sticker.component';
import { PlayerCardBenchDefaultComponent } from '../player-card-bench-default/player-card-bench-default.component';

@Component({
  selector: 'app-player-card-bench',
  standalone: true,
  imports: [CommonModule, PlayerCardBenchStickerComponent, PlayerCardBenchDefaultComponent],
  templateUrl: './player-card-bench.component.html',
})
export class PlayerCardBenchComponent {
  @Input({ required: true }) benchIndex!: number;

  readonly lineupState = inject(LineupStateService);
}