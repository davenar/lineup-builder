import { Component, signal } from '@angular/core';
import { BadgeComponent } from '../shared/components/badge/badge.component';
import { ToggleComponent } from '../shared/components/toggle/toggle.component';
import { SelectComponent, SelectOption } from '../shared/components/select/select.component';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [BadgeComponent, ToggleComponent, SelectComponent],
  templateUrl: './styleguide.component.html',
  styleUrl: './styleguide.component.css',
})
export class StyleguideComponent {

  // ── Select demo ────────────────────────────────────────────
  selectedRole = signal('');

  onRoleChange(opt: SelectOption) {
    console.log('Selected role:', opt);
  }

  // ── Toggle demo ─────────────────────────────────────────────
  isDark = signal(false);
}