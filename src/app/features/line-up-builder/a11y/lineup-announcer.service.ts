import { LiveAnnouncer } from '@angular/cdk/a11y';
import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Formation, FormationSlot } from '../models/formation.models';
import { DragOrigin, LineupStateService } from '../services/lineup-state.service';
import { KNOWN_POSITION_CODES } from '../../../shared/pipes/position-label.pipe';

/** Moduli il cui nome contiene parole da tradurre (gli altri sono solo numeri) */
export const FORMATION_NAME_KEYS: Readonly<Record<string, string>> = {
  '4-4-2-diamond': 'formations.names.4-4-2-diamond',
  '4-1-2-1-2': 'formations.names.4-1-2-1-2',
  '4-1-2-1-2-wide': 'formations.names.4-1-2-1-2-wide',
};

/**
 * Layer di presentazione per l'accessibilità della formazione:
 * nomi leggibili degli slot e annunci nella live region (aria-live="polite")
 * di CDK LiveAnnouncer. Non modifica lo stato: legge LineupStateService.
 */
@Injectable({ providedIn: 'root' })
export class LineupAnnouncerService {
  private readonly liveAnnouncer = inject(LiveAnnouncer);
  private readonly transloco = inject(TranslocoService);
  private readonly lineupState = inject(LineupStateService);

  announce(key: string, params?: Record<string, unknown>): void {
    this.liveAnnouncer.announce(this.transloco.translate(key, params), 'polite');
  }

  formationName(formation: Pick<Formation, 'id' | 'name'>): string {
    const key = FORMATION_NAME_KEYS[formation.id];
    return key ? this.transloco.translate(key) : formation.name;
  }

  /** Nome esteso e localizzato dello slot del campo (es. "Terzino sinistro") */
  pitchSlotName(slot: Pick<FormationSlot, 'label' | 'fullLabel'>): string {
    return KNOWN_POSITION_CODES.has(slot.label)
      ? this.transloco.translate(`positions.long.${slot.label}`)
      : slot.fullLabel;
  }

  benchSlotName(benchIndex: number): string {
    return this.transloco.translate('lineup.benchSlot', { index: benchIndex });
  }

  originName(origin: DragOrigin): string {
    if (origin.zone === 'bench') {
      return this.benchSlotName(origin.index);
    }

    const slot = this.lineupState.activeSlotsByCell().get(origin.index);
    return slot ? this.pitchSlotName(slot) : String(origin.index);
  }

  playerAt(origin: DragOrigin): string | null {
    const map = origin.zone === 'pitch'
      ? this.lineupState.pitchAssignments()
      : this.lineupState.benchAssignments();
    return map.get(origin.index)?.shortname ?? null;
  }

  /**
   * Da chiamare PRIMA di swapOrMovePlayer: restituisce una funzione che,
   * eseguita dopo lo spostamento, annuncia cosa è successo.
   */
  prepareMoveAnnouncement(source: DragOrigin, target: DragOrigin): () => void {
    const player = this.playerAt(source);
    const other = this.playerAt(target);

    return () => {
      if (!player || (source.zone === target.zone && source.index === target.index)) {
        return;
      }

      if (other) {
        this.announce('a11y.playersSwapped', {
          player,
          slot: this.originName(target),
          other,
          otherSlot: this.originName(source),
        });
      } else {
        this.announce('a11y.playerMoved', { player, slot: this.originName(target) });
      }
    };
  }
}
