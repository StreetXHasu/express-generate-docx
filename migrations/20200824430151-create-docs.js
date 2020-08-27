'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Docs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      docs_groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'Docs_groups',
          key: 'id',
          as: 'docs_groupId',
        },
      },
      name: {
        type: Sequelize.STRING
      },
      disc: {
        type: Sequelize.TEXT
      },
      data: {
        type: Sequelize.TEXT
      },
      format: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.INTEGER
      },
      hide: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Docs');
  }
};