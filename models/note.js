module.exports = (Sequelize, sequelize, User, Category) => {
    return sequelize.define('notes', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: Sequelize.STRING,
        text: Sequelize.STRING,
        author_id: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        category_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Category,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }
    })
}