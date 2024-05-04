'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Delete existing restrictions
		await queryInterface.removeConstraint('products', 'products_typeId_fkey');
		await queryInterface.removeConstraint('products', 'products_brandId_fkey');

		// Add restrictions again with the new RESTRICT removal method
		await queryInterface.addConstraint('products', {
			fields: ['typeId'],
			type: 'foreign key',
			name: 'products_typeId_fkey',
			references: {
				table: 'types',
				field: 'id'
			},
			onDelete: 'RESTRICT'
		});

		await queryInterface.addConstraint('products', {
			fields: ['brandId'],
			type: 'foreign key',
			name: 'products_brandId_fkey',
			references: {
				table: 'brands',
				field: 'id'
			},
			onDelete: 'RESTRICT'
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Delete the restrictions again created
		await queryInterface.removeConstraint('products', 'products_typeId_fkey');
		await queryInterface.removeConstraint('products', 'products_brandId_fkey');

		// Add restrictions again with the previous method of removal CASCADE
		await queryInterface.addConstraint('products', {
			fields: ['typeId'],
			type: 'foreign key',
			name: 'products_typeId_fkey',
			references: {
				table: 'Types',
				field: 'id'
			},
			onDelete: 'CASCADE'
		});

		await queryInterface.addConstraint('products', {
			fields: ['brandId'],
			type: 'foreign key',
			name: 'products_brandId_fkey',
			references: {
				table: 'Brands',
				field: 'id'
			},
			onDelete: 'CASCADE'
		});
	}
};
