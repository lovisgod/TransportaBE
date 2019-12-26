export default (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_uuid: DataTypes.UUID,
    driver_uuid: DataTypes.UUID,
    pickup: DataTypes.STRING,
    destination: DataTypes.STRING,
    distance: DataTypes.STRING,
    price: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('booked', 'accepted', 'completed', 'canceled'),
      defaultValue: 'booked',
    },
    trip_rounds: DataTypes.STRING,
    time: DataTypes.STRING,
  }, {});
  Ride.associate = (models) => {
    // Ride.belongsTo(models.User, {
    //   onDelete: 'CASCADE',
    //   foreignKey: 'user_uuid',
    //   targetKey: 'uuid',
    // });
    // Ride.belongsTo(models.User, {
    //   onDelete: 'CASCADE',
    //   foreignKey: 'user_uuid',
    //   targetKey: 'user_uuid',
    // });
  };
  return Ride;
};
