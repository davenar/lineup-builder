export interface FormationSlot {
  /** Indice della cella nella griglia 6x5 del campetto (1-30) */
  cellIndex: number;
  /** Etichetta breve mostrata sulla card, es. 'TD', 'CC', 'ATT' */
  label: string;
  /** Etichetta estesa, es. 'Terzino destro', 'Centrocampista centrale' */
  fullLabel: string;
}

export interface Formation {
  id: string;
  name: string;
  slots: FormationSlot[];
}