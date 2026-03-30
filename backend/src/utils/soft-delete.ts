import { DataTypes, Model, Op } from 'sequelize';

export const softDeleteAttributes: any = {
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // Keep the application-level default without asking MSSQL to emit
        // `ALTER COLUMN ... DEFAULT ...`, which Sequelize generates invalidly
        // during cyclic `sync()` reconciliation.
        defaultValue: () => false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

export const softDeleteModelOptions: any = {
    defaultScope: {
        where: {
            [Op.or]: [
                { is_deleted: false },
                { is_deleted: null },
            ],
        },
    },
    scopes: {
        withDeleted: {},
        onlyDeleted: {
            where: {
                is_deleted: true,
            },
        },
    },
};

export const getSoftDeleteValues = (): any => ({
    is_deleted: true,
    deleted_at: new Date(),
});

export const getRestoreValues = (): any => ({
    is_deleted: false,
    deleted_at: null,
});

export const softDeleteInstance = async (instance: Model) => {
    await (instance as any).update(getSoftDeleteValues());
    return instance;
};

export const restoreSoftDeletedInstance = async (instance: Model) => {
    await (instance as any).update(getRestoreValues());
    return instance;
};
