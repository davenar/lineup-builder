import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { PlayerCardPitchStickerComponent } from '../player-card-pitch-sticker/player-card-pitch-sticker.component';
import { FormationSlot } from '../../../../models/formation.models';
import { PlayerCardPitchCrazyTimeComponent } from "../player-card-pitch-crazy-time/player-card-pitch-crazy-time.component";

@Component({
  selector: 'app-player-card-pitch',
  standalone: true,
  imports: [CommonModule, PlayerCardPitchStickerComponent, PlayerCardPitchCrazyTimeComponent],
  templateUrl: './player-card-pitch.component.html',
})
export class PlayerCardPitchComponent {
  @Input({ required: true }) slot!: FormationSlot;

  readonly lineupState = inject(LineupStateService);
}