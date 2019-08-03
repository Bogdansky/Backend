const User = require('../models/user');
const Note = require('../models/note');
const Category = require('../models/category');

module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        paranoid: true
    };

    const sequelize = new Sequelize(config.database, config.user, config.password, options);

    const user = User(Sequelize, sequelize);
    const category = Category(Sequelize, sequelize);
    const note = Note(Sequelize, sequelize, User, Category);

    [user, category, note].forEach(table => {
        table.sync();
    });

    user.hasMany(note, {foreignKey: 'author_id'});
    note.hasOne(category, {foreignKey: 'category_id'});

    return {
        user, category, note,

        sequelize, Sequelize
    };
}