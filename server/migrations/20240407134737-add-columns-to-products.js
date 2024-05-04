'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('products', 'gender', {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'unknown'
		});

		await queryInterface.addColumn('products', 'size', {
			type: Sequelize.ARRAY(Sequelize.INTEGER),
			allowNull: false,
			defaultValue: [0]
		});

		await queryInterface.addColumn('products', 'color', {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'black'
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('products', 'gender');
		await queryInterface.removeColumn('products', 'size');
		await queryInterface.removeColumn('products', 'color');
	}
};