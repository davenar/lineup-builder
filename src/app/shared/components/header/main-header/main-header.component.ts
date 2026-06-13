import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainMenuPanelComponent } from '../main-menu-panel/main-menu-panel.component';
import { PanelService } from '../../../../core/services/panel.service';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  private readonly panelService = inject(PanelService);

  readonly appTitle = 'MyApp';

  readonly navLinks: NavLink[] = [
    { label: 'Line Up Builder', path: '/builder' },
    { label: 'Styleguide', path: '/styleguide' }
  ];

  openMainPanel(): void {
    this.panelService.open(MainMenuPanelComponent, {
      desktopDirection: 'left',
      mobileDirection: 'left',
      // openUnderHeader: true,
      // headerHeight: '6.4rem',
      ariaLabel: 'Main panel',
      closeModes: ['close-button', 'backdrop', 'escape'],
      onClose: reason => {
        console.log('Panel closed:', reason);
      },
    });
  }
}