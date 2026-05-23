'use strict';

const quote = (identifier) => `[${identifier}]`;

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${tableName.replace(/'/g, "''")}'
    `);

    return rows.length > 0;
};

const indexExists = async (queryInterface, indexName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.indexes
        WHERE name = N'${indexName.replace(/'/g, "''")}'
    `);

    return rows.length > 0;
};

const timestampColumns = (Sequelize) => ({
    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const softDeleteColumns = (Sequelize) => ({
    is_deleted: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
});

const lookupTableDefinition = (Sequelize) => ({
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    code: { allowNull: false, unique: true, type: Sequelize.STRING(255) },
    label: { allowNull: false, type: Sequelize.STRING(255) },
    description: { allowNull: true, type: Sequelize.TEXT },
    is_active: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
    sort_order: { allowNull: true, type: Sequelize.INTEGER },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
});

const createLookup = async (queryInterface, Sequelize, tableName, values) => {
    if (!(await tableExists(queryInterface, tableName))) {
        await queryInterface.createTable(tableName, lookupTableDefinition(Sequelize));
    }

    const indexName = `ux_${tableName}_code`;
    if (!(await indexExists(queryInterface, indexName))) {
        await queryInterface.addIndex(tableName, ['code'], {
            name: indexName,
            unique: true,
        });
    }

    for (const value of values) {
        const description = value.description ? `N'${value.description.replace(/'/g, "''")}'` : 'NULL';
        const code = `N'${value.code.replace(/'/g, "''")}'`;
        const label = `N'${value.label.replace(/'/g, "''")}'`;
        const sortOrder = value.sortOrder || value.id;
        await queryInterface.sequelize.query(`
            IF EXISTS (SELECT 1 FROM ${quote(tableName)} WHERE id = ${value.id} OR code = ${code})
            BEGIN
                UPDATE ${quote(tableName)}
                SET code = ${code},
                    label = ${label},
                    description = ${description},
                    is_active = 1,
                    sort_order = ${sortOrder},
                    updated_at = GETDATE()
                WHERE id = ${value.id} OR code = ${code};
            END
            ELSE
            BEGIN
                SET IDENTITY_INSERT ${quote(tableName)} ON;
                INSERT INTO ${quote(tableName)} (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (${value.id}, ${code}, ${label}, ${description}, 1, ${sortOrder}, GETDATE(), GETDATE());
                SET IDENTITY_INSERT ${quote(tableName)} OFF;
            END
        `);
    }
};

const createTableIfMissing = async (queryInterface, tableName, definition) => {
    if (await tableExists(queryInterface, tableName)) {
        return;
    }

    await queryInterface.createTable(tableName, definition);
};

const addIndex = async (queryInterface, tableName, fields, name) => {
    if (await indexExists(queryInterface, name)) {
        return;
    }

    await queryInterface.addIndex(tableName, fields, { name });
};

module.exports = {
    async up(queryInterface, Sequelize) {
        await createLookup(queryInterface, Sequelize, 'control_evaluation_campaign_statuses', [
            { id: 1, code: 'draft', label: 'Brouillon' },
            { id: 2, code: 'in_progress', label: 'En cours' },
            { id: 3, code: 'submitted', label: 'Soumise' },
            { id: 4, code: 'validated', label: 'Validee' },
            { id: 5, code: 'closed', label: 'Cloturee' },
            { id: 6, code: 'cancelled', label: 'Annulee' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_evaluation_objective_types', [
            { id: 1, code: 'operations', label: 'Operations' },
            { id: 2, code: 'reporting', label: 'Reporting' },
            { id: 3, code: 'compliance', label: 'Conformite' },
            { id: 4, code: 'combined', label: 'Combine' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_evaluation_scope_types', [
            { id: 1, code: 'entity', label: 'Entite' },
            { id: 2, code: 'department', label: 'Departement' },
            { id: 3, code: 'process', label: 'Processus' },
            { id: 4, code: 'function', label: 'Fonction' },
            { id: 5, code: 'site', label: 'Site' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_assessment_answers', [
            { id: 1, code: 'yes', label: 'Oui' },
            { id: 2, code: 'partial', label: 'Partiel' },
            { id: 3, code: 'no', label: 'Non' },
            { id: 4, code: 'not_applicable', label: 'Non applicable' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_assessment_results', [
            { id: 1, code: 'effective', label: 'Efficace' },
            { id: 2, code: 'partially_effective', label: 'Partiellement efficace' },
            { id: 3, code: 'ineffective', label: 'Inefficace' },
            { id: 4, code: 'not_assessed', label: 'Non evalue' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_deficiency_severities', [
            { id: 1, code: 'low', label: 'Faible' },
            { id: 2, code: 'medium', label: 'Moyenne' },
            { id: 3, code: 'high', label: 'Elevee' },
            { id: 4, code: 'critical', label: 'Critique' },
            { id: 5, code: 'major', label: 'Majeure' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_deficiency_statuses', [
            { id: 1, code: 'open', label: 'Ouverte' },
            { id: 2, code: 'in_progress', label: 'En traitement' },
            { id: 3, code: 'remediated', label: 'Corrigee' },
            { id: 4, code: 'accepted', label: 'Acceptee' },
            { id: 5, code: 'closed', label: 'Cloturee' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_compensating_measure_statuses', [
            { id: 1, code: 'proposed', label: 'Proposee' },
            { id: 2, code: 'active', label: 'Active' },
            { id: 3, code: 'verified', label: 'Verifiee' },
            { id: 4, code: 'rejected', label: 'Rejetee' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_evidence_source_types', [
            { id: 1, code: 'document', label: 'Document' },
            { id: 2, code: 'audit', label: 'Audit' },
            { id: 3, code: 'incident', label: 'Incident' },
            { id: 4, code: 'risk', label: 'Risque' },
            { id: 5, code: 'manual', label: 'Manuel' },
            { id: 6, code: 'system_export', label: 'Export systeme' },
        ]);

        await createLookup(queryInterface, Sequelize, 'control_conclusion_results', [
            { id: 1, code: 'effective', label: 'Efficace' },
            { id: 2, code: 'effective_with_reservations', label: 'Efficace avec reserves' },
            { id: 3, code: 'partially_effective', label: 'Partiellement efficace' },
            { id: 4, code: 'ineffective', label: 'Inefficace' },
        ]);

        await createTableIfMissing(queryInterface, 'control_evaluation_components', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            code: { allowNull: false, type: Sequelize.STRING(80) },
            title: { allowNull: false, type: Sequelize.STRING(180) },
            description: { allowNull: true, type: Sequelize.TEXT },
            orderIndex: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            isActive: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_evaluation_principles', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            componentId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_components', key: 'id' }, onDelete: 'NO ACTION' },
            code: { allowNull: false, type: Sequelize.STRING(80) },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            orderIndex: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            isActive: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_evaluation_focus_points', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            principleId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_principles', key: 'id' }, onDelete: 'NO ACTION' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            orderIndex: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            isActive: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_evaluation_campaigns', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            status_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_campaign_statuses', key: 'id' } },
            objective_type_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_objective_types', key: 'id' } },
            scope_type_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_scope_types', key: 'id' } },
            scopeLabel: { allowNull: true, type: Sequelize.STRING(180) },
            riskTolerance: { allowNull: true, type: Sequelize.TEXT },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            startDate: { allowNull: true, type: Sequelize.DATE },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            completedAt: { allowNull: true, type: Sequelize.DATE },
            validatedById: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            validatedAt: { allowNull: true, type: Sequelize.DATE },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_principle_assessments', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            campaignId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_campaigns', key: 'id' }, onDelete: 'NO ACTION' },
            componentId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_components', key: 'id' }, onDelete: 'NO ACTION' },
            principleId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_principles', key: 'id' }, onDelete: 'NO ACTION' },
            implementation_answer_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_assessment_answers', key: 'id' } },
            operating_answer_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_assessment_answers', key: 'id' } },
            result_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_assessment_results', key: 'id' } },
            score: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            justification: { allowNull: true, type: Sequelize.TEXT },
            evaluatorUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            evaluatedAt: { allowNull: true, type: Sequelize.DATE },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_deficiencies', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            campaignId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_campaigns', key: 'id' }, onDelete: 'NO ACTION' },
            assessmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'control_principle_assessments', key: 'id' }, onDelete: 'SET NULL' },
            componentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'control_evaluation_components', key: 'id' }, onDelete: 'NO ACTION' },
            principleId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'control_evaluation_principles', key: 'id' }, onDelete: 'NO ACTION' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            severity_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_deficiency_severities', key: 'id' } },
            status_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_deficiency_statuses', key: 'id' } },
            isMajor: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
            impact: { allowNull: true, type: Sequelize.TEXT },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            correctiveAction: { allowNull: true, type: Sequelize.TEXT },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_compensating_measures', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            deficiencyId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_deficiencies', key: 'id' }, onDelete: 'NO ACTION' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            status_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_compensating_measure_statuses', key: 'id' } },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            effectivenessNote: { allowNull: true, type: Sequelize.TEXT },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_evaluation_evidence', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            campaignId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_campaigns', key: 'id' }, onDelete: 'NO ACTION' },
            assessmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'control_principle_assessments', key: 'id' }, onDelete: 'SET NULL' },
            deficiencyId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'control_deficiencies', key: 'id' }, onDelete: 'SET NULL' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            source_type_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evidence_source_types', key: 'id' } },
            sourceId: { allowNull: true, type: Sequelize.INTEGER },
            filename: { allowNull: true, type: Sequelize.STRING(255) },
            filePath: { allowNull: true, type: Sequelize.STRING(500) },
            mimeType: { allowNull: true, type: Sequelize.STRING(120) },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            capturedAt: { allowNull: true, type: Sequelize.DATE },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'control_evaluation_conclusions', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            campaignId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_evaluation_campaigns', key: 'id' }, onDelete: 'NO ACTION' },
            result_id: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'control_conclusion_results', key: 'id' } },
            score: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            summary: { allowNull: true, type: Sequelize.TEXT },
            justification: { allowNull: true, type: Sequelize.TEXT },
            validatedById: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            validatedAt: { allowNull: true, type: Sequelize.DATE },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await addIndex(queryInterface, 'control_evaluation_components', ['code'], 'ux_control_eval_components_code');
        await addIndex(queryInterface, 'control_evaluation_principles', ['componentId', 'code'], 'ux_control_eval_principles_component_code');
        await addIndex(queryInterface, 'control_evaluation_focus_points', ['principleId'], 'ix_control_eval_focus_points_principle');
        await addIndex(queryInterface, 'control_evaluation_campaigns', ['status_id', 'dueDate'], 'ix_control_eval_campaign_status_due');
        await addIndex(queryInterface, 'control_principle_assessments', ['campaignId', 'principleId'], 'ux_control_eval_assessment_campaign_principle');
        await addIndex(queryInterface, 'control_deficiencies', ['campaignId', 'severity_id', 'status_id'], 'ix_control_deficiencies_campaign_severity_status');
        await addIndex(queryInterface, 'control_evaluation_conclusions', ['campaignId'], 'ix_control_eval_conclusions_campaign');

        const now = new Date();
        const [existingComponents] = await queryInterface.sequelize.query('SELECT id FROM control_evaluation_components');
        if (existingComponents.length === 0) {
            await queryInterface.bulkInsert('control_evaluation_components', [
            { code: 'control_environment', title: 'Environnement de controle', description: 'Gouvernance, ethique, responsabilites et competences.', orderIndex: 1, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { code: 'risk_assessment', title: 'Evaluation des risques', description: 'Objectifs, risques, fraude et changements significatifs.', orderIndex: 2, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { code: 'control_activities', title: 'Activites de controle', description: 'Selection, formalisation et deploiement des activites de controle.', orderIndex: 3, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { code: 'information_communication', title: 'Information et communication', description: 'Qualite de l information et communication interne/externe.', orderIndex: 4, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { code: 'monitoring', title: 'Pilotage', description: 'Evaluations continues ou ponctuelles et suivi des deficiences.', orderIndex: 5, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            ]);
        }

        const [components] = await queryInterface.sequelize.query('SELECT id, code FROM control_evaluation_components');
        const componentId = (code) => components.find((item) => item.code === code).id;
        const [existingPrinciples] = await queryInterface.sequelize.query('SELECT id FROM control_evaluation_principles');
        if (existingPrinciples.length === 0) {
            await queryInterface.bulkInsert('control_evaluation_principles', [
            { componentId: componentId('control_environment'), code: 'P01', title: 'Engagement en faveur de l integrite et des valeurs ethiques', description: 'L organisation demontre son engagement en faveur de l integrite et des valeurs ethiques.', orderIndex: 1, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_environment'), code: 'P02', title: 'Surveillance effective', description: 'Les instances de gouvernance surveillent la mise en place et le fonctionnement du dispositif.', orderIndex: 2, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_environment'), code: 'P03', title: 'Structures, pouvoirs et responsabilites', description: 'Les responsabilites et rattachements sont definis pour atteindre les objectifs.', orderIndex: 3, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_environment'), code: 'P04', title: 'Developpement des competences', description: 'Les competences necessaires sont identifiees, developpees et maintenues.', orderIndex: 4, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_environment'), code: 'P05', title: 'Devoir de rendre compte', description: 'Les responsabilites de controle interne sont suivies et assumees.', orderIndex: 5, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('risk_assessment'), code: 'P06', title: 'Objectifs appropries', description: 'Les objectifs sont assez clairs pour identifier et evaluer les risques.', orderIndex: 6, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('risk_assessment'), code: 'P07', title: 'Identification et analyse des risques', description: 'Les risques sont identifies sur le perimetre et analyses.', orderIndex: 7, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('risk_assessment'), code: 'P08', title: 'Risque de fraude', description: 'Le risque de fraude est pris en compte dans l evaluation.', orderIndex: 8, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('risk_assessment'), code: 'P09', title: 'Changements significatifs', description: 'Les changements pouvant affecter le dispositif sont identifies et analyses.', orderIndex: 9, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_activities'), code: 'P10', title: 'Selection des activites de controle', description: 'Les activites de controle sont selectionnees et developpees selon les risques.', orderIndex: 10, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_activities'), code: 'P11', title: 'Controles generaux informatiques', description: 'Les controles technologiques soutiennent la realisation des objectifs.', orderIndex: 11, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('control_activities'), code: 'P12', title: 'Regles et procedures', description: 'Les activites de controle sont deployees via regles et procedures.', orderIndex: 12, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('information_communication'), code: 'P13', title: 'Information pertinente', description: 'L information necessaire au controle interne est obtenue ou produite.', orderIndex: 13, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('information_communication'), code: 'P14', title: 'Communication interne', description: 'Les informations utiles au controle interne circulent en interne.', orderIndex: 14, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('information_communication'), code: 'P15', title: 'Communication externe', description: 'Les informations pertinentes sont communiquees avec les parties externes.', orderIndex: 15, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('monitoring'), code: 'P16', title: 'Evaluations continues ou ponctuelles', description: 'Le dispositif est evalue en continu et/ou de maniere ponctuelle.', orderIndex: 16, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            { componentId: componentId('monitoring'), code: 'P17', title: 'Communication et suivi des deficiences', description: 'Les deficiences sont evaluees, communiquees et corrigees en temps voulu.', orderIndex: 17, isActive: true, is_deleted: false, deleted_at: null, createdAt: now, updatedAt: now },
            ]);
        }

        const [principles] = await queryInterface.sequelize.query('SELECT id, code FROM control_evaluation_principles');
        const [existingFocusPoints] = await queryInterface.sequelize.query('SELECT id FROM control_evaluation_focus_points');
        if (existingFocusPoints.length === 0) {
            await queryInterface.bulkInsert('control_evaluation_focus_points', principles.map((principle) => ({
                principleId: principle.id,
                title: `Verifier la mise en place et le fonctionnement du critere ${principle.code}`,
                description: 'Documenter les controles, preuves, deficiences et mesures compensatoires pertinentes.',
                orderIndex: 1,
                isActive: true,
                is_deleted: false,
                deleted_at: null,
                createdAt: now,
                updatedAt: now,
            })));
        }
    },

    async down(queryInterface) {
        await queryInterface.dropTable('control_evaluation_conclusions');
        await queryInterface.dropTable('control_evaluation_evidence');
        await queryInterface.dropTable('control_compensating_measures');
        await queryInterface.dropTable('control_deficiencies');
        await queryInterface.dropTable('control_principle_assessments');
        await queryInterface.dropTable('control_evaluation_campaigns');
        await queryInterface.dropTable('control_evaluation_focus_points');
        await queryInterface.dropTable('control_evaluation_principles');
        await queryInterface.dropTable('control_evaluation_components');
        await queryInterface.dropTable('control_conclusion_results');
        await queryInterface.dropTable('control_evidence_source_types');
        await queryInterface.dropTable('control_compensating_measure_statuses');
        await queryInterface.dropTable('control_deficiency_statuses');
        await queryInterface.dropTable('control_deficiency_severities');
        await queryInterface.dropTable('control_assessment_results');
        await queryInterface.dropTable('control_assessment_answers');
        await queryInterface.dropTable('control_evaluation_scope_types');
        await queryInterface.dropTable('control_evaluation_objective_types');
        await queryInterface.dropTable('control_evaluation_campaign_statuses');
    },
};
