/* eslint-disable camelcase */
export default (sequelize, DataTypes) => {
  const Verifications = sequelize.define('Verifications', {
    user_id: {
      type: DataTypes.UUID,
    },
    uuidtoken: {
      type: DataTypes.STRING,
    },
    numbertoken: {
      type: DataTypes.STRING,
    },
    createdAT: {
      type: 'TIMESTAMP',
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  Verifications.associate = (models) => {
    // associations can be defined here
    // User.hasOne(models.Profile, {
    //   foreignKey: 'user_uuid',
    //   as: 'profile',
    //   onDelete: 'CASCADE',
    // });
  };
  return Verifications;
};
