module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('file', {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        board_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'board', key: 'id'}
        },
        file_path: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        file_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        file_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        file_size: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
  }),
  
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('file'),
  };