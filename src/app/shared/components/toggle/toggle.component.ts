import {
  Component, input, output, model,
  computed, effect, signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

let _uid = 0;

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="toggle-wrap" [class.opacity-40]="disabled()" [class.pointer-events-none]="disabled()">
      <input
        type="checkbox"
        [id]="uid"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="onChange($event)"
      />
      @if (label()) {
        <span>{{ label() }}</span>
      }
    </label>
  `,
})
export class ToggleComponent {
  /** Label text shown next to the toggle. */
  label = input<string>('');

  /**
   * Two-way bindable checked state.
   * Use [(checked)]="mySignal" or [checked]="val" + (toggled)="fn($event)".
   */
  checked = model<boolean>(false);

  /** Disables interaction when true. */
  disabled = input<boolean>(false);

  /** Emits the new boolean value whenever the toggle changes. */
  toggled = output<boolean>();

  /** Unique id so the label/input pair is always accessible. */
  readonly uid = `app-toggle-${++_uid}`;

  onChange(event: Event) {
    const val = (event.target as HTMLInputElement).checked;
    this.checked.set(val);
    this.toggled.emit(val);
  }
}