const HttpStatus = require("http-status-codes");

const Device = require("../models/device");
const Measure = require("../models/measure");
const { filterObj } = require("../helpers/utils");

/* 
  Creates new device
  Method: POST
  Url: api/device
  Body example: 
  {
    "mac": "12-12-00-AA-00-00",
    "ownerId": 1,
    "currentWeight": 122,
    "name": "My device"
  } 
*/
async function createDevice(req, res, next) {
  const { mac, name, ownerId, currentWeight } = req.body;

  try {
    const createdDevice = new Device({
      mac,
      ownerId,
      name: name || "No name",
      currentWeight
    });

    const createdDevice = await createdDevice.save();

    res.json({
      createdDevice
    });
  } catch (e) {
    next(e);
  }
}

/*
  Updates a device's current weight and makes a record about it
  Method: PATCH
  Url: api/device/:id/weight
  Body example: 
  {
    "currentWeight": 240.4
  }
*/
async function updateCurrentDeviceWeight(req, res, next) {
  let body = req.body;

  try {
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    // Updateing currentWeight column
    const currentWeight = body.currentWeight;

    if (currentWeight <= 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "CurrentWeight should be presented!" });
    }

    const oldDevice = { _id: req.params.id };
    const updatedDevice = { currentWeight };

    const deviceAfterUpdate = await Device.findOneAndUpdate(oldDevice, updatedDevice).exec();

    if (!deviceAfterUpdate) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "KiLo with that id is not found" });
    }

    // Making a record in Measures collection
    const { id, productId } = deviceAfterUpdate;

    const newMeasure = {
      value: currentWeight,
      deviceId: id
    };

    if (productId) {
      newMeasure.productId = productId;
    }

    const createdMeasure = await Measure.create(newMeasure);

    return res.json({
      message: "Current weight was successfully updated",
      createdMeasure
    });
  } catch (e) {
    next(e);
  }
}

/*
  Gets all devices
  Method: GET
  Url: api/device
*/
async function getAllDevices(req, res, next) {
  try {
    const devices = await Device.find().exec();

    const resultDevices = devices.map(device => {
      if (device.zeroWeight) {
        device.currentWeight -= device.zeroWeight;
      }

      return device;
    });

    res.json(resultDevices);
  } catch (e) {
    next(e);
  }
}

/*
  Gets a device by its id
  Method: GET
  Url: api/device/:id
*/
async function getDeviceById(req, res, next) {
  const id = req.params.id;

  try {
    const foundDevice = await Device.findOne({ _id: id }).exec();

    if (!foundDevice) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "Product is not found"
      });
    }

    return res.json(foundDevice);
  } catch (e) {
    next(e);
  }
}

/*
  Updates a device
  Method: PATCH
  Url: api/device/:id
  Body example: 
  {
    "name": "Device name",
    "product": "Coca-cola"
    "productId": 1,
    "maxWeight": 1000,
    "zeroWeight": 150,
    "alertOn": 10
  }
*/
async function updateDevice(req, res, next) {
  try {
    const oldDevice = { _id: req.params.id };
    const updatedDevice = filterObj(req.body, [
      "name",
      "product",
      "productId",
      "maxWeight",
      "zeroWeight",
      "alertOn"
    ]);

    const deviceAfterUpdate = await Device.findOneAndUpdate(oldDevice, updatedDevice).exec();

    if (!deviceAfterUpdate) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "KiLo with that id is not found" });
    }

    return res.json({
      message: "Succesfully saved",
      deviceAfterUpdate
    });
  } catch (e) {
    next(e);
  }
}

/*
  Returns a time in seconds from last device's lastCheck update
  Method: GET
  Url: api/device/:id/lastCheck
*/
async function getDeviceConnectionStatus(req, res, next) {
  try {
    const device = await Device.findOne({ _id: req.params.id }).exec();

    if (!device) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "KiLo with that id is not found" });
    }

    return res.json({
      timeFromLastUpdate: Math.abs(new Date() - device.lastCheck) / 1000
    });
  } catch (e) {
    next(e);
  }
}

/*
  Updates a device lastCheck property
  Method: PATCH
  Url: api/device/:id/lastCheck
  Body example: 
  {
    "name": "Device name",
    "currentWeight": 240.4,
    "productId": 1,
    "maxWeight": 1000,
    "zeroWeight": 150,
    "alertOn": 10
  }
*/
async function updateDeviceConnectionStatus(req, res, next) {
  try {
    const deviceAfterUpdate = await Device.findOneAndUpdate(
      { _id: req.params.id },
      {
        lastCheck: new Date().toISOString()
      }
    ).exec();

    if (!deviceAfterUpdate) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "KiLo with that id is not found" });
    }

    return res.json({
      message: "Connection status successfully updated"
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createDevice,
  updateCurrentDeviceWeight,
  getAllDevices,
  getDeviceById,
  updateDevice,
  getDeviceConnectionStatus,
  updateDeviceConnectionStatus
};
