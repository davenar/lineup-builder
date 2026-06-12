import { Injectable, Type, signal } from '@angular/core';
import {
  IPanelOptions,
  PanelCloseReason,
  PanelState,
  ResolvedPanelOptions,
} from '../../shared/components/panel/panel.types';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private readonly animationDuration = 320;
  private closeTimer?: ReturnType<typeof setTimeout>;
  private pendingOpenTimer?: ReturnType<typeof setTimeout>;

  private readonly defaultOptions: ResolvedPanelOptions = {
    direction: 'left',
    desktopDirection: undefined,
    mobileDirection: undefined,
    openUnderHeader: false,
    headerHeight: '6.4rem',
    bottomHeight: '70dvh',
    contentPadding: 'var(--spacing-lg)',
    closeModes: ['close-button', 'backdrop', 'escape'],
    showBackdrop: true,
    runOnClose: true,
    onClose: undefined,
    ariaLabel: 'Panel',
    panelClass: '',
  };

  private readonly panelState = signal<PanelState | null>(null);

  readonly state = this.panelState.asReadonly();

  open<T>(
    component: Type<T>,
    options: IPanelOptions = {},
    inputs?: Record<string, unknown>,
  ): void {
    this.clearTimers();

    const nextState: PanelState<T> = {
      component,
      inputs,
      options: {
        ...this.defaultOptions,
        ...options,
        closeModes: options.closeModes ?? this.defaultOptions.closeModes,
      },
      isOpen: true,
    };

    const currentState = this.panelState();

    if (currentState?.isOpen) {
      this.executeOnClose(currentState, 'replaced');

      this.panelState.set({
        ...currentState,
        isOpen: false,
      });

      this.pendingOpenTimer = setTimeout(() => {
        this.panelState.set(nextState);
        this.pendingOpenTimer = undefined;
      }, this.animationDuration);

      return;
    }

    this.panelState.set(nextState);
  }

  close(reason: PanelCloseReason = 'programmatic'): void {
    this.clearPendingOpenTimer();

    const currentState = this.panelState();

    if (!currentState || !currentState.isOpen) {
      return;
    }

    this.executeOnClose(currentState, reason);

    this.panelState.set({
      ...currentState,
      isOpen: false,
    });

    this.closeTimer = setTimeout(() => {
      const latestState = this.panelState();

      if (!latestState?.isOpen) {
        this.panelState.set(null);
      }

      this.closeTimer = undefined;
    }, this.animationDuration);
  }

  private executeOnClose(
    state: PanelState,
    reason: PanelCloseReason,
  ): void {
    if (!state.options.runOnClose) {
      return;
    }

    state.options.onClose?.(reason);
  }

  private clearTimers(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = undefined;
    }

    this.clearPendingOpenTimer();
  }

  private clearPendingOpenTimer(): void {
    if (this.pendingOpenTimer) {
      clearTimeout(this.pendingOpenTimer);
      this.pendingOpenTimer = undefined;
    }
  }
}