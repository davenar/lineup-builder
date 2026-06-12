import { Component, inject, signal } from '@angular/core';
import { BadgeComponent } from '../shared/components/badge/badge.component';
import { ToggleComponent } from '../shared/components/toggle/toggle.component';
import { SelectComponent, SelectOption } from '../shared/components/select/select.component';
import { PanelService } from '../core/services/panel.service';
import { MainMenuPanelComponent } from '../shared/components/header/main-menu-panel/main-menu-panel.component';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [BadgeComponent, ToggleComponent, SelectComponent],
  templateUrl: './styleguide.component.html',
  styleUrl: './styleguide.component.css',
})
export class StyleguideComponent {

  // ── Select demo ────────────────────────────────────────────

  private readonly panelService = inject(PanelService);

  openPanelLeft(): void {
    this.panelService.open(MainMenuPanelComponent, {
      direction: 'left',
      ariaLabel: 'Left panel',
      closeModes: ['close-button', 'backdrop', 'escape'],
    });
  }

  openPanelRight(): void {
    this.panelService.open(MainMenuPanelComponent, {
      direction: 'right',
      ariaLabel: 'Right panel',
      closeModes: ['close-button', 'backdrop', 'escape'],
    });
  }

  openPanelBottom(): void {
    this.panelService.open(MainMenuPanelComponent, {
      direction: 'bottom',
      bottomHeight: '60dvh',
      ariaLabel: 'Bottom panel',
      closeModes: ['close-button', 'backdrop', 'escape'],
    });
  }

  openPanelResponsive(): void {
    this.panelService.open(MainMenuPanelComponent, {
      desktopDirection: 'right',
      mobileDirection: 'bottom',
      bottomHeight: '60dvh',
      ariaLabel: 'Responsive panel',
      closeModes: ['close-button', 'backdrop', 'escape'],
    });
  }

  openPanelUnderHeader(): void {
    this.panelService.open(MainMenuPanelComponent, {
      direction: 'left',
      openUnderHeader: true,
      headerHeight: '6.4rem',
      ariaLabel: 'Panel under header',
      closeModes: ['close-button', 'backdrop', 'escape'],
    });
  }

  // ── Select demo ────────────────────────────────────────────
  selectedRole = signal('');

  onRoleChange(opt: SelectOption) {
    console.log('Selected role:', opt);
  }

  // ── Toggle demo ─────────────────────────────────────────────
  isDark = signal(false);
}