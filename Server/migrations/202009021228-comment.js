module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('comment', {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        c_userid: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'user', key: 'id'}
        },
        c_contents: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        c_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        c_recommend: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        c_boardid: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'board', key: 'id'}
        },
  }),
  
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('comment'),
  };