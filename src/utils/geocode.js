const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.maptiler.com/geocoding/" +
    encodeURIComponent(address) +
    ".json?key=IJ2Zjb9lbGcdlHQrXD6s&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1].toFixed(4),
        longitude: body.features[0].center[0].toFixed(4),
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
