import { DOCUMENT, NgComponentOutlet, NgStyle } from '@angular/common';
import {
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { A11yModule } from '@angular/cdk/a11y';
import { TranslocoPipe } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelService } from '../../../../core/services/panel.service';
import { PanelCloseMode, PanelDirection } from '../panel.types';

@Component({
  selector: 'app-panel-host',
  standalone: true,
  imports: [NgStyle, NgComponentOutlet, A11yModule, TranslocoPipe],
  templateUrl: './panel-host.component.html',
})
export class PanelHostComponent {
  private readonly panelService = inject(PanelService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly document = inject(DOCUMENT);

  readonly state = this.panelService.state;
  readonly isDesktop = signal(false);

  readonly effectiveDirection = computed<PanelDirection>(() => {
    const currentState = this.state();

    if (!currentState) {
      return 'left';
    }

    const options = currentState.options;

    if (this.isDesktop()) {
      return options.desktopDirection ?? options.direction;
    }

    return options.mobileDirection ?? options.direction;
  });

  readonly isLateralPanel = computed(() => {
    const direction = this.effectiveDirection();

    return direction === 'left' || direction === 'right';
  });

  readonly rootStyles = computed<Record<string, string>>(() => {
    const currentState = this.state();

    if (!currentState) {
      return {} as Record<string, string>;
    }

    if (this.isLateralPanel() && currentState.options.openUnderHeader) {
      return {
        top: currentState.options.headerHeight,
      };
    }

    return {} as Record<string, string>;
  });

  readonly panelStyles = computed<Record<string, string>>(() => {
    const currentState = this.state();

    if (!currentState) {
      return {} as Record<string, string>;
    }

    return {
      '--panel-padding': currentState.options.contentPadding,
      '--panel-bottom-height': currentState.options.bottomHeight,
    };
  });

  readonly panelClasses = computed(() => {
    const currentState = this.state();
    const direction = this.effectiveDirection();
    const hasCloseButton = this.hasCloseMode('close-button');

    return [
      'panel-surface',
      `panel-surface-${direction}`,
      currentState?.isOpen ? 'panel-open' : '',
      hasCloseButton ? 'panel-has-close-button' : '',
      currentState?.options.panelClass ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    this.breakpointObserver
      .observe('(min-width: 1024px)')
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isDesktop.set(result.matches);
      });

    effect(onCleanup => {
      const currentState = this.state();

      if (!currentState?.isOpen) {
        return;
      }

      const previousOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';

      onCleanup(() => {
        this.document.body.style.overflow = previousOverflow;
      });
    });
  }

  hasCloseMode(mode: PanelCloseMode): boolean {
    const currentState = this.state();

    return currentState?.options.closeModes.includes(mode) ?? false;
  }

  closeFromBackdrop(): void {
    if (!this.hasCloseMode('backdrop')) {
      return;
    }

    this.panelService.close('backdrop');
  }

  closeFromButton(): void {
    if (!this.hasCloseMode('close-button')) {
      return;
    }

    this.panelService.close('close-button');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.hasCloseMode('escape')) {
      return;
    }

    this.panelService.close('escape');
  }
}