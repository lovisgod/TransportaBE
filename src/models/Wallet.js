export default (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    balance: DataTypes.FLOAT,
    refrence_id: DataTypes.STRING,
  }, {});
  // Wallet.associate = (models) => {
  //   Profile.belongsTo(models.User, {
  //     onDelete: 'CASCADE',
  //     foreignKey: 'user_uuid',
  //   });
  // };
  return Wallet;
};
