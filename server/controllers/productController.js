// Import
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Product, ProductInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class ProductController {
	async create(req, res, next) {
		try {
			let { name, price, gender, size, color, brandId, typeId, info } = req.body; // Get data from the body of the request
			const { img } = req.files; // Get file
			size = size.split(','); // We turn into an array for the correct work
			let fileName = uuid.v4() + '.jpg'; // Create name for file
			img.mv(path.resolve(__dirname, '..', 'static', fileName)); // We transfer the file to the folder static
			const product = await Product.create({ name, price, gender, size, color, brandId, typeId, img: fileName }); // Create product, raiting default 0

			if (info) {
				info = JSON.parse(info); // Parse string in JS object
				info.forEach(i =>
					// Create object product info
					ProductInfo.create({
						title: i.title,
						description: i.description,
						productId: product.id
					})
				)
			}

			return res.json({
				product,
				message: 'Product create successfully'
			});
		} catch (e) {
			next(ApiError.badRequest(e.message)); // Processing error
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params; // We get a product identifier from the request parameters
			let { name, price, gender, size, color, brandId, typeId, info } = req.body; // We get data from the query body
			size = size.split(','); // We turn into an array for the correct work
			let image = null;
			if (req.files) {
				const { img } = req.files; // We get a file
				image = img;
			}

			// We check if there is a product with a given ID
			const product = await Product.findOne({ where: { id } });

			if (!product) {
				return next(ApiError.notFound(`Product with id ${id} not found`));
			}

			// We form a new file name for image
			const fileName = uuid.v4() + '.jpg';

			// If there is a new image, we move it to the static folder
			if (image) {
				const filePath = path.resolve(__dirname, '..', 'static', product.img); // We get the path to the file
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath); // We delete the file from the file system
				}

				image.mv(path.resolve(__dirname, '..', 'static', fileName));
			}

			// We update the product data
			await Product.update(
				{
					name,
					price,
					gender,
					size,
					color,
					brandId,
					typeId,
					img: image ? fileName : product.img // If there is a new image, we update the link to the image, otherwise we leave the old link
				},
				{ where: { id } }
			);

			// We update the product information if it is provided
			if (info) {
				info = JSON.parse(info);

				// We delete all existing records of product information
				await ProductInfo.destroy({ where: { productId: id } });

				// We create new records of product information
				info.forEach(i => ProductInfo.create({
					title: i.title,
					description: i.description,
					productId: id
				}));
			}

			// Return the updated product
			const updatedProduct = await Product.findByPk(id);

			return res.json({
				updatedProduct,
				message: 'Product updated successfully'
			});
		} catch (e) {
			next(ApiError.internal(e.message));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params; // We get product ID from request parameters
			const product = await Product.findOne({ where: { id } }); // НFind the product by ID

			if (!product) {
				return next(ApiError.badRequest(`Product not found`)); // If the product is not found, we return the error 404
			}

			const filePath = path.resolve(__dirname, '..', 'static', product.img); // We get the path to the file

			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath); // We delete the file from the file system
			}

			await Product.destroy({ where: { id } }); // We delete the product from the database

			return res.json({ message: `Product with id ${id} has been deleted` }); // Return the message about successful removal
		} catch (e) {
			next(ApiError.internal(e.message)); // We process the server error
		}
	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page, price, gender, size, color } = req.query; // We get from a query line
		page = page || 1; // Number current page
		limit = limit || 9; // Limit ptoduct on one page
		let offset = page * limit - limit; // We consider how many goods we need to skip to get to the current page
		let products;

		// We check whether filtering parameters have been transmitted
		if (!brandId && !typeId && !gender && !size && !color && !price && price !== 0) {
			// If there are no filtering parameters, we get all the goods
			products = await Product.findAndCountAll({ limit, offset });
		} else {
			// We form an object with the conditions for filtering
			const where = {};
			if (brandId) where.brandId = brandId;

			if (typeId && Array.isArray(typeId)) {
				where.typeId = { [Op.in]: typeId }; // Filtering by type, if an array of values ​​is transmitted
			} else if (typeId) {
				where.typeId = typeId; // filtering by type, if one value is transmitted
			}
			if (gender && Array.isArray(gender)) {
				where.gender = { [Op.in]: gender };  // Filtering by gender, if an array of values ​​is transmitted
			} else if (gender) {
				where.gender = gender; // Filtering by gender, if one value is transmitted
			}
			if (size && Array.isArray(size)) {
				where.size = { [Op.overlap]: size };  // Filtering by sizes, if an array of values ​​is transmitted
			} else if (size) {
				where.size = size; // Filtering by sizes, if one value is transmitted
			}
			if (color && Array.isArray(color)) {
				where.color = { [Op.in]: color };  // Filtering by color, if an array of values ​​is transmitted
			} else if (color) {
				where.color = color; // Filtering by color, if one value is transmitted
			}
			if (price !== undefined && price !== null) {
				where.price = {
					[Op.lte]: price // Specify the operator op.lte for filtering at a price that is less or equal to the specified upper border
				};
			}

			// We carry out a request taking into account filtering
			products = await Product.findAndCountAll({ where, limit, offset });
		}

		// Receipt of information about each product
		const productsWithInfo = await Promise.all(products.rows.map(async (product) => {
			const info = await ProductInfo.findAll({ where: { productId: product.id } });
			return {
				...product.toJSON(),
				info: info.map(i => i.toJSON())
			};
		}));

		return res.json({
			count: products.count,
			rows: productsWithInfo
		});
	}

	// Get one product
	async getOne(req, res) {
		const { id } = req.params; // Get id this product
		const product = await Product.findOne(
			{
				where: { id }, // Device search condition
				include: [{ model: ProductInfo, as: 'info' }] // Get an array of characteristics
			}
		)
		return res.json(product); // Return product
	}

}

module.exports = new ProductController();