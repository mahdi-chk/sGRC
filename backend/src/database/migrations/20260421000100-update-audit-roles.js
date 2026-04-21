'use strict';

const quote = (identifier) => `[${identifier}]`;

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${tableName}'
    `);

    return rows.length > 0;
};

const getColumns = async (queryInterface, tableName) => {
    if (!(await tableExists(queryInterface, tableName))) {
        return {};
    }

    return queryInterface.describeTable(tableName);
};

const columnExists = async (queryInterface, tableName, columnName) => {
    const columns = await getColumns(queryInterface, tableName);
    return Boolean(columns[columnName]);
};

const getUserTimestampColumn = async (queryInterface) => {
    if (await columnExists(queryInterface, 'users', 'updated_at')) {
        return 'updated_at';
    }

    if (await columnExists(queryInterface, 'users', 'updatedAt')) {
        return 'updatedAt';
    }

    return null;
};

module.exports = {
    async up(queryInterface) {
        if (!(await tableExists(queryInterface, 'user_roles'))) {
            return;
        }

        await queryInterface.sequelize.query(`
            UPDATE ${quote('user_roles')}
            SET code = N'audit_directeur',
                label = N'Audit Directeur',
                sort_order = 3,
                is_active = 1,
                updated_at = GETDATE()
            WHERE id = 3 OR code = N'audit_senior';

            IF NOT EXISTS (SELECT 1 FROM ${quote('user_roles')} WHERE code = N'audit_responsable')
            BEGIN
                SET IDENTITY_INSERT ${quote('user_roles')} ON;
                INSERT INTO ${quote('user_roles')} (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (9, N'audit_responsable', N'Audit Responsable', NULL, 1, 4, GETDATE(), GETDATE());
                SET IDENTITY_INSERT ${quote('user_roles')} OFF;
            END
            ELSE
            BEGIN
                UPDATE ${quote('user_roles')}
                SET label = N'Audit Responsable',
                    sort_order = 4,
                    is_active = 1,
                    updated_at = GETDATE()
                WHERE code = N'audit_responsable';
            END

            UPDATE ${quote('user_roles')}
            SET sort_order = 5,
                updated_at = GETDATE()
            WHERE code = N'auditeur';
        `);

        if (await tableExists(queryInterface, 'users')) {
            const hasRoleIdColumn = await columnExists(queryInterface, 'users', 'role_id');
            const hasLegacyRoleColumn = await columnExists(queryInterface, 'users', 'role');
            const userTimestampColumn = await getUserTimestampColumn(queryInterface);
            const roleIdSetClause = userTimestampColumn
                ? `role_id = @auditDirecteurId,\n                            ${quote(userTimestampColumn)} = GETDATE()`
                : 'role_id = @auditDirecteurId';
            const legacyRoleSetClause = userTimestampColumn
                ? `role = N'audit_directeur',\n                        ${quote(userTimestampColumn)} = GETDATE()`
                : `role = N'audit_directeur'`;

            if (hasRoleIdColumn) {
                await queryInterface.sequelize.query(`
                    DECLARE @auditSeniorId INT = (
                        SELECT TOP 1 id
                        FROM ${quote('user_roles')}
                        WHERE code = N'audit_senior'
                    );
                    DECLARE @auditDirecteurId INT = (
                        SELECT TOP 1 id
                        FROM ${quote('user_roles')}
                        WHERE code = N'audit_directeur'
                    );

                    IF @auditDirecteurId IS NOT NULL
                    BEGIN
                        UPDATE ${quote('users')}
                        SET ${roleIdSetClause}
                        WHERE role_id = @auditSeniorId;
                    END
                `);
            }

            if (hasLegacyRoleColumn) {
                await queryInterface.sequelize.query(`
                    UPDATE ${quote('users')}
                    SET ${legacyRoleSetClause}
                    WHERE role = N'audit_senior';
                `);
            }
        }
    },

    async down(queryInterface) {
        if (!(await tableExists(queryInterface, 'user_roles'))) {
            return;
        }

        await queryInterface.sequelize.query(`
            UPDATE ${quote('user_roles')}
            SET code = N'audit_senior',
                label = N'Audit Senior',
                sort_order = 3,
                updated_at = GETDATE()
            WHERE id = 3 OR code = N'audit_directeur';

            UPDATE ${quote('user_roles')}
            SET is_active = 0,
                updated_at = GETDATE()
            WHERE code = N'audit_responsable';

            UPDATE ${quote('user_roles')}
            SET sort_order = 4,
                updated_at = GETDATE()
            WHERE code = N'auditeur';
        `);

        if (await tableExists(queryInterface, 'users')) {
            const hasRoleIdColumn = await columnExists(queryInterface, 'users', 'role_id');
            const hasLegacyRoleColumn = await columnExists(queryInterface, 'users', 'role');
            const userTimestampColumn = await getUserTimestampColumn(queryInterface);
            const roleIdSetClause = userTimestampColumn
                ? `role_id = @auditSeniorId,\n                            ${quote(userTimestampColumn)} = GETDATE()`
                : 'role_id = @auditSeniorId';
            const legacyRoleSetClause = userTimestampColumn
                ? `role = N'audit_senior',\n                        ${quote(userTimestampColumn)} = GETDATE()`
                : `role = N'audit_senior'`;

            if (hasRoleIdColumn) {
                await queryInterface.sequelize.query(`
                    DECLARE @auditSeniorId INT = (
                        SELECT TOP 1 id
                        FROM ${quote('user_roles')}
                        WHERE code = N'audit_senior'
                    );
                    DECLARE @auditDirecteurId INT = (
                        SELECT TOP 1 id
                        FROM ${quote('user_roles')}
                        WHERE code = N'audit_directeur'
                    );

                    IF @auditSeniorId IS NOT NULL
                    BEGIN
                        UPDATE ${quote('users')}
                        SET ${roleIdSetClause}
                        WHERE role_id = @auditDirecteurId;
                    END
                `);
            }

            if (hasLegacyRoleColumn) {
                await queryInterface.sequelize.query(`
                    UPDATE ${quote('users')}
                    SET ${legacyRoleSetClause}
                    WHERE role = N'audit_directeur';
                `);
            }
        }
    }
};
