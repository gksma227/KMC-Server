module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('file', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        file_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_type: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'file',
        timestamps: false,
    });
    file.associate = function (models) {
        file.belongsTo(models.board, {
            foreignKey: 'board_id',
        });
    };
    return file;
};
