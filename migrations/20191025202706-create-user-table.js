
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['customer', 'driver'],
      defaultValue: 'customer',
    },
    phone: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['verified', 'unverified', 'suspended'],
      defaultValue: 'unverified',
    },
    facebook_id: {
      type: Sequelize.STRING,
    },
    google_id: {
      type: Sequelize.STRING,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    image_url: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
