export interface GovernanceNavItem {
  label: string;
  route: string;
}

export const GOVERNANCE_NAV_ITEMS: GovernanceNavItem[] = [
  { label: 'Gestion Documentaire', route: '/dashboard/governance-documents' },
  { label: 'Tracabilite et Historique', route: '/dashboard/governance-history' },
  { label: 'Workflows d Approbation', route: '/dashboard/governance-workflows' },
  { label: 'Indicateurs de Maturite', route: '/dashboard/governance-maturity' },
  { label: 'Adhesion et Application', route: '/dashboard/governance-adoption' }
];
