import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceCampaign } from './compliance-campaign.model';
import { ComplianceFramework } from './compliance-framework.model';
import { ComplianceFilters, ComplianceScope } from './compliance.types';
import { buildChildWhere } from './compliance.scope';

export class ComplianceCampaignsService {
    static async list(scope: ComplianceScope, filters: ComplianceFilters = {}) {
        return ComplianceCampaign.findAll({
            where: buildChildWhere(scope, filters),
            include: [
                { model: ComplianceFramework, as: 'framework', required: false, attributes: ['id', 'code', 'name', 'version'] },
                { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: User, as: 'assignee', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: Department, as: 'department', required: false, attributes: ['id', 'nom'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
    }
}
