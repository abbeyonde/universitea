const Community = (sequelize,Sequelize,DataTypes) => sequelize.define('community',
{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Community