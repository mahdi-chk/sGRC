export interface SubmoduleDetail {
  title: string;
  description: string;
  objectives: string[];
  features: string[];
  requirements: string[];
  integrations?: string[];
}

export interface ModuleDetail {
  title: string;
  objective: string;
  approach: string[];
  submodules: Record<string, SubmoduleDetail>;
}

export const CPS_MODULES: Record<string, ModuleDetail> = {
  gouvernance: {
    title: 'Gouvernance',
    objective: 'Formaliser, piloter et superviser la gouvernance pour définir clairement les rôles décisionnels, exécutifs et de contrôle.',
    approach: [
      'Structurer l\'organisation en entités, directions, rôles et hiérarchies',
      'Formaliser et diffuser les politiques, chartes, procédures et directives',
      'Mettre en place des circuits de validation, de revue périodique et d\'approbation',
      'Diffuser les documents aux parties prenantes concernées avec traçabilité'
    ],
    submodules: {
      'Gestion Documentaire': {
        title: 'Gestion Documentaire',
        description: 'Cycle de vie complet des documents de gouvernance',
        objectives: ['Centraliser tous les documents', 'Assurer traçabilité complète', 'Faciliter révision périodique'],
        features: [
          'Création et édition collaborative',
          'Versioning automatique avec comparaisons différentielles',
          'Workflows de validation multi-niveaux',
          'Support formats multiples (PDF, Word, Excel)',
          'Intégration signature électronique',
          'Archivage sécurisé',
          'Révision périodique automatisée'
        ],
        requirements: [
          'Stockage chiffré des documents',
          'Permissions granulaires par utilisateur/groupe',
          'Audit trails immuables',
          'Backup automatique'
        ],
        integrations: ['Signature électronique', 'Workflows', 'LDAP/AD']
      },
      'Traçabilité et Historique': {
        title: 'Traçabilité et Historique',
        description: 'Enregistrement et audit des modifications documentaires',
        objectives: ['Assurer imputabilité', 'Historique complet', 'Conformité audit'],
        features: [
          'Versions avec métadonnées (auteur, date, raison)',
          'Comparaisons visuelles entre versions',
          'Audit trails exhaustifs pour toutes modifications',
          'Recherche avancée par métadonnées',
          'Export d\'audit trails'
        ],
        requirements: [
          'Logs immuables (append-only)',
          'Horodatage précis',
          'Stockage sécurisé',
          'Conformité archivage légal'
        ]
      },
      'Workflows d\'Approbation': {
        title: 'Workflows d\'Approbation',
        description: 'Circuits de validation configurables et traçables',
        objectives: ['Formaliser approbations', 'Escalades intelligentes', 'Notifications en temps réel'],
        features: [
          'Définition visuelle des workflows multi-niveaux',
          'Approbations parallèles ou séquentielles',
          'Escalades automatiques en cas de délai',
          'Notifications email/SMS',
          'Commentaires et annotations',
          'Rappels automatiques',
          'Rapports d\'approbation'
        ],
        requirements: [
          'LDAP/Active Directory integration',
          'Gestion des délégations',
          'Historique d\'approbation complet'
        ],
        integrations: ['Email/SMS', 'LDAP/AD', 'Calendriers']
      },
      'Indicateurs de Maturité': {
        title: 'Indicateurs de Maturité',
        description: 'Évaluation du niveau de maturité de la gouvernance',
        objectives: ['Mesurer progrès GRC', 'Benchmark sectoriels', 'Amélioration continue'],
        features: [
          'Framework prédéfinis: COBIT, ISO 38500',
          'Scoring automatisé basé sur critères',
          'Niveaux de maturité (1-5)',
          'Comparaisons benchmarks sectoriels',
          'Visualisations graphiques',
          'Recommandations d\'amélioration IA'
        ],
        requirements: [
          'Data collectée depuis autres modules',
          'Calculs de scoring paramétrables',
          'Historique tendances'
        ]
      },
      'Adhésion et Application': {
        title: 'Adhésion et Application',
        description: 'Preuves d\'adhésion et suivi d\'application des politiques',
        objectives: ['Formaliser acceptation', 'Prouver diffusion', 'Suivre application'],
        features: [
          'E-signatures obligatoires pour acceptation',
          'Quizzes de compréhension et tests',
          'Historique d\'adhésion par personne',
          'Suivi application via intégrations opérationnelles',
          'Rapports couverture et taux d\'adhésion',
          'Rappels aux non-adhérents'
        ],
        requirements: [
          'Signature électronique intégrée',
          'Base utilisateurs actualisée',
          'Rapports d\'adhésion exportables'
        ]
      }
    }
  },
  risques: {
    title: 'Gestion des Risques',
    objective: 'Identifier, évaluer et maîtriser proactivement les risques impactant les objectifs',
    approach: [
      'Identifier les risques par processus, activité ou entité',
      'Évaluer selon critères qualitatifs et quantitatifs',
      'Hiérarchiser risques critiques via matrices',
      'Définir, implémenter et suivre plans de traitement'
    ],
    submodules: {
      'Registre des Risques': {
        title: 'Registre des Risques',
        description: 'Base de données centralisée des risques identifiés',
        objectives: ['Inventorier tous risques', 'Catégorisation', 'Liens croisés'],
        features: [
          'Création et documentation des risques',
          'Catégories: opérationnel, financier, cyber, légal, etc.',
          'Liens vers processus, actifs, entités',
          'Propriétaires et responsables assignés',
          'Historique modifications',
          'Recherche et filtrage avancés'
        ],
        requirements: [
          'Stockage hiérarchisé',
          'Performance recherche',
          'Intégration avec autres modules'
        ]
      },
      'Évaluation Paramétrable': {
        title: 'Évaluation Paramétrable',
        description: 'Méthodes d\'évaluation qualitatives et quantitatives',
        objectives: ['Score risques', 'Prédictions IA', 'Analyse monte-carlo'],
        features: [
          'Scales personnalisables (probabilité/impact)',
          'Matrices risque configurables',
          'Analyses Monte Carlo pour quantitatif',
          'Intégration IA pour prédictions',
          'Scoring automatisé',
          'Simulations de scénarios'
        ],
        requirements: [
          'Algorithmes prédictifs IA',
          'Performance calcul',
          'Paramétrage per-organisation'
        ]
      },
      'Cartographie Dynamique': {
        title: 'Cartographie Dynamique',
        description: 'Visualisations interactives des risques',
        objectives: ['Visualiser paysage risques', 'Heat maps', 'Drill-down détails'],
        features: [
          'Heat maps interactives',
          'Graphes de relations risque-actif-processus',
          'Distinction risque brut vs résiduel',
          'Filtrage dynamique',
          'Simulations "what-if"',
          'Exports graphiques (PNG, PDF)',
          'Vues par entité, processus, catégorie'
        ],
        requirements: [
          'Moteur visualisation performant',
          'Real-time updates',
          'Support mobile'
        ]
      },
      'Plans de Traitement': {
        title: 'Plans de Traitement',
        description: 'Actions de mitigation, transfert, acceptation des risques',
        objectives: ['Planifier réponses', 'Tracker exécution', 'Mesurer efficacité'],
        features: [
          'Création d\'actions associées',
          'Assignation responsables/ressources',
          'Liens avec Plans d\'Actions',
          'Suivi dates et jalons',
          'Métriques d\'efficacité',
          'Rapports progress',
          'Notifications retards'
        ],
        requirements: [
          'Intégration Plans d\'Actions',
          'Gantt charts',
          'Alertes automatiques'
        ]
      },
      'Alertes et Monitoring': {
        title: 'Alertes et Monitoring',
        description: 'Surveillance en temps réel et alertes proactives',
        objectives: ['Détection précoce', 'Prévention escalade', 'Supervision continue'],
        features: [
          'Seuils configurables par risque',
          'Alertes temps réel (email, SMS, in-app)',
          'Intégration flux RSS menaces',
          'APIs threat intelligence',
          'Dashboards monitoring',
          'Historique incidents liés',
          'Auto-escalade sévérité'
        ],
        requirements: [
          'Intégration APIs externes',
          'Traitement streaming temps réel',
          'Notifications fiables'
        ]
      }
    }
  },
  controls: {
    title: 'Contrôles Internes',
    objective: 'Démontrer existence, application et efficacité des contrôles via automatisation',
    approach: [
      'Définir contrôles liés risques et processus',
      'Planifier et exécuter périodiquement',
      'Vérifier efficacité via tests',
      'Documenter résultats et corriger défaillances'
    ],
    submodules: {
      'Référentiel des Contrôles': {
        title: 'Référentiel des Contrôles',
        description: 'Catalogue structuré et traçable des contrôles',
        objectives: ['Inventorier contrôles', 'Lier risques', 'Certifications'],
        features: [
          'Création et documentation contrôles',
          'Classifications: préventif, détectif, correctif',
          'Liens bidirectionnels risques ↔ contrôles',
          'Liens exigences réglementaires',
          'Fréquences d\'exécution',
          'Propriétaires et responsables',
          'Historique efficacité'
        ],
        requirements: [
          'Support multi-référentiels',
          'Imports/exports',
          'Versioning'
        ]
      },
      'Planification Automatisée': {
        title: 'Planification Automatisée',
        description: 'Calendriers de contrôle et assignations intelligentes',
        objectives: ['Planifier exécutions', 'Tracker compliance', 'Rappels'],
        features: [
          'Calendriers récurrents basés fréquences',
          'Assignation automatique responsables',
          'Notifications anticipées',
          'Escalades si non-exécution',
          'Intégration calendriers (Outlook/Google)',
          'Vues Gantt',
          'Rapports planification'
        ],
        requirements: [
          'Intégration calendaires externes',
          'Notifications fiables',
          'Gestion délégations'
        ]
      },
      'Collecte de Preuves': {
        title: 'Collecte de Preuves',
        description: 'Mécanismes sécurisés de collecte et stockage de preuves',
        objectives: ['Qualifier exécution', 'Auditable', 'Accessible'],
        features: [
          'Upload documents (Word, Excel, PDF, images)',
          'Capture screenshots horodatés',
          'Intégration logs SIEM',
          'Liens avec tickets incidents',
          'Métadonnées (date, auteur, descriptif)',
          'Chiffrement stockage',
          'Versioning preuves'
        ],
        requirements: [
          'Sécurité disque/chiffrement',
          'Backup automatique',
          'Intégration SIEM/logs'
        ]
      },
      'Évaluation d\'Efficacité': {
        title: 'Évaluation d\'Efficacité',
        description: 'Tests et scoring d\'efficacité des contrôles',
        objectives: ['Vérifier fonctionnement', 'Détecter failles', 'Scoring'],
        features: [
          'Tests manuels et automatisés (scripts)',
          'Questionnaires évaluation',
          'Scoring efficacité (0-100%)',
          'Détection non-conformités',
          'Workflows remédiation intégrés',
          'Rapports efficacité détaillés',
          'Tendances historiques'
        ],
        requirements: [
          'Moteur scripts test',
          'Paramétrages scoring',
          'Intégration workflows'
        ]
      },
      'Suivi des Non-Conformités': {
        title: 'Suivi des Non-Conformités',
        description: 'Gestion des défaillances et écarts détectés',
        objectives: ['Tracker déviations', 'Root cause', 'Rapports tendances'],
        features: [
          'Enregistrement non-conformités',
          'Root cause analysis templates',
          'Plans de correction associés',
          'Assignation responsables',
          'Suivi clôture',
          'Rapports récurrences',
          'Alertes escalade'
        ],
        requirements: [
          'Workflow remédiation',
          'Analytics tendances',
          'Notifications fiables'
        ]
      }
    }
  },
  conformite: {
    title: 'Conformité',
    objective: 'Démontrer conformité aux lois, règlements et normes via exigences mesurables',
    approach: [
      'Identifier et mapper exigences applicables',
      'Évaluer niveau conformité via auto-assessments',
      'Identifier et prioriser écarts',
      'Mettre en œuvre actions correctives avec suivi'
    ],
    submodules: {
      'Référentiels Intégrés': {
        title: 'Référentiels Intégrés',
        description: 'Bibliothèques de normes et réglementations',
        objectives: ['Centraliser exigences', 'Mises à jour auto', 'Pertinence secteur'],
        features: [
          'Référentiels pré-chargés (RGPD, ISO 27001, ISO 9001, etc)',
          'Mises à jour automatiques des normes',
          'Personnalisation par secteur/pays',
          'Versions multiples normes',
          'Mappings entre normes',
          'Recherche par mots-clés',
          'Exports réglementaires'
        ],
        requirements: [
          'Sources mises à jour automatiques',
          'Gestion versions normes',
          'Support multi-langues'
        ]
      },
      'Mapping et Liens': {
        title: 'Mapping et Liens',
        description: 'Corrélations exigences ↔ contrôles ↔ risques',
        objectives: ['Lier exigences', 'Visualiser couverture', 'Identifier gaps'],
        features: [
          'Mapping visuel exigences ↔ contrôles',
          'Liens bidirectionnels risques',
          'Matrices couverture',
          'Identification exigences sans couverture',
          'Impact analysis (if exigence change)',
          'Exports mappings',
          'Graphes relations'
        ],
        requirements: [
          'Moteur visualisation',
          'Performance requêtes',
          'Intégration multi-modules'
        ]
      },
      'Auto-Évaluations': {
        title: 'Auto-Évaluations',
        description: 'Questionnaires et scoring de conformité',
        objectives: ['Évaluer compliance', 'Collecter preuves', 'Rapports'],
        features: [
          'Questionnaires dynamiques par norme',
          'Scoring automatisé (% conformité)',
          'Sondages parties prenantes',
          'Historique évaluations',
          'Identification écarts prioritaires',
          'Export rapports conformité',
          'Comparaisons périodes'
        ],
        requirements: [
          'Moteur questionnaires flexibles',
          'Scoring configurable',
          'Analytics consolidation'
        ]
      },
      'Suivi des Écarts': {
        title: 'Suivi des Écarts',
        description: 'Plans de remédiation et tracking conformité',
        objectives: ['Planifier corrections', 'Tracker progrès', 'Fermer écarts'],
        features: [
          'Identification écarts automatiques',
          'Plans remédiation liés',
          'Deadlines et jalons',
          'Assignations responsables',
          'Suivi progrès pourcentage',
          'Alertes retards',
          'Rapports fermeture écarts',
          'Root cause par écart'
        ],
        requirements: [
          'Intégration Plans d\'Actions',
          'Notifications automatiques',
          'Analytics tendances'
        ]
      },
      'Mises à Jour et Preuves': {
        title: 'Mises à Jour et Preuves',
        description: 'Alertes réglementaires et preuves auditables',
        objectives: ['Rester informé', 'Prouver conformité', 'Auditable'],
        features: [
          'Alertes changements réglementaires',
          'Impact analysis changements',
          'Collecte preuves conformité',
          'Génération rapports certifiés PDF',
          'Horodatage preuves',
          'Signatures électroniques rapports',
          'Archives immuables preuves'
        ],
        requirements: [
          'Sources légales mises à jour',
          'Notification moteur fiable',
          'Signature électronique'
        ]
      }
    }
  },
  audit: {
    title: 'Audit',
    objective: 'Vérifier objectivement efficacité du dispositif GRC via audits industrialisés',
    approach: [
      'Planifier audits sur plusieurs années',
      'Réaliser missions avec collecte preuves',
      'Documenter constats et recommandations',
      'Suivre implémentation corrections'
    ],
    submodules: {
      'Planification Pluriannuelle': {
        title: 'Planification Pluriannuelle',
        description: 'Calendriers d\'audits prioritaires et traçables',
        objectives: ['Planifier audits', 'Prioriser par risques', 'Coverage complet'],
        features: [
          'Calendriers interactifs pluriannuels',
          'Priorisation basée risques/processus',
          'Équilibrage audit interne/externe',
          'Intégration Outlook/Google Calendar',
          'Allocation ressources auditeurs',
          'Rapports planification',
          'Historique audits passés'
        ],
        requirements: [
          'Moteur priorisation IA',
          'Intégration calendaires',
          'Gestion ressources'
        ]
      },
      'Gestion des Missions': {
        title: 'Gestion des Missions',
        description: 'Execution et collaboration sur audits',
        objectives: ['Organiser missions', 'Collaborer temps réel', 'Documenter'],
        features: [
          'Templates audit personnalisables',
          'Plans de visite détaillés',
          'Collaboration en temps réel (commentaires, @mentions)',
          'Assignments tâches auditeurs',
          'Historique discussions',
          'Partages documents',
          'Notifications d\'activité'
        ],
        requirements: [
          'Collab temps réel infrastructure',
          'Gestion notifications',
          'Permission granulaires'
        ]
      },
      'Check-Lists Paramétrables': {
        title: 'Check-Lists Paramétrables',
        description: 'Listes de vérification dynamiques et scoring',
        objectives: ['Structurer travail', 'Consistency', 'Scoring auto'],
        features: [
          'Templates par référentiels (ISO, COBIT)',
          'Listes dynamiques liées exigences',
          'Scoring question par question',
          'Evidence links',
          'Commentaires détaillés',
          'Photos/documents attachés',
          'Calcul scoring global'
        ],
        requirements: [
          'Paramétrage flexible',
          'Performance mobile',
          'Offline mode'
        ]
      },
      'Traçabilité des Preuves': {
        title: 'Traçabilité des Preuves',
        description: 'Stockage sécurisé et linked des evidences',
        objectives: ['Collecter preuves', 'Sécuriser', 'Lier audit'],
        features: [
          'Stockage chiffré documents/images',
          'Liens avec check-lists',
          'Cross-références autres modules',
          'Métadonnées complètes (source, date, auteur)',
          'Intégrité (hashing)',
          'Rétention longue durée',
          'Exports sécurisés'
        ],
        requirements: [
          'Chiffrement stockage AES-256',
          'Intégrité hashing',
          'Backup géographiquement distribué'
        ]
      },
      'Rapports et Suivi': {
        title: 'Rapports et Suivi',
        description: 'Génération rapports et suivi recommandations',
        objectives: ['Rapporter', 'Recommander', 'Tracker corrections'],
        features: [
          'Génération automatique rapports (Word/PDF)',
          'Templates professionnels configurables',
          'Constats structurés avec niveaux sévérité',
          'Recommandations classées par priorité',
          'Plans action liés',
          'Suivi clôture recommandations',
          'Rappels périodiques'
        ],
        requirements: [
          'Moteur rapports riche',
          'Signature électronique rapports',
          'Historique versions'
        ]
      }
    }
  },
  incidents: {
    title: 'Gestion des Incidents',
    objective: 'Centraliser, analyser et capitaliser sur incidents pour amélioration',
    approach: [
      'Déclarer incidents via formulaires simples',
      'Analyser impacts et causes racines',
      'Traiter, escalader et clôturer',
      'Tirer enseignements pour prévention'
    ],
    submodules: {
      'Enregistrement Structuré': {
        title: 'Enregistrement Structuré',
        description: 'Formulaires de déclaration d\'incidents',
        objectives: ['Capturer incidents', 'Catégoriser', 'Déclaration facile'],
        features: [
          'Formulaires configurables',
          'Catégories (sécurité, opérationnel, conformité)',
          'Champs obligatoires/optionnels',
          'Mobiles-friendly',
          'Intégration hotlines déclaration',
          'Historique modifications',
          'Recherche avancée'
        ],
        requirements: [
          'Design UX simple',
          'Performance mobile',
          'Analytics déclarations'
        ]
      },
      'Workflow de Traitement': {
        title: 'Workflow de Traitement',
        description: 'Escalades et assignations intelligentes',
        objectives: ['Assigner incident', 'Escalader automatiquement', 'Notifier'],
        features: [
          'Escalades basées sévérité/catégorie',
          'Assignation équipes spécialisées',
          'Champs progression status',
          'Notifications en temps réel',
          'Rappels non-clôturés',
          'SLA tracking',
          'Historique actions'
        ],
        requirements: [
          'Règles escalade configurable',
          'Notification moteur fiable',
          'Intégration LDAP'
        ]
      },
      'Liens et Analyse': {
        title: 'Liens et Analyse',
        description: 'Corrélations et root cause analysis',
        objectives: ['Lier risques', 'Analyser causes', 'Détecter patterns'],
        features: [
          'Corrélation automatique incident ↔ risque ↔ contrôle',
          'Root cause analysis (5 whys, fishbone)',
          'Tendances (graphes incidences par catégorie)',
          'IA détection patterns',
          'Alertes incidents similaires',
          'Rapports analyses',
          'Recommandations actions'
        ],
        requirements: [
          'IA machine learning patterns',
          'Analytics engines',
          'Data warehouse intégration'
        ]
      },
      'Reporting Consolidé': {
        title: 'Reporting Consolidé',
        description: 'Dashboards et rapports incidents',
        objectives: ['Consolider données', 'KPI', 'Rapports direction'],
        features: [
          'Dashboards interactifs (fréquences, tendances)',
          'KPI incidents (MTTR, taux résolution)',
          'Heat maps sévérité/catégorie',
          'Rapports export (PDF, Excel)',
          'Drill-down détails',
          'Prévisions (IA)',
          'Comparaisons périodes'
        ],
        requirements: [
          'BI platform (Power BI like)',
          'Real-time data refresh',
          'Mobile dashboards'
        ]
      }
    }
  },
  'plans-actions': {
    title: 'Plans d\'Actions',
    objective: 'Garantir exécution actions correctives/préventives pour amélioration continue',
    approach: [
      'Formaliser actions avec objectifs clairs',
      'Affecter responsables et ressources',
      'Suivre avancement et délais',
      'Vérifier efficacité post-implémentation'
    ],
    submodules: {
      'Gestion Centralisée': {
        title: 'Gestion Centralisée',
        description: 'Référentiel unique des actions',
        objectives: ['Centraliser', 'Traçabilité', 'Linker sources'],
        features: [
          'Base unique (issues audits, risques, incidents)',
          'Origine traçable',
          'Attributs: description, priorité, budget',
          'Assignations multiples',
          'Dépendances actions',
          'Statuts configurables',
          'Historique complet'
        ],
        requirements: [
          'Stockage hiérarchisé',
          'Intégration multi-modules',
          'Performance requêtes'
        ]
      },
      'Suivi des Échéances': {
        title: 'Suivi des Échéances',
        description: 'Gantt charts et gestion jalons',
        objectives: ['Planifier', 'Visualiser', 'Tracker délais'],
        features: [
          'Gantt charts interactifs',
          'Jalons et milestones',
          'Dépendances tâches',
          'Allocation ressources',
          'Prévisions réalisation',
          'Identification retards',
          'Exports planning'
        ],
        requirements: [
          'Moteur Gantt performant',
          'Real-time updates',
          'Mobile support'
        ]
      },
      'Notifications': {
        title: 'Notifications',
        description: 'Alertes personnalisables et rappels',
        objectives: ['Alerter retards', 'Rappels proactifs', 'Engagement'],
        features: [
          'Notifications email/SMS',
          'In-app alerts',
          'Escalades automatiques',
          'Rappels deadlines',
          'Personnalisation par rôle',
          'Résumés périodiques',
          'Absence auto-assignment'
        ],
        requirements: [
          'Notification engine fiable',
          'SMTP/SMS gateway',
          'Règles configurable'
        ]
      },
      'Indicateurs': {
        title: 'Indicateurs',
        description: 'KPI et métriques de suivi',
        objectives: ['Mesurer progrès', 'Taux achèvement', 'Efficacité'],
        features: [
          'KPI taux achèvement actions',
          'Efficacité actions (mesure correction)',
          'Historique trends',
          'Benchmarks',
          'Dashboards KPI',
          'Rapports exécutifs',
          'Prévisionnels réalisation'
        ],
        requirements: [
          'Data warehouse',
          'Analytics engine',
          'BI visualizations'
        ]
      }
    }
  },
  reporting: {
    title: 'Reporting & Dashboards',
    objective: 'Fournir Direction vision synthétique et actionnable de GRC',
    approach: [
      'Définir et monitorer indicateurs clés',
      'Consolider données tous modules',
      'Piloter par risques et conformité'
    ],
    submodules: {
      'Tableaux de Bord': {
        title: 'Tableaux de Bord',
        description: 'Interfaces dynamiques et personnalisées',
        objectives: ['Synthèse GRC', 'Décisionnel', 'Actionnable'],
        features: [
          'Dashboards interactifs par rôle',
          'Widgets configurables',
          'Responsive/mobile-friendly',
          'Drill-down détails',
          'Filtres dynamiques',
          'Thèmes personnalisables',
          'Snapshots historiques'
        ],
        requirements: [
          'Technologie dashboard riche',
          'Performance real-time',
          'Mobile support'
        ]
      },
      'KPI Personnalisables': {
        title: 'KPI Personnalisables',
        description: 'Création métriques sur-mesure',
        objectives: ['Définir KPI', 'Intégrer BI', 'Benchmarks'],
        features: [
          'Création KPI custom (drag-drop formules)',
          'Sources données multi-modules',
          'Intégration Power BI/Tableau',
          'Calculs agrégés (SUM, AVG, etc)',
          'Seuils et alertes KPI',
          'Historique tendances',
          'Comparaisons benchmarks'
        ],
        requirements: [
          'BI platform intégration',
          'Formula builder',
          'Data warehouse'
        ]
      },
      'Vision Multi-Entités': {
        title: 'Vision Multi-Entités',
        description: 'Agrégation par filiales et drill-down',
        objectives: ['Consolider groupe', 'Filiales', 'Détails'],
        features: [
          'Hiérarchies entités configurables',
          'Agrégation automatique',
          'Drill-down par niveau',
          'Comparaisons entités',
          'Identifications outliers',
          'Rapports consolidation',
          'Allocations coûts'
        ],
        requirements: [
          'Hiérarchies master-data',
          'Performance requêtes imbriquées',
          'Intégration ERP'
        ]
      },
      'Exports': {
        title: 'Exports',
        description: 'Exports multiformats et scheduling',
        objectives: ['Exporter rapports', 'Formats variés', 'Automatisation'],
        features: [
          'Exports PDF/Excel/Word',
          'Scheduling rapports périodiques',
          'Distribution email automatique',
          'Signatures rapports numériques',
          'Encryption emails',
          'Audit exports',
          'Formats multiples modèles'
        ],
        requirements: [
          'Moteur rapports riche',
          'Scheduler background tasks',
          'Email distribution'
        ]
      }
    }
  },
  supervision: {
    title: 'Supervision sGRC',
    objective: 'Accompagnement méthodologique continu pour maintenance et amélioration GRC',
    approach: [
      'S\'appuyer bonnes pratiques et benchmarks',
      'Recevoir alertes évolutions',
      'Évaluer et booster maturité GRC'
    ],
    submodules: {
      'Bibliothèque de Bonnes Pratiques': {
        title: 'Bibliothèque de Bonnes Pratiques',
        description: 'Contenu intégré et mises à jour',
        objectives: ['Centraliser BP', 'Mises à jour auto', 'Recommandations'],
        features: [
          'Contenu pré-chargé (ISO, NIST, COBIT)',
          'Mises à jour automatiques',
          'Searchable knowledge base',
          'Cas d\'usage pratiques',
          'Templates téléchargeables',
          'Liens vers ressources externes',
          'Ratings/votes pertinence'
        ],
        requirements: [
          'CMS intégré',
          'Versioning contenu',
          'Multi-langues'
        ]
      },
      'Recommandations Contextualisées': {
        title: 'Recommandations Contextualisées',
        description: 'Suggestions IA basées données org',
        objectives: ['Suggestions IA', 'Contextualisées', 'Prioritaires'],
        features: [
          'IA analyse données GRC',
          'Recommandations smart (risk-based)',
          'Priorisation automatique',
          'Liens bonnes pratiques',
          'Impact potentiel estimé',
          'Roadmap recommandations',
          'Feedback efficacité'
        ],
        requirements: [
          'ML model training',
          'Real-time scoring',
          'Explainability IA'
        ]
      },
      'Benchmarks Sectoriels': {
        title: 'Benchmarks Sectoriels',
        description: 'Comparaisons anonymes avec pairs',
        objectives: ['Comparer', 'Benchmarks', 'Identifier gaps'],
        features: [
          'Comparaisons anonymes peers',
          'Métriques sectorielles',
          'Maturité relative',
          'Best-in-class insights',
          'Rapports benchmarks',
          'Prédictions trends',
          'Recomandations basées benchmarks'
        ],
        requirements: [
          'Agrégation données anonymes',
          'Analytics benchmarks',
          'Sécurité données participants'
        ]
      },
      'Assistance Experte': {
        title: 'Assistance Experte',
        description: 'Support et consultants virtuels',
        objectives: ['Support', 'Expertise', 'Conseils'],
        features: [
          'Chatbots IA (NLP)',
          'Ticketing support',
          'Knowledge base searchable',
          'Consultants virtuels intégrés',
          'Webinaires périodiques',
          'Escalade experts humains',
          'SLA support'
        ],
        requirements: [
          'Chatbot NLP',
          'Ticketing system',
          'Video conferencing intégré'
        ]
      },
      'Supervision Continue': {
        title: 'Supervision Continue',
        description: 'Monitoring santé GRC et audits virtuels',
        objectives: ['Monitorer santé', 'Audits auto', 'Alertes'],
        features: [
          'Health score GRC global',
          'Audits virtuels périodiques',
          'Alertes dégradation',
          'Diagnostics automatiques',
          'Rapports santé',
          'Prédictions risques futurs',
          'Plans amélioration continus'
        ],
        requirements: [
          'Analytics moteur',
          'Anomaly detection',
          'Predictive modeling'
        ]
      }
    }
  }
};
