const express = require('express');
const router = express.Router();

const deviceRoutes = require('./device');
// const userRoutes = require('./user');
// const productRoutes = require('./product');
// const measureRoutes = require('./measure');

router.use('/device', deviceRoutes);
// router.use('/user', userRoutes);
// router.use('/product', productRoutes);
// router.use('/measure', measureRoutes);

module.exports = router;
