import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceEvidence } from './compliance-evidence.model';
import { ComplianceRequirement } from './compliance-requirement.model';
import { buildChildWhere } from './compliance.scope';
import { ComplianceFilters, ComplianceScope } from './compliance.types';

export class ComplianceEvidenceService {
    static async list(scope: ComplianceScope, filters: ComplianceFilters = {}) {
        return ComplianceEvidence.findAll({
            where: buildChildWhere(scope, filters),
            include: [
                { model: ComplianceRequirement, as: 'requirement', required: false, attributes: ['id', 'code', 'title', 'frameworkId'] },
                { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: Department, as: 'department', required: false, attributes: ['id', 'nom'] },
            ],
            order: [['createdAt', 'DESC']],
        });
    }
}
