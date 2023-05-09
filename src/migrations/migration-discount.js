// "use strict";
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("Discount", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       percent: {
//         type: Sequelize.DOUBLE,
//       },
//       date_start: {
//         type: Sequelize.DATE,
//       },
//       date_end: {
//         type: Sequelize.DATE,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//       },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable("Discount");
//   },
// };
