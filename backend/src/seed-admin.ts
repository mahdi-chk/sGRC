import { User } from './modules/users/user.model';
import sequelize from './database';
import { hashPassword } from './utils/security';
import { UserRole } from './modules/users/user.roles';
import { Department } from './modules/departments/department.model';

async function seed() {
    try {
        // We assume the schema is synced via the app or manual script if needed, 
        // but here we just ensure data is there.

        const departmentNames = ['Risques', 'Audit', 'Direction', 'Informatique'];
        const departments: { [key: string]: number } = {};

        for (const name of departmentNames) {
            let dept = await Department.findOne({ where: { nom: name } });
            if (!dept) {
                dept = await Department.create({ nom: name });
                console.log(`Department ${name} created`);
            }
            departments[name] = dept.id;
        }

        const profiles = [
            {
                nom: 'Manager',
                prenom: 'Risk',
                mail: 'risk.manager@sgrc.com',
                telephone: '01010101',
                poste: 'Risk Manager',
                departement: 'Risques',
                role: UserRole.RISK_MANAGER,
                password: 'password123'
            },
            {
                nom: 'Agent',
                prenom: 'Risk',
                mail: 'risk.agent@sgrc.com',
                telephone: '02020202',
                poste: 'Risk Agent',
                departement: 'Risques',
                role: UserRole.RISK_AGENT,
                password: 'password123'
            },
            {
                nom: 'Senior',
                prenom: 'Audit',
                mail: 'audit.senior@sgrc.com',
                telephone: '03030303',
                poste: 'Audit Senior',
                departement: 'Audit',
                role: UserRole.AUDIT_SENIOR,
                password: 'password123'
            },
            {
                nom: 'Auditeur',
                prenom: 'Junior',
                mail: 'auditeur@sgrc.com',
                telephone: '04040404',
                poste: 'Auditeur',
                departement: 'Audit',
                role: UserRole.AUDITEUR,
                password: 'password123'
            },
            {
                nom: 'Management',
                prenom: 'Top',
                mail: 'top.management@sgrc.com',
                telephone: '05050505',
                poste: 'Top Management',
                departement: 'Direction',
                role: UserRole.TOP_MANAGEMENT,
                password: 'password123'
            },
            {
                nom: 'Admin',
                prenom: 'SI',
                mail: 'admin.si@sgrc.com',
                telephone: '06060606',
                poste: 'Administrateur SI',
                departement: 'Informatique',
                role: UserRole.ADMIN_SI,
                password: 'password123'
            }
        ];

        for (const profile of profiles) {
            const existingUser = await User.findOne({ where: { mail: profile.mail } });
            if (!existingUser) {
                const { hash, salt } = hashPassword(profile.password);
                await User.create({
                    nom: profile.nom,
                    prenom: profile.prenom,
                    mail: profile.mail,
                    telephone: profile.telephone,
                    poste: profile.poste,
                    departementId: departments[profile.departement],
                    password_hash: hash,
                    password_salt: salt,
                    role: profile.role
                });
                console.log(`User ${profile.mail} created successfully`);
            } else {
                console.log(`User ${profile.mail} already exists`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding profiles:', error);
        process.exit(1);
    }
}

seed();
