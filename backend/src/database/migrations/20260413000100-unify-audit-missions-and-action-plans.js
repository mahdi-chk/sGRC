'use strict';

async function tableExists(queryInterface, tableName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
    `);

    return rows.length > 0;
}

async function columnExists(queryInterface, tableName, columnName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
          AND COLUMN_NAME = ${queryInterface.sequelize.escape(columnName)}
    `);

    return rows.length > 0;
}

async function indexExists(queryInterface, tableName, indexName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.indexes i
        INNER JOIN sys.tables t ON t.object_id = i.object_id
        WHERE t.name = ${queryInterface.sequelize.escape(tableName)}
          AND i.name = ${queryInterface.sequelize.escape(indexName)}
    `);

    return rows.length > 0;
}

async function hasUnifiedActionPlans(queryInterface) {
    if (!(await columnExists(queryInterface, 'audit_missions', 'type'))) {
        return false;
    }

    const [rows] = await queryInterface.sequelize.query(`
        SELECT TOP 1 1 AS found
        FROM audit_missions
        WHERE type = 'plan_action_audit'
    `);

    return rows.length > 0;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        if (!(await columnExists(queryInterface, 'audit_missions', 'type'))) {
            await queryInterface.addColumn('audit_missions', 'type', {
                type: Sequelize.STRING(40),
                allowNull: false,
                defaultValue: 'mission_audit',
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'code'))) {
            await queryInterface.addColumn('audit_missions', 'code', {
                type: Sequelize.STRING(80),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'ordre'))) {
            await queryInterface.addColumn('audit_missions', 'ordre', {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'regleDnssi'))) {
            await queryInterface.addColumn('audit_missions', 'regleDnssi', {
                type: Sequelize.STRING(120),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'horizon'))) {
            await queryInterface.addColumn('audit_missions', 'horizon', {
                type: Sequelize.STRING(40),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'priorite'))) {
            await queryInterface.addColumn('audit_missions', 'priorite', {
                type: Sequelize.INTEGER,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'sourceExcelFile'))) {
            await queryInterface.addColumn('audit_missions', 'sourceExcelFile', {
                type: Sequelize.STRING(255),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'sourceExcelSheet'))) {
            await queryInterface.addColumn('audit_missions', 'sourceExcelSheet', {
                type: Sequelize.STRING(120),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'sourceExcelRow'))) {
            await queryInterface.addColumn('audit_missions', 'sourceExcelRow', {
                type: Sequelize.INTEGER,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'sourceMissionId'))) {
            await queryInterface.addColumn('audit_missions', 'sourceMissionId', {
                type: Sequelize.INTEGER,
                allowNull: true,
            });
        }

        await queryInterface.changeColumn('audit_missions', 'objectifs', {
            type: Sequelize.TEXT,
            allowNull: true,
        });

        await queryInterface.changeColumn('audit_missions', 'responsabilites', {
            type: Sequelize.TEXT,
            allowNull: true,
        });

        await queryInterface.changeColumn('audit_missions', 'delai', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        await queryInterface.changeColumn('audit_missions', 'riskId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'risks',
                key: 'id',
            },
        });

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_type'))) {
            await queryInterface.addIndex('audit_missions', ['type']);
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_code'))) {
            await queryInterface.addIndex('audit_missions', ['code']);
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_source_mission_id'))) {
            await queryInterface.addIndex('audit_missions', ['sourceMissionId'], {
                name: 'audit_missions_source_mission_id',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_regle_dnssi'))) {
            await queryInterface.addIndex('audit_missions', ['regleDnssi'], {
                name: 'audit_missions_regle_dnssi',
            });
        }

        const [statusRows] = await queryInterface.sequelize.query('SELECT id, code FROM audit_mission_statuts');
        const statusMap = new Map(statusRows.map((row) => [String(row.code || '').trim().toLowerCase(), row.id]));

        const shouldMigrateLegacyItems = await tableExists(queryInterface, 'audit_mission_action_plan_items')
            && !(await hasUnifiedActionPlans(queryInterface));

        if (!shouldMigrateLegacyItems) {
            return;
        }

        const [legacyRows] = await queryInterface.sequelize.query(`
            SELECT
                ap.id AS legacyId,
                ap.missionId,
                ap.ordre,
                ap.regleDnssi,
                ap.recommandations,
                ap.horizon,
                ap.priorite,
                ap.responsableId,
                ap.responsableNom,
                ap.echeance,
                ap.etatAvancement,
                ap.sourceExcelFile,
                ap.sourceExcelSheet,
                ap.sourceExcelRow,
                ap.createdAt,
                ap.updatedAt,
                m.auditSeniorId,
                m.riskId,
                m.titre AS missionTitre
            FROM audit_mission_action_plan_items ap
            INNER JOIN audit_missions m ON m.id = ap.missionId
            WHERE ap.is_deleted = 0 OR ap.is_deleted IS NULL
        `);

        if (legacyRows.length === 0) {
            return;
        }

        const normalizeLegacyProgress = (value) => {
            const normalized = String(value || '')
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[\s-]+/g, '_');

            if (normalized === 'ok') {
                return 'ok';
            }

            if (normalized === 'en_cours' || normalized === 'in_progress') {
                return 'en_cours';
            }

            return 'nok';
        };

        const migratedRows = legacyRows.map((row) => {
            const mappedStatus = normalizeLegacyProgress(row.etatAvancement);
            const statutId = statusMap.get(mappedStatus) || statusMap.get('nok') || 1;
            const title = String(row.regleDnssi || '').trim()
                || String(row.missionTitre || '').trim()
                || 'Plan d action audit';

            return {
                titre: title,
                objectifs: row.recommandations || null,
                responsabilites: row.responsableNom || null,
                delai: row.echeance || null,
                statut_id: statutId,
                auditSeniorId: row.auditSeniorId,
                auditeurId: row.responsableId || null,
                riskId: row.riskId || null,
                checklistTemplateId: null,
                rapport: null,
                recommandations: row.recommandations || null,
                is_deleted: false,
                deleted_at: null,
                type: 'plan_action_audit',
                code: null,
                ordre: row.ordre || 0,
                regleDnssi: row.regleDnssi || null,
                horizon: row.horizon || null,
                priorite: row.priorite || null,
                sourceExcelFile: row.sourceExcelFile || null,
                sourceExcelSheet: row.sourceExcelSheet || null,
                sourceExcelRow: row.sourceExcelRow || null,
                sourceMissionId: row.missionId || null,
                createdAt: row.createdAt || new Date(),
                updatedAt: row.updatedAt || new Date(),
            };
        });

        await queryInterface.bulkInsert('audit_missions', migratedRows);

        await queryInterface.sequelize.query(`
            UPDATE audit_missions
            SET code = CAST(id AS NVARCHAR(80))
            WHERE type = 'plan_action_audit'
              AND (code IS NULL OR LTRIM(RTRIM(code)) = '')
        `);
    },

    async down(queryInterface, Sequelize) {
        if (await columnExists(queryInterface, 'audit_missions', 'type')) {
            await queryInterface.sequelize.query(
                "DELETE FROM audit_missions WHERE type = 'plan_action_audit'"
            );
        }

        if (await indexExists(queryInterface, 'audit_missions', 'audit_missions_regle_dnssi')) {
            await queryInterface.removeIndex('audit_missions', 'audit_missions_regle_dnssi');
        }

        if (await indexExists(queryInterface, 'audit_missions', 'audit_missions_source_mission_id')) {
            await queryInterface.removeIndex('audit_missions', 'audit_missions_source_mission_id');
        }

        if (await indexExists(queryInterface, 'audit_missions', 'audit_missions_code')) {
            await queryInterface.removeIndex('audit_missions', 'audit_missions_code');
        }

        if (await indexExists(queryInterface, 'audit_missions', 'audit_missions_type')) {
            await queryInterface.removeIndex('audit_missions', 'audit_missions_type');
        }

        await queryInterface.changeColumn('audit_missions', 'riskId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'risks',
                key: 'id',
            },
        });

        await queryInterface.changeColumn('audit_missions', 'delai', {
            type: Sequelize.DATE,
            allowNull: false,
        });

        await queryInterface.changeColumn('audit_missions', 'responsabilites', {
            type: Sequelize.TEXT,
            allowNull: false,
        });

        await queryInterface.changeColumn('audit_missions', 'objectifs', {
            type: Sequelize.TEXT,
            allowNull: false,
        });

        if (await columnExists(queryInterface, 'audit_missions', 'sourceMissionId')) {
            await queryInterface.removeColumn('audit_missions', 'sourceMissionId');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'sourceExcelRow')) {
            await queryInterface.removeColumn('audit_missions', 'sourceExcelRow');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'sourceExcelSheet')) {
            await queryInterface.removeColumn('audit_missions', 'sourceExcelSheet');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'sourceExcelFile')) {
            await queryInterface.removeColumn('audit_missions', 'sourceExcelFile');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'priorite')) {
            await queryInterface.removeColumn('audit_missions', 'priorite');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'horizon')) {
            await queryInterface.removeColumn('audit_missions', 'horizon');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'regleDnssi')) {
            await queryInterface.removeColumn('audit_missions', 'regleDnssi');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'ordre')) {
            await queryInterface.removeColumn('audit_missions', 'ordre');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'code')) {
            await queryInterface.removeColumn('audit_missions', 'code');
        }
        if (await columnExists(queryInterface, 'audit_missions', 'type')) {
            await queryInterface.removeColumn('audit_missions', 'type');
        }
    },
};
