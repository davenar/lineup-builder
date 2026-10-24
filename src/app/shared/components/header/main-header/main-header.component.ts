import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainMenuPanelComponent } from '../main-menu-panel/main-menu-panel.component';
import { PanelService } from '../../../../core/services/panel.service';
import { UpperCasePipe } from '@angular/common';
import packageJson from '../../../../../../package.json';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterModule, UpperCasePipe, TranslocoPipe, LanguageSwitcherComponent],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  private readonly panelService = inject(PanelService);
  private readonly transloco = inject(TranslocoService);

  readonly isMainPanelOpen = computed(() => {
    const state = this.panelService.state();
    return !!state?.isOpen && state.component === MainMenuPanelComponent;
  });

  readonly appTitle = 'Line Up Builder';
  readonly appVersion: string = packageJson.version;

  readonly navLinks: NavLink[] = [
    // { label: 'Line Up Builder', path: '/builder' },
    // { label: 'Styleguide', path: '/styleguide' }
  ];

  openMainPanel(): void {
    this.panelService.open(MainMenuPanelComponent, {
      desktopDirection: 'left',
      mobileDirection: 'left',
      // openUnderHeader: true,
      // headerHeight: '6.4rem',
      ariaLabel: this.transloco.translate('panel.mainMenu'),
      closeModes: ['close-button', 'backdrop', 'escape'],
      onClose: reason => {
        console.log('Panel closed:', reason);
      },
    });
  }
}