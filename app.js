const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res) {
    const city = req.body.city;
    const apiKey = "";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    https.get(url, function(response) {
        console.log('Status code: ' + response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            const description = weatherData.weather[0].description;
            res.write("<h1>" + city + "</h1>")
            res.write("<h3>Temperature in celsius: " + temp + "</h3>");
            res.write("<h3>" + description + "</h3>");
            res.write("<img src="+ imageUrl + ">");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log('Server started on port 3000');
})
