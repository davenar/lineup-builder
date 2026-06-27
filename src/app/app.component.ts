import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullscreenLoaderComponent } from './core/components/fullscreen-loader/fullscreen-loader.component';
import { PlayerService } from './features/line-up-builder/services/player.service';
import { MainHeaderComponent } from './shared/components/header/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/footer/main-footer/main-footer.component';
import { PanelHostComponent } from './shared/components/panel/panel-host/panel-host.component';


@Component({
  selector: 'app-root',
  host: { class: 'flex flex-col min-h-screen' },
  imports: [RouterOutlet, FullscreenLoaderComponent, MainHeaderComponent, MainFooterComponent, PanelHostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lup';


  constructor() { }


  ngOnInit(): void {
  }
}
