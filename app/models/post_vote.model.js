const Post_Vote = (sequelize,Sequelize,DataTypes) => {
    sequelize.define('post_vote', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }

    )
}

module.exports = Post_Vote;