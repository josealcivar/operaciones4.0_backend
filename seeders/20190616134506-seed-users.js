'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
         */
      return queryInterface.bulkInsert('Usuarios', [{
        username: 'arie',
        password: '1234',
        tipo: 'SUPERADMIN',
        estado:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
 
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
