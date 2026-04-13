'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * En MSSQL, changer la nullabilité d'une colonne nécessite souvent du SQL brut 
         * si Sequelize.changeColumn n'arrive pas à gérer les contraintes existantes.
         */
        await queryInterface.sequelize.query(`
            ALTER TABLE audit_missions
            ALTER COLUMN riskId INT NULL;
        `);
    },

    async down(queryInterface, Sequelize) {
        // En cas de retour arrière, on peut vouloir remettre NOT NULL 
        // mais attention s'il y a déjà des données NULL dans la colonne.
        // Par sécurité on le laisse en NULL ou on nettoie avant.
        await queryInterface.sequelize.query(`
            ALTER TABLE audit_missions
            ALTER COLUMN riskId INT NOT NULL;
        `);
    }
};
