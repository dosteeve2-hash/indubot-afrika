export type ProductionPoint = {
  jour: string;
  valeur: number;
};

export type EnergiePoint = {
  jour: string;
  kwh: number;
};

export type MachineUtilisation = {
  label: string;
  value: number;
  maxValue: number;
  color: string;
};

export type AlerteSeverite = "critique" | "avertissement" | "info";

export type Alerte = {
  id: string;
  machine: string;
  message: string;
  severite: AlerteSeverite;
  horodatage: string;
};

export type Kpi = {
  label: string;
  valeur: string;
  variation: number;
  unite?: string;
};

export const productionData: ProductionPoint[] = [
  { jour: "Lun", valeur: 840 },
  { jour: "Mar", valeur: 920 },
  { jour: "Mer", valeur: 780 },
  { jour: "Jeu", valeur: 1050 },
  { jour: "Ven", valeur: 970 },
  { jour: "Sam", valeur: 620 },
  { jour: "Dim", valeur: 400 },
];

export const energieData: EnergiePoint[] = [
  { jour: "Lun", kwh: 3200 },
  { jour: "Mar", kwh: 3450 },
  { jour: "Mer", kwh: 2980 },
  { jour: "Jeu", kwh: 3890 },
  { jour: "Ven", kwh: 3610 },
  { jour: "Sam", kwh: 2340 },
  { jour: "Dim", kwh: 1580 },
];

export const machinesUtilisation: MachineUtilisation[] = [
  { label: "Ligne A", value: 92, maxValue: 100, color: "var(--gold)" },
  { label: "Ligne B", value: 76, maxValue: 100, color: "var(--cyan)" },
  { label: "Ligne C", value: 58, maxValue: 100, color: "var(--chart-3)" },
  { label: "Ligne D", value: 34, maxValue: 100, color: "var(--text-3)" },
];

export const kpis: Kpi[] = [
  { label: "Production journalière", valeur: "970", unite: "unités", variation: 8.2 },
  { label: "Taux d'uptime", valeur: "94.6", unite: "%", variation: 1.4 },
  { label: "Alertes actives", valeur: "3", variation: -2 },
  { label: "Rendement global", valeur: "87.1", unite: "%", variation: 3.6 },
];

export const alertes: Alerte[] = [
  {
    id: "AL-1042",
    machine: "Ligne A — Presse hydraulique",
    message: "Température moteur au-dessus du seuil (82°C)",
    severite: "critique",
    horodatage: "il y a 12 min",
  },
  {
    id: "AL-1041",
    machine: "Ligne C — Convoyeur 3",
    message: "Vibration anormale détectée",
    severite: "avertissement",
    horodatage: "il y a 47 min",
  },
  {
    id: "AL-1039",
    machine: "Ligne B — Robot de soudure",
    message: "Maintenance préventive recommandée sous 5 jours",
    severite: "info",
    horodatage: "il y a 2 h",
  },
  {
    id: "AL-1035",
    machine: "Ligne D — Compresseur",
    message: "Pression basse, vérifier le circuit pneumatique",
    severite: "avertissement",
    horodatage: "il y a 5 h",
  },
];
