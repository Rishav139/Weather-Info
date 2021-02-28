const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var city = req.body.cityName;
  var country = req.body.countryName;
  var key = "8fea6bc81fb317c8aa796a1585c69d14";
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + key + "&units=metric";

  request(url, function(error, response, body) {

    res.set("Content-Type", "text/html");
    const weatherData = JSON.parse(body);

    res.write("<h3>City Name : " + city + "</h3>");
    res.write("<h3>County Name : " + country + "</h3>");

    const temp = (weatherData.main.temp);
    const des = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const visibility = parseInt(weatherData.visibility);
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<h4>The weather in " + city + " is " + des + "<h4>");
    res.write("<h4>Temperature :     " + temp + "&#8451;</h4>");
    res.write("<h4>Visibility : " + visibility/1000 + "km</h4>");
    res.write("<h4>Pressure :        " + pressure.toPrecision(5) + "hPa</h4>");
    res.write("<h4>Humidity :        " + humidity.toPrecision(4) + "%</h4>");
    res.write("<img src = " + imageURL + " >");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server running at 3000");
});
