const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "leeandri",
    isWeatherActive: true,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "leeandri",
    isAboutActive: true,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Welcome to the Help section!",
    name: "leeandri",
    isHelpActive: true,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, meteoData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        res.send({
          address: req.query.address,
          location,
          weatherIcon: meteoData.weatherIcon,
          weatherDescription: meteoData.weatherDescription,
          temperature: meteoData.temperature,
          precip: meteoData.precip,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    errorMessage: "Help article not found.",
    name: "leeandri",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "leeandri",
  });
});

app.listen(8000, () => {
  console.log("Server is up on port 8000.");
});
