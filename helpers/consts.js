module.exports = {
  REGEX_MAC_ADRESS: /^([0-9A-F]{2}-){5}([0-9A-F]{2})$/,
  REGEX_NO_SPECIAL_CHARACTERS: /^[a-zA-Z\d]+(([',. -][a-zA-Z \d])?[a-zA-Z\d]*)*$/,
  REGEX_EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  REGEX_PHONE_NUMBER: /^\+?[0-9]{8,12}$/
};
