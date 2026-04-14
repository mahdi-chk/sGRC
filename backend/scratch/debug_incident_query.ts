import { Incident } from '../src/modules/incidents/incident.model';
import { User } from '../src/modules/users/user.model';
import sequelize from '../src/database';

async function debugQuery() {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        // Activer le logging SQL pour cette requête
        const incidents = await Incident.findAll({
            include: [
                { model: User, as: 'declareur', attributes: ['id', 'nom', 'prenom', 'mail'], required: false },
                { model: User, as: 'assignee', attributes: ['id', 'nom', 'prenom', 'mail'], required: false }
            ],
            order: [['createdAt', 'DESC']],
            logging: (sql) => console.log('EXECUTED SQL:', sql)
        });

        console.log('Nombre d\'incidents trouvés par Sequelize:', incidents.length);
        if (incidents.length > 0) {
            console.log('Premier incident:', JSON.stringify(incidents[0], null, 2));
        }

        process.exit(0);
    } catch (e) {
        console.error('Erreur lors de la requête Sequelize:', e);
        process.exit(1);
    }
}

debugQuery();
