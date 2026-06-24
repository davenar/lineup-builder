import { Formation } from "../models/formation.models";

export const DEFAULT_FORMATION_ID = '4-4-2';

export const FORMATIONS: Record<string, Formation> = {

  // ── 4-4-2 ──────────────────────────────────────────────────
  '4-4-2': {
    id: '4-4-2',
    name: '4-4-2',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 16, label: 'LM', fullLabel: 'Left Midfielder' },
      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 20, label: 'RM', fullLabel: 'Right Midfielder' },

      { cellIndex: 27, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 29, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 4-3-3 ──────────────────────────────────────────────────
  '4-3-3': {
    id: '4-3-3',
    name: '4-3-3',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 18, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },

      { cellIndex: 26, label: 'LW', fullLabel: 'Left Winger' },
      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 30, label: 'RW', fullLabel: 'Right Winger' },
    ],
  },

  // ── 4-2-3-1 ────────────────────────────────────────────────
  '4-2-3-1': {
    id: '4-2-3-1',
    name: '4-2-3-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 12, label: 'CDM', fullLabel: 'Defensive Midfielder' },
      { cellIndex: 14, label: 'CDM', fullLabel: 'Defensive Midfielder' },

      { cellIndex: 22, label: 'LAM', fullLabel: 'Left Attacking Midfielder' },
      { cellIndex: 23, label: 'CAM', fullLabel: 'Attacking Midfielder' },
      { cellIndex: 24, label: 'RAM', fullLabel: 'Right Attacking Midfielder' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 3-5-2 ──────────────────────────────────────────────────
  '3-5-2': {
    id: '3-5-2',
    name: '3-5-2',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 8, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },

      { cellIndex: 16, label: 'LWB', fullLabel: 'Left Wing-Back' },
      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 18, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 20, label: 'RWB', fullLabel: 'Right Wing-Back' },

      { cellIndex: 27, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 29, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 5-3-2 ──────────────────────────────────────────────────
  '5-3-2': {
    id: '5-3-2',
    name: '5-3-2',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LWB', fullLabel: 'Left Wing-Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 8, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RWB', fullLabel: 'Right Wing-Back' },

      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 18, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },

      { cellIndex: 27, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 29, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 4-1-4-1 ────────────────────────────────────────────────
  '4-1-4-1': {
    id: '4-1-4-1',
    name: '4-1-4-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 13, label: 'CDM', fullLabel: 'Defensive Midfielder' },

      { cellIndex: 21, label: 'LM', fullLabel: 'Left Midfielder' },
      { cellIndex: 22, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 24, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 25, label: 'RM', fullLabel: 'Right Midfielder' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 3-4-3 ──────────────────────────────────────────────────
  '3-4-3': {
    id: '3-4-3',
    name: '3-4-3',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 8, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },

      { cellIndex: 16, label: 'LWB', fullLabel: 'Left Wing-Back' },
      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 20, label: 'RWB', fullLabel: 'Right Wing-Back' },

      { cellIndex: 26, label: 'LW', fullLabel: 'Left Winger' },
      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 30, label: 'RW', fullLabel: 'Right Winger' },
    ],
  },

  // ── 5-4-1 ──────────────────────────────────────────────────
  '5-4-1': {
    id: '5-4-1',
    name: '5-4-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LWB', fullLabel: 'Left Wing-Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 8, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RWB', fullLabel: 'Right Wing-Back' },

      { cellIndex: 16, label: 'LM', fullLabel: 'Left Midfielder' },
      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 20, label: 'RM', fullLabel: 'Right Midfielder' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 4-4-1-1 ────────────────────────────────────────────────
  '4-4-1-1': {
    id: '4-4-1-1',
    name: '4-4-1-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 11, label: 'LM', fullLabel: 'Left Midfielder' },
      { cellIndex: 12, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 14, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 15, label: 'RM', fullLabel: 'Right Midfielder' },

      { cellIndex: 23, label: 'SS', fullLabel: 'Second Striker' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 3-4-2-1 ────────────────────────────────────────────────
  '3-4-2-1': {
    id: '3-4-2-1',
    name: '3-4-2-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 8, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },

      { cellIndex: 11, label: 'LWB', fullLabel: 'Left Wing-Back' },
      { cellIndex: 12, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 14, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 15, label: 'RWB', fullLabel: 'Right Wing-Back' },

      { cellIndex: 22, label: 'LAM', fullLabel: 'Left Attacking Midfielder' },
      { cellIndex: 24, label: 'RAM', fullLabel: 'Right Attacking Midfielder' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 4-5-1 ──────────────────────────────────────────────────
  '4-5-1': {
    id: '4-5-1',
    name: '4-5-1',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 16, label: 'LM', fullLabel: 'Left Midfielder' },
      { cellIndex: 17, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 18, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 19, label: 'CM', fullLabel: 'Centre Midfielder' },
      { cellIndex: 20, label: 'RM', fullLabel: 'Right Midfielder' },

      { cellIndex: 28, label: 'ST', fullLabel: 'Striker' },
    ],
  },

  // ── 4-2-2-2 ────────────────────────────────────────────────
  '4-2-2-2': {
    id: '4-2-2-2',
    name: '4-2-2-2',
    slots: [
      { cellIndex: 3, label: 'GK', fullLabel: 'Goalkeeper' },

      { cellIndex: 6, label: 'LB', fullLabel: 'Left Back' },
      { cellIndex: 7, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 9, label: 'CB', fullLabel: 'Centre Back' },
      { cellIndex: 10, label: 'RB', fullLabel: 'Right Back' },

      { cellIndex: 12, label: 'CDM', fullLabel: 'Defensive Midfielder' },
      { cellIndex: 14, label: 'CDM', fullLabel: 'Defensive Midfielder' },

      { cellIndex: 22, label: 'LAM', fullLabel: 'Left Attacking Midfielder' },
      { cellIndex: 24, label: 'RAM', fullLabel: 'Right Attacking Midfielder' },

      { cellIndex: 27, label: 'ST', fullLabel: 'Striker' },
      { cellIndex: 29, label: 'ST', fullLabel: 'Striker' },
    ],
  },
};

export const FORMATION_OPTIONS = Object.values(FORMATIONS).map(f => ({
  value: f.id,
  label: f.name,
}));