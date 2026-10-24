import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

/**
 * Codici di posizione (sigle inglesi EA FC + quelli usati dai moduli)
 * che hanno una traduzione in positions.short.* e positions.long.*.
 */
export const KNOWN_POSITION_CODES: ReadonlySet<string> = new Set([
  'GK', 'RB', 'CB', 'LB', 'RWB', 'LWB',
  'CDM', 'CM', 'CAM', 'RM', 'LM', 'RAM', 'LAM',
  'RW', 'LW', 'RF', 'LF', 'CF', 'SS', 'ST',
]);

export type PositionLabelFormat = 'short' | 'long';

/**
 * Traduce una sigla di posizione (es. "LB") nella sigla localizzata
 * ("TS") o nel nome esteso ("Terzino sinistro").
 *
 * Accetta anche elenchi tipo "ST, LW": traduce ogni sigla nota e lascia
 * invariato tutto il resto. Le sigle sconosciute restano il valore
 * originale dell'API (o il `fallback` passato, se presente).
 *
 * Impura come la pipe `transloco`: si aggiorna al cambio lingua.
 */
@Pipe({
  name: 'positionLabel',
  standalone: true,
  pure: false,
})
export class PositionLabelPipe implements PipeTransform {
  private readonly transloco = inject(TranslocoService);

  transform(
    value: string | null | undefined,
    format: PositionLabelFormat = 'short',
    fallback?: string,
  ): string {
    if (!value) {
      return fallback ?? '';
    }

    const code = value.trim().toUpperCase();

    if (KNOWN_POSITION_CODES.has(code)) {
      return this.transloco.translate(`positions.${format}.${code}`);
    }

    if (fallback !== undefined) {
      return fallback;
    }

    return value.replace(/[A-Za-z]+/g, token => {
      const upper = token.toUpperCase();
      return KNOWN_POSITION_CODES.has(upper)
        ? this.transloco.translate(`positions.${format}.${upper}`)
        : token;
    });
  }
}
