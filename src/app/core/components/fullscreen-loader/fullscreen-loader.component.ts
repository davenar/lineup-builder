import { Component } from '@angular/core';
import { FullscreenLoaderService } from '../../services/fullscreen-loader.service';

@Component({
  selector: 'app-fullscreen-loader',
  standalone: true,
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.css']
})
export class FullscreenLoaderComponent {
  constructor(public loaderService: FullscreenLoaderService) {}
}