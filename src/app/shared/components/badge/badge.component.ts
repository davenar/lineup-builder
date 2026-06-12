import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="badge"
      [class.badge-on-btn]="onButton()"
      [style]="badgeStyle()"
    >
      {{ text() }}
    </span>
  `,
})
export class BadgeComponent {
  /** Text displayed inside the badge. */
  text = input.required<string>();

  /**
   * Optional CSS color string (any valid CSS color: hex, rgb, hsl, named…).
   * When omitted the badge falls back to the glass style.
   */
  color = input<string | undefined>(undefined);

  /**
   * Set to true when the badge is placed inside a .btn element.
   * Adds the .badge-on-btn class which positions it absolutely
   * at the top-right corner of the button.
   */
  onButton = input<boolean>(false);

  /** Derives the inline style string from the color signal. */
  badgeStyle = computed(() => {
    const c = this.color();
    return c ? `--badge-color: ${c}` : null;
  });
}