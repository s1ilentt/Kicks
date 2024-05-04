const { Brand, Product } = require('../models/models');
const ApiError = require('../error/ApiError');


class BrandController {
	async create(req, res) {
		const { name } = req.body; // From the body of the request, we extract a name of brand
		const brand = await Brand.create({ name }); // Create brand
		return res.json(brand);
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params; // We get product ID from request parameters
			const brand = await Brand.findOne({ where: { id } });
			if (!brand) {
				return next(ApiError.badRequest('Brand not found')); // If no brand found, throw an error
			}

			const products = await Product.findAll({ where: { brandId: id } });

			if (products.length > 0) {
				return next(ApiError.badRequest('Cannot delete brand. Products with this brand exist.'));
			}

			await Brand.destroy({ where: { id } }); // Delete the brand
			return res.json({ message: 'Brand deleted successfully' }); // Send success response
		} catch (error) {
			return next(ApiError.internal(error.message)); // Send error response if something goes wrong
		}
	}

	async getAll(req, res) {
		const brands = await Brand.findAll(); // Get all brands
		return res.json(brands); // Return the array of brands to client 
	}

}

module.exports = new BrandController();