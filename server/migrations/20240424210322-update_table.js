'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint('Products', {
			fields: ['typeId'],
			type: 'foreign key',
			name: 'products_type_id_fk',
			references: {
				table: 'Types',
				field: 'id'
			},
			onDelete: 'RESTRICT'
		});

		await queryInterface.addConstraint('Products', {
			fields: ['brandId'],
			type: 'foreign key',
			name: 'products_brand_id_fk',
			references: {
				table: 'Brands',
				field: 'id'
			},
			onDelete: 'RESTRICT'
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint('Products', 'products_type_id_fk');
		await queryInterface.removeConstraint('Products', 'products_brand_id_fk');
	}
};

