export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your username',
      },
      unique: {
        args: true,
        msg: 'username already exists',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    google_id: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('customer', 'driver'),
      defaultValue: 'customer',
    },
    status: {
      type: DataTypes.ENUM('verified', 'unverified', 'suspended'),
      defaultValue: 'unverified',
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    // User.hasOne(models.Profile, {
    //   foreignKey: 'user_uuid',
    //   as: 'profile',
    //   onDelete: 'CASCADE',
    // });
  };
  return User;
};
