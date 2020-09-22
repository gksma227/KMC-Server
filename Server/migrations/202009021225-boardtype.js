module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('boardtype', {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        typename: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
  }),

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('boardtype'),
  };
