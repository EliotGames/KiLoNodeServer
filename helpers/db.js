const uuidv4 = require("uuid/v4");

// generates unique ID for collection
const getIdValue = () => uuidv4().substr(-5);

module.exports = {
  getIdValue
};
