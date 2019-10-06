const filterObj = (object, values) => {
  const result = {};

  values.forEach(e => {
    if (object.hasOwnProperty(e)) {
      result[e] = object[e];
    }
  });

  return result;
};

module.exports = { filterObj };
