// Imports
require('dotenv').config();
const express = require('express');
const models = require('./models/models');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

// Get a port from config or install 5000
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());// To be able to send requests from browser
app.use(express.json());// For parse JSON 
app.use(express.static(path.resolve(__dirname, 'static'))); //We indicate to the server that the files in this folder must be distributed as statics
app.use(fileUpload({})); // To work with files
app.use('/api', router);// Call main router for url api

// Processing error, last Middleware
app.use(errorHandler);

//Function for start app
const start = async () => {
	try {
		await sequelize.authenticate();// Connect database
		await sequelize.sync();// Checks the condition database
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
}

start();

