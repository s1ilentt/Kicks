// Import
const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create); //Method for create type with limited access 
router.get('/', typeController.getAll); //Method for get all type with limited access 
router.delete('/:id', checkRole('ADMIN'), typeController.delete); //Method for delete type with limited access 

module.exports = router