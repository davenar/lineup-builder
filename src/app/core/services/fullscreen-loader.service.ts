import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenLoaderService {
  /**
   * Signal to track fullscreen loader visibility
   */
  public isVisible = signal<boolean>(false);

  /**
   * Show fullscreen loader
   */
  show(): void {
    this.isVisible.set(true);
  }

  /**
   * Hide fullscreen loader
   */
  hide(): void {
    this.isVisible.set(false);
  }

  /**
   * Toggle fullscreen loader
   */
  toggle(): void {
    this.isVisible.set(!this.isVisible());
  }
}