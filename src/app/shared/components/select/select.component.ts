import { Component, input, output, model } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

let _uid = 0;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  /** List of options to display. */
  options = input.required<SelectOption[]>();

  /** Field label shown above the control. */
  label = input<string>('');

  /** Placeholder shown when no value is selected. */
  placeholder = input<string>('');

  /** Hint text shown below the field (hidden when error is set). */
  hint = input<string>('');

  /** Error message — also applies .input-error styling. */
  error = input<string>('');

  /** Disables the control. */
  disabled = input<boolean>(false);

  /** Two-way bindable selected value. */
  value = model<string>('');

  /**
   * Emits the full SelectOption whenever the selection changes.
   * Named 'selected' to avoid clashing with the 'valueChange' output
   * that model<string>() generates automatically.
   */
  selected = output<SelectOption>();

  readonly uid = `app-select-${++_uid}`;

  onNativeChange(e: Event): void {
    const val = (e.target as HTMLSelectElement).value;
    this.value.set(val);
    const opt = this.options().find(o => o.value === val);
    if (opt) {
      this.selected.emit(opt);
    }
  }
}