const express = require('express');
const router = express.Router();

const deviceRoutes = require('./device.routes');
const measureRoutes = require('./measure.routes');
const userRoutes = require('./user.routes');
// const productRoutes = require('./product');

router.use('/device', deviceRoutes);
router.use('/measure', measureRoutes);
router.use('/user', userRoutes);
// router.use('/product', productRoutes);

module.exports = router;
