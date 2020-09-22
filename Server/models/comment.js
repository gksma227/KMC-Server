module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        c_userid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        c_contents: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        c_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        c_recommend: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        c_boardid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'comment',
        timestamps: false,
    });
    comment.associate = function (models) {
        comment.belongsTo(models.board, {
            foreignKey: 'c_boardid',
        });
    };
    comment.associate = function (models) {
        comment.belongsTo(models.user, {
            foreignKey: 'c_userid',
        });
    };
    return comment;
};
