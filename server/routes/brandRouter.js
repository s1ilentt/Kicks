// Import
const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create); //Method for create brand with limited access 
router.get('/', brandController.getAll); //Method for get all brand with general access
router.delete('/:id', checkRole('ADMIN'), brandController.delete); //Method for delete brand with limited access 

module.exports = router