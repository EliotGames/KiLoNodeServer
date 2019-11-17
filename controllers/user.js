const HttpStatus = require("http-status-codes");

const User = require("../models/user");
const Device = require("../models/device");
const { filterObj } = require("../helpers/utils");

/* 
  Creates new user
  Method: POST
  Url: api/user/register
  Body example: 
  {
    "email": "example@gmail.com",
    "password": "123456",
    "phone": "+380987654321",
    "firstName": "Test",
    "lastName": "User"
  } 
*/
async function createItem(req, res, next) {
  const userData = filterObj(req.body, ["email", "phone", "firstName", "lastName", "password"]);

  const newUser = new User(userData);

  try {
    const user = await User.findOne({ email: userData.email });

    if (user) {
      return res.status(400).json({
        meassage: "User with that email already exists"
      });
    }

    const result = await newUser.save();

    return res.json({
      createdUser: result
    });
  } catch (e) {
    next(e);
  }
}

/* 
  Logs in user
  Method: POST
  Url: api/user/login
  Body example: 
  {
    "email": "example@gmail.com",
    "password": "123456",
    "deviceId": "uf200"
  }
*/
async function loginUser(req, res, next) {
  try {
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { email, password, deviceId } = body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "User with that email not found" });
    }

    foundUser.comparePassword(password, async (err, isMatch) => {
      if (err) {
        throw err;
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password!" });
      }

      // If body has deviceId, we link device to logged user
      if (deviceId) {
        const device = await Device.findById(deviceId);

        if (!device) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: "Device not found" });
        }

        if (device.ownerIds.indexOf(foundUser.id) !== -1) {
          return res.json({ message: "Device is already linked" });
        }

        await Device.findByIdAndUpdate(deviceId, {
          ownerIds: [foundUser.id, ...device.ownerIds]
        });

        return res.json({ message: "Device was linked to user" });
      }

      return res.json(foundUser);
    });
  } catch (error) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try {
    const docs = await User.find().exec();

    return res.json(docs);
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return next({
        status: HttpStatus.NOT_FOUND,
        message: "User is not found"
      });
    }

    return res.json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createItem,
  loginUser,
  getAll,
  getById
};
