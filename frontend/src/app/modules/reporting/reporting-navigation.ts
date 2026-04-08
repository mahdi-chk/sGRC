export interface ReportingNavItem {
  label: string;
  route: string;
  icon: string;
}

export const REPORTING_NAV_ITEMS: ReportingNavItem[] = [
  { label: 'Vue Detaillee', route: '/dashboard/reporting/dashboard', icon: 'fa-chart-line' },
  { label: 'KPI', route: '/dashboard/reporting/kpis', icon: 'fa-gauge-high' },
  { label: 'Matrice de Risque', route: '/dashboard/reporting/risk-matrix', icon: 'fa-table-cells-large' },
  { label: 'Vision Multi-Entites', route: '/dashboard/reporting/multi-entity', icon: 'fa-building' },
  { label: 'Exports', route: '/dashboard/reporting/exports', icon: 'fa-file-export' },
];
