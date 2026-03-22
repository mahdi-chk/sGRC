import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';

export class AuditChecklistTemplate extends Model {
    public id!: number;
    public titre!: string;
    public description!: string | null;
    public createdById!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditChecklistTemplate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdById: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'audit_checklist_templates',
    }
);

export class AuditChecklistTemplateItem extends Model {
    public id!: number;
    public templateId!: number;
    public texte!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditChecklistTemplateItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        templateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_checklist_templates',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        texte: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'audit_checklist_template_items',
    }
);

AuditChecklistTemplate.belongsTo(User, { foreignKey: 'createdById', as: 'creator' });
AuditChecklistTemplate.hasMany(AuditChecklistTemplateItem, { foreignKey: 'templateId', as: 'items', onDelete: 'CASCADE' });
AuditChecklistTemplateItem.belongsTo(AuditChecklistTemplate, { foreignKey: 'templateId', as: 'template' });
