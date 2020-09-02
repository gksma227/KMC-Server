module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'user',
        timestamps: false,
    });
    user.associate = function (models) {
        user.hasMany(models.board);
    };
    return user;
};