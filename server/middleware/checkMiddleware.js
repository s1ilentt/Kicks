// Import
const jwt = require('jsonwebtoken');

// Function return middleware
module.exports = function(role) {
	return function(req, res, next) {
		// Only post,get,delete
		if (req.method === "OPTIONS") {
			next();
		}
		try {
			const token = req.headers.authorization.split(' ')[1]; // We get token from the header after bearer
			if (!token) {
				return res.status(401).json({message: "Not authorization"});
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY); // Check the token for validity
			// Validate role
			if (decoded.role !== role) {
				return res.status(403).json({message:"Not access"});
			}
			req.user = decoded; // We place the data in user
			next();
		} catch (e) {
			res.status(401).json({message: "Not authorization"});
		}
	}
}