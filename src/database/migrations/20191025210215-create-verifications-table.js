module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Verifications', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    uuidtoken: {
      type: Sequelize.STRING,
    },
    numbertoken: {
      type: Sequelize.STRING,
    },
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('Verifications'),
};
