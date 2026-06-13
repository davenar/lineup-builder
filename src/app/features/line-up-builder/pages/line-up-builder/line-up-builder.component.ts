import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-line-up-builder',
  imports: [CommonModule],
  templateUrl: './line-up-builder.component.html',
  styleUrl: './line-up-builder.component.css'
})
export class LineUpBuilderComponent {
playerPositions = Array.from({ length: 30 }, (_, i) => i + 1);
benchPositions = Array.from({ length: 12 }, (_, i) => i + 1);
customPitchClasses = 'bg-[url(/grass.jpg)]';
}
