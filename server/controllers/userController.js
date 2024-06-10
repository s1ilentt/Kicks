// Import
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');

// Function for genarate jwt token
const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id, email, role },
		process.env.SECRET_KEY,
		{expiresIn: '24h'}, // Time life token
	)
}

// Create class for user
class UserController {
	// Function for reg
	async registration(req, res, next) {
		const {email, password, role} = req.body; // Get data with query
		if(!email || !password) {
			return next(ApiError.badRequest('Incorrect email or password'));
		}
		const candidate = await User.findOne({where: {email}}); // Validate user's existence
		if (candidate) {
			return next(ApiError.badRequest('User with such an email already exists'));
		}
		const hashPassword = await bcrypt.hash(password, 5); // Heshing password
		const user = await User.create({email, role, password: hashPassword}); // Create user
		const basket = await Basket.create({userId: user.id}); // Create basket with id user
		const token = generateJwt(user.id, user.email, user.role); // Generate token
		return res.json({token, message: 'Account creation is complete'}); // Return jwt token on client
	}

	// Function for login
	async login(req, res, next) {
		const {email, password} = req.body; // Get data with request
		const user = await User.findOne({where: {email}}); // Search for user by id
		if (!user) {
			return next(ApiError.internal('User not find'));
		}
		let comparePassword = bcrypt.compareSync(password, user.password); // Check the password for compliance
		if (!comparePassword) {
			return next(ApiError.internal('Entered incorrect password'));
		}
		const token = generateJwt(user.id, user.email, user.role); // Generate token
		return res.json({token}); // Return jwt token on client
	}

	// Redeving token for permanent use
	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role); // Generate token
		return res.json({token}); // Return jwt token on client
	}
}

// Export new object this class
module.exports = new UserController();