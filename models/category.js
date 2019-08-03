module.exports = (Sequelize, sequelize) => {
    return sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        color: Sequelize.STRING,
        order: Sequelize.INTEGER
    });
}   