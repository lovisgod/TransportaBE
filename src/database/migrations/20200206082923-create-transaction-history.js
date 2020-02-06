export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transaction_history', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    user_uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      unique: true,
    },
    ride_uuid: {
      type: Sequelize.UUID,
    },
    amount: {
      type: Sequelize.STRING,
    },
    customer_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('Transaction_history'),
};
