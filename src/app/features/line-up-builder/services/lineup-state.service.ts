import { computed, Injectable, signal } from '@angular/core';
import { FORMATIONS, DEFAULT_FORMATION_ID } from '../constants/formations.data';
import { DEFAULT_PITCH_CARD_STYLE, DEFAULT_BENCH_CARD_STYLE, DEFAULT_PITCH_BACKGROUND } from '../constants/player-card-style.data';
import { Formation, FormationSlot } from '../models/formation.models';
import { PlayerInfoData } from '../models/player-info-response.model';
import { PitchCardStyle, BenchCardStyle, PitchBackground } from '../types/line-up-builder-settings.types';

export type DragOrigin = { zone: 'pitch' | 'bench'; index: number };
interface StoredLineup {
  formationId: string;
  pitch: Record<number, PlayerInfoData>;
  bench: Record<number, PlayerInfoData>;
  pitchCardStyle: PitchCardStyle;
  benchCardStyle: BenchCardStyle;
  pitchBackground: PitchBackground;
  savedAt: string;
}

const STORAGE_KEY = 'lineup-builder:saved-lineup';
export const BENCH_SLOTS_COUNT = 12;

@Injectable({
  providedIn: 'root',
})
export class LineupStateService {
  private readonly _currentFormation = signal<Formation>(FORMATIONS[DEFAULT_FORMATION_ID]);
  readonly currentFormation = this._currentFormation.asReadonly();

  private readonly _pitchAssignments = signal<Map<number, PlayerInfoData>>(new Map());
  readonly pitchAssignments = this._pitchAssignments.asReadonly();

  private readonly _benchAssignments = signal<Map<number, PlayerInfoData>>(new Map());
  readonly benchAssignments = this._benchAssignments.asReadonly();

  private readonly _pitchCardStyle = signal<PitchCardStyle>(DEFAULT_PITCH_CARD_STYLE);
  readonly pitchCardStyle = this._pitchCardStyle.asReadonly();

  private readonly _benchCardStyle = signal<BenchCardStyle>(DEFAULT_BENCH_CARD_STYLE);
  readonly benchCardStyle = this._benchCardStyle.asReadonly();

  private readonly _pitchBackground = signal<PitchBackground>(DEFAULT_PITCH_BACKGROUND);
  readonly pitchBackground = this._pitchBackground.asReadonly();

  /** true se in localStorage esiste una formazione valida e caricabile */
  private readonly _canLoadSavedLineup = signal<boolean>(false);
  readonly canLoadSavedLineup = this._canLoadSavedLineup.asReadonly();

  readonly activeSlotsByCell = computed<Map<number, FormationSlot>>(() => {
    const map = new Map<number, FormationSlot>();
    this._currentFormation().slots.forEach(slot => map.set(slot.cellIndex, slot));
    return map;
  });

  constructor() {
    this.refreshCanLoadSavedLineup();
  }

  // ── Formazione ─────────────────────────────────────────────

  setFormation(formationId: string): void {
    const formation = FORMATIONS[formationId];

    if (!formation) {
      return;
    }

    // mantiene i giocatori già assegnati alle celle che restano attive
    // nel nuovo modulo, rimuove quelli nelle celle che non esistono più
    const activeCells = new Set(formation.slots.map(slot => slot.cellIndex));

    const nextPitch = new Map<number, PlayerInfoData>();
    this._pitchAssignments().forEach((player, cellIndex) => {
      if (activeCells.has(cellIndex)) {
        nextPitch.set(cellIndex, player);
      }
    });

    this._currentFormation.set(formation);
    this._pitchAssignments.set(nextPitch);
  }

  // ── Pitch ──────────────────────────────────────────────────

  assignPitchPlayer(cellIndex: number, player: PlayerInfoData): void {
    const next = new Map(this._pitchAssignments());
    next.set(cellIndex, player);
    this._pitchAssignments.set(next);
  }

  removePitchPlayer(cellIndex: number): void {
    const next = new Map(this._pitchAssignments());
    next.delete(cellIndex);
    this._pitchAssignments.set(next);
  }

  // ── Bench ──────────────────────────────────────────────────

  assignBenchPlayer(benchIndex: number, player: PlayerInfoData): void {
    const next = new Map(this._benchAssignments());
    next.set(benchIndex, player);
    this._benchAssignments.set(next);
  }

  removeBenchPlayer(benchIndex: number): void {
    const next = new Map(this._benchAssignments());
    next.delete(benchIndex);
    this._benchAssignments.set(next);
  }

  // ── Stile carte / sfondo ─────────────────────────────────────

  setPitchCardStyle(style: PitchCardStyle): void {
    this._pitchCardStyle.set(style);
  }

  setBenchCardStyle(style: BenchCardStyle): void {
    this._benchCardStyle.set(style);
  }

  setPitchBackground(background: PitchBackground): void {
    this._pitchBackground.set(background);
  }

  // ── Reset ──────────────────────────────────────────────────

  /** Azzera solo i giocatori assegnati (pitch + bench), non tocca formazione, stili o localStorage */
  resetLineup(): void {
    this._pitchAssignments.set(new Map());
    this._benchAssignments.set(new Map());
  }

  // ── Persistenza ──────────────────────────────────────────────

  saveLineup(): void {
    const payload: StoredLineup = {
      formationId: this._currentFormation().id,
      pitch: this.mapToRecord(this._pitchAssignments()),
      bench: this.mapToRecord(this._benchAssignments()),
      pitchCardStyle: this._pitchCardStyle(),
      benchCardStyle: this._benchCardStyle(),
      pitchBackground: this._pitchBackground(),
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      this._canLoadSavedLineup.set(true);
    } catch {
      // localStorage non disponibile (es. private mode): ignora silenziosamente
    }
  }

  /** Carica la formazione salvata, se valida. Ritorna true/false in base all'esito */
  loadLineup(): boolean {
    const stored = this.readStoredLineup();

    if (!stored) {
      this._canLoadSavedLineup.set(false);
      return false;
    }

    const formation = FORMATIONS[stored.formationId];

    if (!formation) {
      this._canLoadSavedLineup.set(false);
      return false;
    }

    this._currentFormation.set(formation);
    this._pitchAssignments.set(this.recordToMap(stored.pitch));
    this._benchAssignments.set(this.recordToMap(stored.bench));
    this._pitchCardStyle.set(stored.pitchCardStyle ?? DEFAULT_PITCH_CARD_STYLE);
    this._benchCardStyle.set(stored.benchCardStyle ?? DEFAULT_BENCH_CARD_STYLE);
    this._pitchBackground.set(stored.pitchBackground ?? DEFAULT_PITCH_BACKGROUND);

    return true;
  }

  clearSavedLineup(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
    this._canLoadSavedLineup.set(false);
  }

  private refreshCanLoadSavedLineup(): void {
    this._canLoadSavedLineup.set(this.readStoredLineup() !== null);
  }

  private readStoredLineup(): StoredLineup | null {
    let raw: string | null;

    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }

    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as StoredLineup;

      const isValid =
        !!parsed &&
        typeof parsed.formationId === 'string' &&
        !!FORMATIONS[parsed.formationId] &&
        typeof parsed.pitch === 'object' &&
        typeof parsed.bench === 'object';

      return isValid ? parsed : null;
    } catch {
      return null;
    }
  }

  private mapToRecord<T>(map: Map<number, T>): Record<number, T> {
    const record: Record<number, T> = {};
    map.forEach((value, key) => {
      record[key] = value;
    });
    return record;
  }

  private recordToMap<T>(record: Record<number, T>): Map<number, T> {
    const map = new Map<number, T>();
    Object.entries(record ?? {}).forEach(([key, value]) => {
      map.set(Number(key), value);
    });
    return map;
  }

  // ── Drag & Drop ────────────────────────────────────────────

  /**
   * Sposta o scambia due giocatori tra qualsiasi combinazione di
   * pitch e bench. Se il target è occupato scambia, altrimenti sposta.
   */
  swapOrMovePlayer(source: DragOrigin, target: DragOrigin): void {
    if (source.zone === target.zone && source.index === target.index) {
      return;
    }

    const pitch = new Map(this._pitchAssignments());
    const bench = new Map(this._benchAssignments());

    const getMap = (zone: DragOrigin['zone']) => (zone === 'pitch' ? pitch : bench);

    const sourceMap = getMap(source.zone);
    const targetMap = getMap(target.zone);

    const sourcePlayer = sourceMap.get(source.index);
    if (!sourcePlayer) {
      return;
    }

    const targetPlayer = targetMap.get(target.index);

    targetMap.set(target.index, sourcePlayer);

    if (targetPlayer) {
      sourceMap.set(source.index, targetPlayer);
    } else {
      sourceMap.delete(source.index);
    }

    this._pitchAssignments.set(pitch);
    this._benchAssignments.set(bench);
  }

}