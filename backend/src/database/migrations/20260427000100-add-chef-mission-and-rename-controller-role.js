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

module.exports = {
    async up(queryInterface) {
        if (!(await tableExists(queryInterface, 'user_roles'))) {
            return;
        }

        await queryInterface.sequelize.query(`
            UPDATE ${quote('user_roles')}
            SET label = N'Controleur Interne',
                sort_order = 9,
                is_active = 1,
                updated_at = GETDATE()
            WHERE code = N'controller';

            IF NOT EXISTS (SELECT 1 FROM ${quote('user_roles')} WHERE code = N'chef_mission')
            BEGIN
                SET IDENTITY_INSERT ${quote('user_roles')} ON;
                INSERT INTO ${quote('user_roles')} (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (11, N'chef_mission', N'Chef de Mission', NULL, 1, 10, GETDATE(), GETDATE());
                SET IDENTITY_INSERT ${quote('user_roles')} OFF;
            END
            ELSE
            BEGIN
                UPDATE ${quote('user_roles')}
                SET label = N'Chef de Mission',
                    sort_order = 10,
                    is_active = 1,
                    updated_at = GETDATE()
                WHERE code = N'chef_mission';
            END
        `);
    },

    async down(queryInterface) {
        if (!(await tableExists(queryInterface, 'user_roles'))) {
            return;
        }

        await queryInterface.sequelize.query(`
            UPDATE ${quote('user_roles')}
            SET label = N'Controller',
                sort_order = 9,
                updated_at = GETDATE()
            WHERE code = N'controller';

            UPDATE ${quote('user_roles')}
            SET is_active = 0,
                updated_at = GETDATE()
            WHERE code = N'chef_mission';
        `);
    }
};
