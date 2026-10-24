import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly transloco = inject(TranslocoService);

  init(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
      .subscribe(() => {
        if (confirm(this.transloco.translate('app.updateAvailable'))) {
          document.location.reload();
        }
      });
  }
}