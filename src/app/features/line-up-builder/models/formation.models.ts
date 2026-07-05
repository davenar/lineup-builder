export interface FormationSlot {
  cellIndex: number;   // ora è un id univoco dello slot (1–11), non più una cella
  label: string;
  fullLabel: string;
  x: number;           // % da sinistra (0–100)
  y: number;           // % dall'alto (0–100), GK in alto
}

export interface Formation {
  id: string;
  name: string;
  slots: FormationSlot[];
}