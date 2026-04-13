'use strict';

async function constraintExists(queryInterface, tableName, constraintName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.check_constraints cc
        INNER JOIN sys.tables t ON t.object_id = cc.parent_object_id
        WHERE t.name = ${queryInterface.sequelize.escape(tableName)}
          AND cc.name = ${queryInterface.sequelize.escape(constraintName)}
    `);

    return rows.length > 0;
}

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(`
            UPDATE audit_mission_statuts
            SET code = 'nok', label = 'NOK', sort_order = 1
            WHERE id = 1
        `);

        await queryInterface.sequelize.query(`
            UPDATE audit_mission_statuts
            SET code = 'en_cours', label = 'En cours', sort_order = 2
            WHERE id = 2
        `);

        await queryInterface.sequelize.query(`
            UPDATE audit_mission_statuts
            SET code = 'ok', label = 'OK', sort_order = 3
            WHERE id = 3
        `);

        await queryInterface.sequelize.query(`
            UPDATE audit_missions
            SET statut_id = 1
            WHERE statut_id IN (4, 5)
        `);

        await queryInterface.sequelize.query(`
            DELETE FROM audit_mission_statuts
            WHERE id IN (4, 5)
        `);

        if (await constraintExists(queryInterface, 'audit_missions', 'CK_audit_missions_horizon_enum')) {
            await queryInterface.sequelize.query(`
                ALTER TABLE audit_missions DROP CONSTRAINT CK_audit_missions_horizon_enum
            `);
        }

        if (await constraintExists(queryInterface, 'audit_missions', 'CK_audit_missions_priorite_enum')) {
            await queryInterface.sequelize.query(`
                ALTER TABLE audit_missions DROP CONSTRAINT CK_audit_missions_priorite_enum
            `);
        }

        await queryInterface.sequelize.query(`
            ALTER TABLE audit_missions
            ADD CONSTRAINT CK_audit_missions_horizon_enum
            CHECK (horizon IS NULL OR horizon IN ('court_terme', 'moyen_terme'))
        `);

        await queryInterface.sequelize.query(`
            ALTER TABLE audit_missions
            ADD CONSTRAINT CK_audit_missions_priorite_enum
            CHECK (priorite IS NULL OR priorite IN (1, 2, 3))
        `);
    },

    async down(queryInterface) {
        if (await constraintExists(queryInterface, 'audit_missions', 'CK_audit_missions_horizon_enum')) {
            await queryInterface.sequelize.query(`
                ALTER TABLE audit_missions DROP CONSTRAINT CK_audit_missions_horizon_enum
            `);
        }

        if (await constraintExists(queryInterface, 'audit_missions', 'CK_audit_missions_priorite_enum')) {
            await queryInterface.sequelize.query(`
                ALTER TABLE audit_missions DROP CONSTRAINT CK_audit_missions_priorite_enum
            `);
        }

        await queryInterface.sequelize.query(`
            IF NOT EXISTS (SELECT 1 FROM audit_mission_statuts WHERE id = 4)
            INSERT INTO audit_mission_statuts (id, code, label, is_active, sort_order, created_at, updated_at)
            VALUES (4, 'en_retard', 'En retard', 1, 4, GETDATE(), GETDATE())
        `);

        await queryInterface.sequelize.query(`
            IF NOT EXISTS (SELECT 1 FROM audit_mission_statuts WHERE id = 5)
            INSERT INTO audit_mission_statuts (id, code, label, is_active, sort_order, created_at, updated_at)
            VALUES (5, 'annule', 'Annulé', 1, 5, GETDATE(), GETDATE())
        `);

        await queryInterface.sequelize.query(`
            UPDATE audit_mission_statuts
            SET code = 'a_venir', label = 'À venir', sort_order = 1
            WHERE id = 1
        `);

        await queryInterface.sequelize.query(`
            UPDATE audit_mission_statuts
            SET code = 'termine', label = 'Terminé', sort_order = 3
            WHERE id = 3
        `);
    },
};
