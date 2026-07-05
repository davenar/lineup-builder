import { BenchCardStyle, PitchBackground, PitchCardStyle } from "../types/line-up-builder-settings.types";

export const DEFAULT_PITCH_CARD_STYLE: PitchCardStyle = 'sticker';
export const DEFAULT_BENCH_CARD_STYLE: BenchCardStyle = 'sticker';
export const DEFAULT_PITCH_BACKGROUND: PitchBackground = 'default';

export const PITCH_CARD_STYLE_OPTIONS: { value: PitchCardStyle; label: string }[] = [
  { value: 'sticker', label: 'Sticker' },
  { value: 'crazy-time', label: 'Crazy Time' },
];

export const BENCH_CARD_STYLE_OPTIONS: { value: BenchCardStyle; label: string }[] = [
  { value: 'sticker', label: 'Sticker' },
  { value: 'crazy-time', label: 'Crazy Time' },
];

export const PITCH_BACKGROUND_OPTIONS: { value: PitchBackground; label: string }[] = [
  { value: 'grass', label: 'Erba' },
  { value: 'grass-night', label: 'Erba Notturna' },
  { value: 'glass', label: 'Glass' },
  { value: 'default', label: 'Default' },
];

/** Classi Tailwind applicate al contenitore del campetto in base allo sfondo scelto */
export const PITCH_BACKGROUND_CLASSES: Record<PitchBackground, string> = {
  // Erba diurna: linee bianco pieno, come su un campo vero
  grass:
    '[--pitch-line:rgba(255,255,255,0.75)] bg-[radial-gradient(ellipse_at_50%_40%,transparent_55%,rgba(0,0,0,0.28)_100%),repeating-linear-gradient(to_bottom,#2f7d32_0,#2f7d32_calc(100%/12),#3d9142_calc(100%/12),#3d9142_calc(100%/6))]',

  // Erba notturna: bianco leggermente attenuato, da illuminazione artificiale
  'grass-night':
    '[--pitch-line:rgba(255,255,255,0.55)] bg-[radial-gradient(ellipse_at_50%_40%,transparent_50%,rgba(0,0,0,0.4)_100%),repeating-linear-gradient(to_bottom,#14532d_0,#14532d_calc(100%/12),#1a6b38_calc(100%/12),#1a6b38_calc(100%/6))]',

  // Glass: linee lavanda chiaro (lup-pale), coerenti con l'estetica glass
  glass:
    '[--pitch-line:rgba(186,200,255,0.4)] glass bg-[repeating-linear-gradient(to_bottom,rgba(116,143,252,0.05)_0,rgba(116,143,252,0.05)_calc(100%/12),transparent_calc(100%/12),transparent_calc(100%/6))]',

  // Default: linee lup-soft soft, tono-su-tono col tema
  default:
    '[--pitch-line:rgba(116,143,252,0.35)] bg-bg-surface bg-[repeating-linear-gradient(to_bottom,rgba(116,143,252,0.05)_0,rgba(116,143,252,0.05)_calc(100%/12),transparent_calc(100%/12),transparent_calc(100%/6))]',
};