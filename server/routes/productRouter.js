// Import 
const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkMiddleware');

router.post('/', checkRole('ADMIN'), productController.create); //Method for create product with limited access 
router.put('/:id', checkRole('ADMIN'), productController.update); //Method for update product with limited access 
router.get('/', productController.getAll); //Method for get all product with general access 
router.get('/:id', productController.getOne); //Method for get one product with general access 
router.delete('/:id', checkRole('ADMIN'), productController.delete); // Method to delete a product with limited access 

module.exports = router
