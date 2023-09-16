const Community = require("./community.model");
const Account = require('./account.model');

const Post = (sequelize, Sequelize, DataTypes) =>
    sequelize.define('post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Account,
                key: 'id'
            }
        },
        communityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Community,
                key: 'id'
            }
        },
        upvote:  {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        downvote:  {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

module.exports = Post;