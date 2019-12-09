const Product = require("../models/product");

const filterObj = (object, values) => {
  const result = {};

  values.forEach(e => {
    if (object.hasOwnProperty(e)) {
      result[e] = object[e];
    }
  });

  return result;
};

const formatDevice = async device => {
  if (device.zeroWeight) {
    device.currentWeight -= device.zeroWeight;
  }

  const formattedDevice = device.toObject();
  formattedDevice.product = await Product.findById(device.productId).exec();

  return formattedDevice;
};

module.exports = { filterObj, formatDevice };
