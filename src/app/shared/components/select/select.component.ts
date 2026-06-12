import {
  Component, input, output, model,
  signal, computed, inject, effect, OnDestroy,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export interface SelectOption {
  value: string;
  label: string;
}

let _uid = 0;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- ── Desktop (≥ 1024 px): native select ── -->
    @if (isDesktop()) {
      <div class="field">
        @if (label()) {
          <label class="field-label" [for]="uid">{{ label() }}</label>
        }
        <select
          [id]="uid"
          class="input select-native"
          [disabled]="disabled()"
          [class.input-error]="error()"
          (change)="onNativeChange($event)"
        >
          @if (placeholder()) {
            <option value="" [selected]="!value()">{{ placeholder() }}</option>
          }
          @for (opt of options(); track opt.value) {
            <option [value]="opt.value" [selected]="opt.value === value()">
              {{ opt.label }}
            </option>
          }
        </select>
        @if (hint() && !error()) {
          <span class="field-hint">{{ hint() }}</span>
        }
        @if (error()) {
          <span class="field-error">{{ error() }}</span>
        }
      </div>
    }

    <!-- ── Mobile / Tablet (< 1024 px): bottom-sheet trigger ── -->
    @if (!isDesktop()) {
      <div class="field">
        @if (label()) {
          <label class="field-label" [for]="uid + '-trigger'">{{ label() }}</label>
        }
        <button
          type="button"
          [id]="uid + '-trigger'"
          class="input select-native text-left"
          [class.input-error]="error()"
          [disabled]="disabled()"
          (click)="openSheet()"
          aria-haspopup="listbox"
          [attr.aria-expanded]="sheetOpen()"
        >
          {{ selectedLabel() || placeholder() || 'Select…' }}
        </button>
        @if (hint() && !error()) {
          <span class="field-hint">{{ hint() }}</span>
        }
        @if (error()) {
          <span class="field-error">{{ error() }}</span>
        }
      </div>

      <!-- Bottom-sheet backdrop -->
      <div
        class="select-sheet-backdrop"
        [class.open]="sheetOpen()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="label() || 'Select an option'"
        (click)="onBackdropClick($event)"
      >
        <div class="select-sheet">
          <div class="select-sheet-handle"></div>

          @if (label()) {
            <p class="select-sheet-title">{{ label() }}</p>
          }

          @for (opt of options(); track opt.value) {
            <label class="select-sheet-option">
              <input
                class="radio-wrap"
                type="radio"
                [name]="uid + '-sheet'"
                [value]="opt.value"
                [checked]="opt.value === value()"
                (change)="onSheetSelect(opt)"
              />
              <span>{{ opt.label }}</span>
            </label>
          }

          <button
            type="button"
            class="btn btn-pill btn-outline w-full mt-lg"
            (click)="closeSheet()"
          >
            Close
          </button>
        </div>
      </div>
    }
  `,
})
export class SelectComponent implements OnDestroy {
  /** List of options to display. */
  options = input.required<SelectOption[]>();

  /** Field label shown above the control. */
  label = input<string>('');

  /** Placeholder shown when no value is selected. */
  placeholder = input<string>('Select…');

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

  sheetOpen = signal(false);

  /** True when the viewport is at least 1024 px wide. */
  private bp = inject(BreakpointObserver);
  isDesktop = toSignal(
    this.bp.observe('(min-width: 1024px)').pipe(map(s => s.matches)),
    { initialValue: this.bp.isMatched('(min-width: 1024px)') },
  );

  /** Derives the label of the currently selected option. */
  selectedLabel = computed(() => {
    const opt = this.options().find(o => o.value === this.value());
    return opt?.label ?? '';
  });

  openSheet() { this.sheetOpen.set(true); this._lockScroll(true); }
  closeSheet() { this.sheetOpen.set(false); this._lockScroll(false); }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('select-sheet-backdrop')) {
      this.closeSheet();
    }
  }

  onNativeChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    this._emit(val);
  }

  onSheetSelect(opt: SelectOption) {
    this._emit(opt.value);
    this.closeSheet();
  }

  private _emit(val: string) {
    this.value.set(val);
    const opt = this.options().find(o => o.value === val);
    if (opt) this.selected.emit(opt);
  }

  /** Prevent body scroll while the sheet is open. */
  private _lockScroll(lock: boolean) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  ngOnDestroy() { this._lockScroll(false); }
}