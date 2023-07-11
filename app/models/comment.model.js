const Community = require("./community.model");
const Account = require('./account.model');
const Post = require('./post.model');

const Comment = (sequelize, Sequelize, DataTypes) =>
    sequelize.define('comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Post,
            //     key: 'id',
            // }
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Account,
            //     key: 'id'
            // }
        },
        communityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Community,
            //     key: 'id'
            // }
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

module.exports = Comment;