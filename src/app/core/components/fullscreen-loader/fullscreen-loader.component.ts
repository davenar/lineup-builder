import { Component } from '@angular/core';
import { FullscreenLoaderService } from '../../services/fullscreen-loader.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-fullscreen-loader',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.css']
})
export class FullscreenLoaderComponent {
  constructor(public loaderService: FullscreenLoaderService) {}
}