import { Directive, input } from '@angular/core';

/**
 * Replaces the `src` of an `<img>` with a placeholder when the original fails to load.
 *
 * The loop guard compares the current `img.src` with the absolute fallback URL
 * (no boolean flag), so the same element can be reused with a different `src`.
 */
@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
  host: { '(error)': 'onError($event)' },
})
export class ImgFallbackDirective {
  /** Fallback URL, resolved against the document base URI. */
  appImgFallback = input<string>('images/placeholders/player.svg');

  onError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const fallback = new URL(this.appImgFallback(), document.baseURI).href;
    if (img.src !== fallback) {
      img.src = fallback;
    }
  }
}
