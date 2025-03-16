const request = require("request");

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=11f92a2afc869eef014b7a1b1ad4aab8&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location. Please try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        weatherIcon: body.current.weather_icons[0],
        weatherDescription: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        precip: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
