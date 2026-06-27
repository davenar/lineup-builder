import { Component } from '@angular/core';
import { SettingsPanelContentComponent } from "../settings/settings-panel-content/settings-panel-content.component";

@Component({
  selector: 'app-main-menu-panel',
  standalone: true,
  imports: [SettingsPanelContentComponent],
  templateUrl: './main-menu-panel.component.html',
  styleUrl: './main-menu-panel.component.css',
})
export class MainMenuPanelComponent {

}
