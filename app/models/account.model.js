const Community = require("./community.model");

const Account = (sequelize, Sequelize, DataTypes) =>
    sequelize.define('account', {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false
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

module.exports = Account;