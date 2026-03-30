import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

export class SystemSetting extends Model {
    public key!: string;
    public value!: string;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
}

SystemSetting.init(
    {
        key: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'system_settings',
        timestamps: true,
        ...softDeleteModelOptions,
    }
);
