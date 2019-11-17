const express = require('express');
const router = express.Router();

const deviceRoutes = require('./device');
const measureRoutes = require('./measure');
const userRoutes = require('./user');
// const productRoutes = require('./product');

router.use('/device', deviceRoutes);
router.use('/measure', measureRoutes);
router.use('/user', userRoutes);
// router.use('/product', productRoutes);

module.exports = router;
