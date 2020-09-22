module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        nickname: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
  }),

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
  };
