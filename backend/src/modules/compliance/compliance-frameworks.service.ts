import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceFramework } from './compliance-framework.model';
import { buildFrameworkWhere } from './compliance.scope';
import { ComplianceFilters, ComplianceScope } from './compliance.types';

export class ComplianceFrameworksService {
    static async list(scope: ComplianceScope, filters: ComplianceFilters = {}) {
        return ComplianceFramework.findAll({
            where: buildFrameworkWhere(scope, filters),
            include: [
                { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: Department, as: 'department', required: false, attributes: ['id', 'nom'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
    }
}
