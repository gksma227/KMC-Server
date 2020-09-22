module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('board', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
      title: {
          type: Sequelize.STRING(255),
          allowNull: true,
      },
      userid: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'user', key: 'id' },
      },
      contents: {
          type: Sequelize.TEXT('medium'),
          allowNull: true,
      },
      register_date: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    views: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    recommend: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    boardtype_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'boardtype', key: 'id' },
    },
  }),

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('board'),
  };
