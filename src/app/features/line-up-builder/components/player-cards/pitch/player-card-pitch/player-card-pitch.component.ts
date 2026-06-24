import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { PlayerCardPitchStickerComponent } from '../player-card-pitch-sticker/player-card-pitch-sticker.component';
import { FormationSlot } from '../../../../models/formation.models';

@Component({
  selector: 'app-player-card-pitch',
  standalone: true,
  imports: [CommonModule, PlayerCardPitchStickerComponent],
  templateUrl: './player-card-pitch.component.html',
})
export class PlayerCardPitchComponent {
  @Input({ required: true }) slot!: FormationSlot;

  readonly lineupState = inject(LineupStateService);
}