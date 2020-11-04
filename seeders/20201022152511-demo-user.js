"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_login: "user1",
          user_password:
            "$2b$10$lrD3ejZhCFzRLriShHqbhOsoRgecehcuVT6WaDO/nUvkzVm/JIGfm",
          createdAt: "2020-10-22 15:30:13.712 +00:00",
          updatedAt: "2020-10-22 15:30:13.712 +00:00",
        },
        {
          user_login: "user2",
          user_password:
            "$2b$10$rXwtBnMOR.JbDUDwaj2WiuK/MdiJOizMa6hhqjEx2scdJB85XfJva",
          createdAt: "2020-10-22 15:30:13.712 +00:00",
          updatedAt: "2020-10-22 15:30:13.712 +00:00",
        },
        {
          user_login: "user3",
          user_password:
            "$2b$10$rIN1b08M4s8ln6naUTrBBe3NdgRF1Tb6K4/Ajk71X5qVD.vro84E6",
          createdAt: "2020-10-22 15:30:13.712 +00:00",
          updatedAt: "2020-10-22 15:30:13.712 +00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
