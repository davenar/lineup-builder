import { Type } from '@angular/core';

export type PanelDirection = 'left' | 'right' | 'bottom';

export type PanelCloseMode = 'close-button' | 'backdrop' | 'escape';

export type PanelCloseReason =
    | PanelCloseMode
    | 'programmatic'
    | 'replaced';

export interface IPanelOptions {
    direction?: PanelDirection;
    desktopDirection?: PanelDirection;
    mobileDirection?: PanelDirection;
    openUnderHeader?: boolean;
    headerHeight?: string;
    bottomHeight?: string;
    contentPadding?: string;
    closeModes?: PanelCloseMode[];
    showBackdrop?: boolean;
    runOnClose?: boolean;
    onClose?: (reason: PanelCloseReason) => void;
    ariaLabel?: string;
    panelClass?: string;
}

export interface ResolvedPanelOptions {
    direction: PanelDirection;
    desktopDirection?: PanelDirection;
    mobileDirection?: PanelDirection;
    openUnderHeader: boolean;
    headerHeight: string;
    bottomHeight: string;
    contentPadding: string;
    closeModes: PanelCloseMode[];
    showBackdrop: boolean;
    runOnClose: boolean;
    onClose?: (reason: PanelCloseReason) => void;
    ariaLabel: string;
    panelClass: string;
}

export interface PanelState<T = unknown> {
    component: Type<T>;
    inputs?: Record<string, unknown>;
    options: ResolvedPanelOptions;
    isOpen: boolean;
}