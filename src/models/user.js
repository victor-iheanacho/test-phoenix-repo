export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  return User;
};
