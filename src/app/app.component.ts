import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullscreenLoaderComponent } from './core/components/fullscreen-loader/fullscreen-loader.component';
import { AppUpdateService } from './core/services/app-update.service';
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

  private readonly appUpdate = inject(AppUpdateService);

  ngOnInit(): void {
    this.appUpdate.init();
  }
}