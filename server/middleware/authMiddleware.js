// Import
const jwt = require('jsonwebtoken');
const process = require('../config.json');

module.exports = function(req, res, next) {
	// Only post,get,delete
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // We get token from the header after bearer
		if (!token) {
			return res.status(401).json({message: "Not authorization"});
		}
		const decoded = jwt.verify(token, process.SECRET_KEY); // Check the token for validity
		req.user = decoded; // We place the data in user
		next();
	} catch (e) {
		res.status(401).json({message: "Not authorization"});
	}
}