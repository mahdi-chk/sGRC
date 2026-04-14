import sequelize from '../src/database';

async function addColumn() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        console.log('Adding assigneeId column...');
        await sequelize.query(`
            ALTER TABLE [incidents]
            ADD [assigneeId] INT NULL
        `);

        console.log('Adding foreign key constraint...');
        await sequelize.query(`
            ALTER TABLE [incidents]
            ADD CONSTRAINT FK_incidents_assigneeId
            FOREIGN KEY ([assigneeId]) REFERENCES [users](id)
            ON DELETE SET NULL
        `);

        console.log('Adding index...');
        await sequelize.query(`
            CREATE INDEX IX_incidents_assigneeId
            ON [incidents] ([assigneeId])
        `);

        console.log('SUCCESS: Column added manually.');
        process.exit(0);
    } catch (e: any) {
        console.error('Error during manual column addition:', e.message);
        if (e.original) {
            console.error('Original error:', e.original.message);
        }
        process.exit(1);
    }
}

addColumn();
