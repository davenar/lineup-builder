import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullscreenLoaderComponent } from './core/components/fullscreen-loader/fullscreen-loader.component';
import { AppUpdateService } from './core/services/app-update.service';
import { MainHeaderComponent } from './shared/components/header/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/footer/main-footer/main-footer.component';
import { PanelHostComponent } from './shared/components/panel/panel-host/panel-host.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  host: { class: 'flex flex-col min-h-screen' },
  imports: [RouterOutlet, FullscreenLoaderComponent, MainHeaderComponent, MainFooterComponent, PanelHostComponent, TranslocoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lup';

  private readonly appUpdate = inject(AppUpdateService);

  ngOnInit(): void {
    this.appUpdate.init();
  }

  /** Con withHashLocation un href="#id" cambierebbe la rotta: sposta il focus a mano */
  skipToMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }
}