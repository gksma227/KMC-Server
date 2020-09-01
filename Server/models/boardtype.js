module.exports = (sequelize, DataTypes) => {
    const boardtype = sequelize.define('boardtype', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        typename: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'boardtype',
        timestamps: false,
    });
    boardtype.associate = function (models) {
        boardtype.hasMany(models.board);
    };
    return boardtype;
};