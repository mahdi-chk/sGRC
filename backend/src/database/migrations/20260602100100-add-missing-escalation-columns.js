'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const tableDescription = await queryInterface.describeTable('governance_workflow_template_stages');

        if (!tableDescription.escalationTo) {
            await queryInterface.addColumn('governance_workflow_template_stages', 'escalationTo', {
                allowNull: true,
                type: Sequelize.STRING(180),
            });
        }

        if (!tableDescription.escalationRule) {
            await queryInterface.addColumn('governance_workflow_template_stages', 'escalationRule', {
                allowNull: true,
                type: Sequelize.STRING(1000),
            });
        }
    },

    async down(queryInterface) {
        const tableDescription = await queryInterface.describeTable('governance_workflow_template_stages');

        if (tableDescription.escalationRule) {
            await queryInterface.removeColumn('governance_workflow_template_stages', 'escalationRule');
        }

        if (tableDescription.escalationTo) {
            await queryInterface.removeColumn('governance_workflow_template_stages', 'escalationTo');
        }
    },
};
