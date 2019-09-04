export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
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
    isAdmin: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  return User;
};
