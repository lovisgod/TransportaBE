export default (sequelize, DataTypes) => {
  const Transaction_history = sequelize.define('Transaction_history', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    amount: DataTypes.STRING,
    ride_uuid: DataTypes.UUID,
    customer_name: DataTypes.STRING,
  }, {
    underscored: true,
    freezeTableName: true,
  });
    // Transaction_history.associate = (models) => {
    //   Transaction_history.belongsTo(models.Ride, {
    //     onDelete: 'CASCADE',
    //     foreignKey: 'ride_uuid',
    //   });
    // };
  return Transaction_history;
};
