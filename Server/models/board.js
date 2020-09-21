module.exports = (sequelize, DataTypes) => {
    const board = sequelize.define('board', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        contents: {
            type: DataTypes.TEXT('medium'), // mediumtext
            allowNull: true,
        },
        register_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        recommend: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        boardtype_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    }, {
        sequelize,
        tableName: 'board',
        timestamps: false,
    });
    board.associate = function (models) {
        board.belongsTo(models.user, {
            foreignKey: 'user_id',
        });
    };
    board.associate = function (models) {
        board.belongsTo(models.boardtype, {
            foreignKey: 'boardtype_id',
        });
    };
    board.associate = function (models) {
        board.hasMany(models.file);
    };
    board.associate = function (models) {
        board.hasMany(models.comment);
    };
    return board;
};
