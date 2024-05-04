// Import 
const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);// User router
router.use('/type', typeRouter);// Type router
router.use('/brand', brandRouter);// Brand router
router.use('/product', productRouter);// Product router

// Export
module.exports = router


