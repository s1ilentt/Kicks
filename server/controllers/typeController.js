// Import
const { Type, Product } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
	async create(req, res) {
		const { name } = req.body; // From the body of the request, we extract a name of type
		const type = await Type.create({ name }); // Create type
		return res.json(type);
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params; // We get product ID from request parameters
			const type = await Type.findOne({ where: { id } });
			if (!type) {
				return next(ApiError.badRequest('Brand not found')); // If no brand found, throw an error
			}

			const products = await Product.findAll({ where: { typeId: id } });

			if (products.length > 0) {
				return next(ApiError.badRequest('Cannot delete type. Products with this type exist.'));
			}

			await Type.destroy({ where: { id } }); // Delete the brand
			return res.json({ message: 'Type deleted successfully' }); // Send success response
		} catch (error) {
			return next(ApiError.internal(error.message)); // Send error response if something goes wrong
		}
	}

	async getAll(req, res) {
		const types = await Type.findAll(); // Get all types
		return res.json(types); // Return the array of types to client 
	}

}

// Export new object this class
module.exports = new TypeController();