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
  { value: 'glass', label: 'Glass' },
  { value: 'default', label: 'Default' },
];

/** Classi Tailwind applicate al contenitore della griglia in base allo sfondo scelto */
export const PITCH_BACKGROUND_CLASSES: Record<PitchBackground, string> = {
  grass: 'bg-[url(/grass.jpg)] bg-cover bg-center',
  glass: 'glass',
  default: 'bg-bg-surface',
};