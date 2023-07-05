const { Sequelize, DataTypes } = require('sequelize');

//access database
const sequelize = new Sequelize('testdb', 'admin', 'admin123',
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
// db.Account = require('./account.model')(sequelize,Sequelize,DataTypes);
db.Post = require('./post.model')(sequelize,Sequelize,DataTypes);

//table relations

//export db
module.exports = db;