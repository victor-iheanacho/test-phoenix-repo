module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Wetravel',
          lastName: 'user1',
          email: 'wetravel.user1@gmail.com',
          password: 'password',
          phoneNumber: 12345678,
          id: 23,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'chidi',
          lastName: 'nma',
          email: 'chidimma@gmail.com',
          password: 'password65',
          phoneNumber: 12345678,
          id: 234,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
