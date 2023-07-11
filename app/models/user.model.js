const Community = require("./community.model");
const Account = require('./account.model');

const User = (sequelize, Sequelize, DataTypes) =>
    sequelize.define('user', {
        accountId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Account,
            //     key: 'id'
            // }   
        },
        username: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        communityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Community,
            //     key: 'id'
            // }
        },
    });

module.exports = User;