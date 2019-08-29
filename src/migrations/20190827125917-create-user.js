module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: true,
      },
    },
    userName: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false,
      validate: {
        notNull: true,
      },
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: true,
      },
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: true,
      },
    },
    lastLogin: {
      allowNull: true,
      type: Sequelize.DATE
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
      }
    },
    phoneNumber: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: true,
      },
    },
    isAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      validate: {
        notNull: true,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
