const { Sequelize, DataTypes } = require('sequelize');

//access database
const sequelize = new Sequelize('ccdb', 'admin', 'admin123',
    {
        host: 'localhost',
        dialect: 'mysql',
        // pool: {

        // }
    });

//establish connection
try {
    sequelize.authenticate();
    console.log('connected...');
} catch (e) {
    console.error('unable to connect to database');
}

//initialize db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//initialize all entity in DB
db.Account = require('./account.model')(sequelize,Sequelize,DataTypes);
db.Post = require('./post.model')(sequelize,Sequelize,DataTypes);
db.User = require('./user.model')(sequelize,Sequelize,DataTypes);
db.Community = require('./community.model')(sequelize,Sequelize,DataTypes);
db.Comment = require('./comment.model')(sequelize,Sequelize,DataTypes);

module.exports = db;