const {Sequelize} = require('sequelize');

// Export object from connection to database 
module.exports = new Sequelize (
	process.env.DB_NAME, // Name db
	process.env.DB_USER, // User
	process.env.DB_PASSWORD, // Password
	{
		dialect: 'postgres',
		host: process.env.DB_HOST, // Host
		port: process.env.DB_PORT, // Port
	}
)