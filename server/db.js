const {Sequelize} = require('sequelize');
const process = require('./config.json');

// Export object from connection to database 
module.exports = new Sequelize (
	process.DB_NAME, // Name db
	process.DB_USER, // User
	process.DB_PASSWORD, // Password
	{
		dialect: 'postgres',
		host: process.DB_HOST, // Host
		port: process.DB_PORT, // Port
	}
)