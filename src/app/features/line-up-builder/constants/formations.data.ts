import { Formation, FormationSlot } from '../models/formation.models';

export const DEFAULT_FORMATION_ID = '4-4-2';

/* ============================================================
 * FORMATION DATA
 *
 * Coordinate system (viewer perspective):
 *   x: 0 = viewer-left touchline, 100 = viewer-right touchline
 *   y: 0 = own goal line (TOP of screen), 100 = opponent goal line
 *
 * The team attacks DOWN the screen, so the team's LEFT side is
 * the VIEWER'S RIGHT: left-sided players (LB, LM, LW, LWB, LAM)
 * have HIGH x values, right-sided players have LOW x values.
 *
 * Positions describe the IN-POSSESSION resting shape (the shape
 * you see on team sheets and tactics boards), not the defensive
 * block. That's why full-backs sit HIGHER than centre-backs:
 * in modern football the first build-up line is the two CBs,
 * with full-backs pushed on as width providers.
 *
 * Safe ranges (cards are ~16cqw wide, anchored at their centre):
 *   x within 8–92, y within 6–88.
 * ============================================================ */

type SlotDef = Omit<FormationSlot, 'cellIndex'>;

const s = (label: string, fullLabel: string, x: number, y: number): SlotDef =>
  ({ label, fullLabel, x, y });

/* ── GOALKEEPER ─────────────────────────────────────────────── */
const GK = s('GK', 'Goalkeeper', 50, 6);

/* ── DEFENSIVE LINES ────────────────────────────────────────── */

// Back four: CBs form the deep build-up pair; full-backs start
// wider AND higher — they are the team's width in possession.
const BACK_4 = [
  s('LB', 'Left Back', 89, 30),
  s('CB', 'Centre Back', 64, 22),
  s('CB', 'Centre Back', 36, 22),
  s('RB', 'Right Back', 11, 30),
];

// Back three: the central CB (the "libero"/pivot defender) sits
// a touch deeper as the spare man; the wide CBs step out to
// defend the half-spaces.
const BACK_3 = [
  s('CB', 'Centre Back', 74, 25),
  s('CB', 'Centre Back', 50, 21),
  s('CB', 'Centre Back', 26, 25),
];

// Back five: same CB trio, plus wing-backs who are hybrids —
// even in a defensive 5-x-x they start well above the CB line
// and hug the touchline.
const BACK_5 = [
  s('LWB', 'Left Wing-Back', 92, 34),
  s('CB', 'Centre Back', 71, 24),
  s('CB', 'Centre Back', 50, 21),
  s('CB', 'Centre Back', 29, 24),
  s('RWB', 'Right Wing-Back', 8, 34),
];

/* ── MIDFIELD LINES ─────────────────────────────────────────── */

// Flat midfield four (classic 4-4-2): wide midfielders slightly
// advanced relative to the central pair — they double as the
// team's only wide attackers.
const MID_4_FLAT = [
  s('LM', 'Left Midfielder', 89, 56),
  s('CM', 'Centre Midfielder', 64, 51),
  s('CM', 'Centre Midfielder', 36, 51),
  s('RM', 'Right Midfielder', 11, 56),
];

// 4-3-3-style triangle, point DOWN: a single pivot screening the
// back four with two no. 8s ahead of him in the half-spaces.
const MID_3_PIVOT = [
  s('CDM', 'Defensive Midfielder', 50, 43),
  s('CM', 'Centre Midfielder', 71, 56),
  s('CM', 'Centre Midfielder', 29, 56),
];

// Flat central three (4-3-1-2, 5-3-2): narrow, compact, with the
// central CM marginally deeper as the balancing player.
const MID_3_FLAT = [
  s('CM', 'Centre Midfielder', 73, 52),
  s('CM', 'Centre Midfielder', 50, 48),
  s('CM', 'Centre Midfielder', 27, 52),
];

// Double pivot (4-2-3-1, 4-2-2-2): two holders protecting the
// space in front of the CBs — a flat "2".
const DOUBLE_PIVOT = [
  s('CDM', 'Defensive Midfielder', 64, 42),
  s('CDM', 'Defensive Midfielder', 36, 42),
];

// Lone anchor (diamond, 4-1-4-1, 4-1-2-1-2): the deepest of the
// midfield unit, sitting in the "hole" in front of the defence.
const ANCHOR = s('CDM', 'Defensive Midfielder', 50, 39);

// Classic no. 10 at the tip of a diamond / behind the strikers.
const CAM = s('CAM', 'Central Attacking Midfielder', 50, 68);

// 3-4-x middle band: wing-backs provide ALL the width, so the two
// CMs stay very central; wing-backs a touch deeper than the CMs.
const WB_MID_4 = [
  s('LWB', 'Left Wing-Back', 92, 48),
  s('CM', 'Centre Midfielder', 64, 51),
  s('CM', 'Centre Midfielder', 36, 51),
  s('RWB', 'Right Wing-Back', 8, 48),
];

// 3-5-x middle band: three central midfielders (point slightly
// back) flanked by all-action wing-backs.
const WB_MID_5 = [
  s('LWB', 'Left Wing-Back', 92, 48),
  s('CM', 'Centre Midfielder', 70, 54),
  s('CM', 'Centre Midfielder', 50, 47),
  s('CM', 'Centre Midfielder', 30, 54),
  s('RWB', 'Right Wing-Back', 8, 48),
];

/* ── ATTACKING LINES ────────────────────────────────────────── */

// Strike partnership: split either side of the central lane so
// each occupies one CB (classic front-two principle).
const ST_PAIR = [
  s('ST', 'Striker', 64, 84),
  s('ST', 'Striker', 36, 84),
];

const LONE_ST = s('ST', 'Striker', 50, 85);

// Front three: wingers high, wide and slightly withdrawn from the
// no. 9, ready to attack the far post / cut inside.
const FRONT_3 = [
  s('LW', 'Left Winger', 87, 78),
  s('ST', 'Striker', 50, 85),
  s('RW', 'Right Winger', 13, 78),
];

/* ── FACTORY ────────────────────────────────────────────────── */
// Slots are numbered 1..11 in GK → defence → midfield → attack
// order, so players "migrate" sensibly when switching formations.
function formation(id: string, name: string, defs: SlotDef[]): Formation {
  return { id, name, slots: defs.map((d, i) => ({ ...d, cellIndex: i + 1 })) };
}

/* ============================================================
 * FORMATIONS — ordered: back four → back three → back five
 * ============================================================ */
export const FORMATIONS: Record<string, Formation> = {

  /* ────────────────────────── BACK FOUR ────────────────────── */

  // The traditional English shape: two banks of four, a strike
  // pair, wide midfielders supplying crosses.
  '4-4-2': formation('4-4-2', '4-4-2', [GK, ...BACK_4, ...MID_4_FLAT, ...ST_PAIR]),

  // Diamond midfield: no natural width (full-backs must provide
  // it), anchor at the base, no. 10 at the tip behind two strikers.
  '4-4-2-diamond': formation('4-4-2-diamond', '4-4-2 Diamond', [
    GK, ...BACK_4, ANCHOR,
    s('CM', 'Central Midfielder', 71, 53),
    s('CM', 'Central Midfielder', 29, 53),
    CAM, ...ST_PAIR,
  ]),

  // 4-4-2 variant with a withdrawn second striker ("in the hole")
  // instead of a flat front two.
  '4-4-1-1': formation('4-4-1-1', '4-4-1-1', [
    GK, ...BACK_4, ...MID_4_FLAT,
    s('SS', 'Second Striker', 50, 70),
    LONE_ST,
  ]),

  // The modern pressing default: single pivot, two no. 8s, wide
  // forwards stretching the pitch.
  '4-3-3': formation('4-3-3', '4-3-3', [GK, ...BACK_4, ...MID_3_PIVOT, ...FRONT_3]),

  // Narrow 4-3-3 cousin: flat three, a no. 10, two strikers.
  '4-3-1-2': formation('4-3-1-2', '4-3-1-2', [GK, ...BACK_4, ...MID_3_FLAT, CAM, ...ST_PAIR]),

  // The "Christmas tree" (Ancelotti's Milan): very narrow, two
  // inside forwards supporting a lone no. 9.
  '4-3-2-1': formation('4-3-2-1', '4-3-2-1', [
    GK, ...BACK_4, ...MID_3_FLAT,
    s('CF', 'Centre Forward', 67, 70),
    s('CF', 'Centre Forward', 33, 70),
    LONE_ST,
  ]),

  // Double pivot + attacking trident behind a lone striker; the
  // wide AMs play higher/wider than diamond CMs but lower than
  // 4-3-3 wingers.
  '4-2-3-1': formation('4-2-3-1', '4-2-3-1', [
    GK, ...BACK_4, ...DOUBLE_PIVOT,
    s('LAM', 'Left Attacking Midfielder', 84, 66),
    s('CAM', 'Attacking Midfielder', 50, 69),
    s('RAM', 'Right Attacking Midfielder', 16, 66),
    LONE_ST,
  ]),

  // Brazilian "magic square": double pivot, two narrow no. 10s,
  // two strikers — full-backs give all the width.
  '4-2-2-2': formation('4-2-2-2', '4-2-2-2', [
    GK, ...BACK_4, ...DOUBLE_PIVOT,
    s('LAM', 'Left Attacking Midfielder', 73, 64),
    s('RAM', 'Right Attacking Midfielder', 27, 64),
    ...ST_PAIR,
  ]),

  // A 4-5-1 with clear roles: lone anchor screening, a flat line
  // of four ahead of him, one striker.
  '4-1-4-1': formation('4-1-4-1', '4-1-4-1', [
    GK, ...BACK_4, ANCHOR,
    s('LM', 'Left Midfielder', 89, 58),
    s('CM', 'Centre Midfielder', 65, 55),
    s('CM', 'Centre Midfielder', 35, 55),
    s('RM', 'Right Midfielder', 11, 58),
    LONE_ST,
  ]),

  // Defensive five-man midfield block, central point slightly
  // withdrawn — the containment shape.
  '4-5-1': formation('4-5-1', '4-5-1', [
    GK, ...BACK_4,
    s('LM', 'Left Midfielder', 90, 54),
    s('CM', 'Centre Midfielder', 70, 51),
    s('CM', 'Centre Midfielder', 50, 47),
    s('CM', 'Centre Midfielder', 30, 51),
    s('RM', 'Right Midfielder', 10, 54),
    LONE_ST,
  ]),

  // Diamond, narrow variant: the CMs tuck inside the half-spaces.
  '4-1-2-1-2': formation('4-1-2-1-2', '4-1-2-1-2 Narrow', [
    GK, ...BACK_4, ANCHOR,
    s('CM', 'Central Midfielder', 69, 53),
    s('CM', 'Central Midfielder', 31, 53),
    CAM, ...ST_PAIR,
  ]),

  // Diamond, wide variant: the shuttlers become true wide mids
  // hugging the touchline.
  '4-1-2-1-2-wide': formation('4-1-2-1-2-wide', '4-1-2-1-2 Wide', [
    GK, ...BACK_4, ANCHOR,
    s('LM', 'Left Midfielder', 89, 52),
    s('RM', 'Right Midfielder', 11, 52),
    CAM, ...ST_PAIR,
  ]),

  // Ultra-attacking, near-obsolete at elite level but a classic:
  // only two CMs behind a four-man front line (wingers + ST pair).
  '4-2-4': formation('4-2-4', '4-2-4', [
    GK, ...BACK_4,
    s('CM', 'Centre Midfielder', 63, 48),
    s('CM', 'Centre Midfielder', 37, 48),
    s('LW', 'Left Winger', 88, 78),
    s('ST', 'Striker', 63, 84),
    s('ST', 'Striker', 37, 84),
    s('RW', 'Right Winger', 12, 78),
  ]),

  // Anchor + attacking midfield trio (wide AMs and a no. 10)
  // behind a strike pair — aggressive, front-loaded.
  '4-1-3-2': formation('4-1-3-2', '4-1-3-2', [
    GK, ...BACK_4, ANCHOR,
    s('LM', 'Left Midfielder', 85, 58),
    s('CAM', 'Central Attacking Midfielder', 50, 60),
    s('RM', 'Right Midfielder', 15, 58),
    ...ST_PAIR,
  ]),

  /* ───────────────────────── BACK THREE ────────────────────── */

  // The Conte staple: CB trio, industrious wing-backs, midfield
  // three, strike partnership.
  '3-5-2': formation('3-5-2', '3-5-2', [GK, ...BACK_3, ...WB_MID_5, ...ST_PAIR]),

  // 3-5-2 variant with a withdrawn forward linking midfield and
  // the lone no. 9.
  '3-5-1-1': formation('3-5-1-1', '3-5-1-1', [
    GK, ...BACK_3, ...WB_MID_5,
    s('CF', 'Centre Forward', 50, 70),
    LONE_ST,
  ]),

  // Back three with a genuine front three — wing-backs and
  // wingers stack the flanks in attack.
  '3-4-3': formation('3-4-3', '3-4-3', [GK, ...BACK_3, ...WB_MID_4, ...FRONT_3]),

  // Tuchel's Chelsea shape: two narrow no. 10s floating behind a
  // lone striker, box midfield with the wing-backs.
  '3-4-2-1': formation('3-4-2-1', '3-4-2-1', [
    GK, ...BACK_3, ...WB_MID_4,
    s('LAM', 'Left Attacking Midfielder', 69, 68),
    s('RAM', 'Right Attacking Midfielder', 31, 68),
    LONE_ST,
  ]),

  // Back three + diamond-ish middle: a classic no. 10 feeding a
  // strike pair.
  '3-4-1-2': formation('3-4-1-2', '3-4-1-2', [GK, ...BACK_3, ...WB_MID_4, CAM, ...ST_PAIR]),

  // Bielsa-style: lone anchor in front of the CB trio, a line of
  // four (wing-backs + two CM8s), strike pair.
  '3-1-4-2': formation('3-1-4-2', '3-1-4-2', [
    GK, ...BACK_3,
    s('CDM', 'Defensive Midfielder', 50, 38),
    s('LWB', 'Left Wing-Back', 92, 55),
    s('CM', 'Centre Midfielder', 66, 56),
    s('CM', 'Centre Midfielder', 34, 56),
    s('RWB', 'Right Wing-Back', 8, 55),
    ...ST_PAIR,
  ]),

  /* ───────────────────────── BACK FIVE ─────────────────────── */

  // Compact counter-attacking classic: five behind the ball, a
  // central three, two outlets up top.
  '5-3-2': formation('5-3-2', '5-3-2', [GK, ...BACK_5, ...MID_3_FLAT, ...ST_PAIR]),

  // The deep block: two banks (5 + 4) and a lone target man.
  '5-4-1': formation('5-4-1', '5-4-1', [GK, ...BACK_5, ...MID_4_FLAT, LONE_ST]),

  // A 3-4-3 that defaults deeper: double CM, genuine front three
  // ready to break.
  '5-2-3': formation('5-2-3', '5-2-3', [
    GK, ...BACK_5,
    s('CM', 'Centre Midfielder', 64, 49),
    s('CM', 'Centre Midfielder', 36, 49),
    ...FRONT_3,
  ]),

  // Two withdrawn forwards supporting the striker — a 5-4-1 that
  // morphs into a front three in transition.
  '5-2-2-1': formation('5-2-2-1', '5-2-2-1', [
    GK, ...BACK_5,
    s('CM', 'Centre Midfielder', 64, 49),
    s('CM', 'Centre Midfielder', 36, 49),
    s('CF', 'Centre Forward', 69, 69),
    s('CF', 'Centre Forward', 31, 69),
    LONE_ST,
  ]),

  // Back five with a no. 10 behind a strike pair — direct,
  // transition-oriented.
  '5-2-1-2': formation('5-2-1-2', '5-2-1-2', [
    GK, ...BACK_5,
    s('CM', 'Centre Midfielder', 64, 49),
    s('CM', 'Centre Midfielder', 36, 49),
    CAM, ...ST_PAIR,
  ]),
};

export const FORMATION_OPTIONS = Object.values(FORMATIONS).map(f => ({
  value: f.id,
  label: f.name,
}));