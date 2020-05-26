/*set up dotenv*/
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv')
dotenv.config()

const openWeatherMapApiKey = process.env.OpenWeatherMap_API_KEY;
const geoNamesApiID = process.env.geoNamesAPI_ID;
const weatherbitApikey = process.env.weatherbitAPI_KEY;

/*set up fetch to be used in API calls*/
const fetch = require("node-fetch");

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/*Dependencies*/
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

const port = 3000;

// Setup Server
const server = app.listen(port, () => {
    console.log(`this is working! the server is running on localhost: ${port}`)
});

// // GET method route
// app.get("/database", function(req, res){
//     // console.log(req);
//     res.send(projectData);
// });

// // POST method route

// app.post("/addData", function(req, res){

//     projectData['temperature'] = req.body.temperature;
//     projectData['date'] = req.body.date;
//     projectData['userFeeling'] = req.body.userFeeling;

//     res.send(projectData);

//     console.log(projectData);
// });


// ////Get weather data - using OpenWeatherMap API (api documentation: https://openweathermap.org/current)
// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// //Define getWeatherData function to GET data from OpenWeather API

// const getWeatherData = async (baseURL, zipCode, apiKey) => {
//     const res = await fetch(baseURL+zipCode+",us&units=imperial"+"&appid="+apiKey);
//     try {
//         const data = await res.json();
//         console.log("this is a test printout from getWeatherData"+data.main.temp);
//         return data.main.temp;
//     } catch (error) {
//         console.log("error:", error);
//     }
// }


////Get geo data - using geonames API (api documentation: http://www.geonames.org/export/geonames-search.html)
const geoNamesbaseURL = 'http://api.geonames.org/searchJSON?q={'

//Define getGeoData function to GET data from geoname API
const getGeoData = async (baseURL, cityName, apiID) => {
    const res = await fetch(baseURL+cityName+"}&maxRows=1&username="+apiID);
    try {
        const data = await res.json();
        //console.log(data)
        //console.log(data.geonames[0]);
        return data.geonames[0];
    } catch (error) {
        console.log("error:", error);
    }
}

app.post("/GeoNames", function(req, res){
    // get user input of zipcode sent from client side
    const cityName = req.body.cityName
    console.log(cityName)
    // call weather API to get weather data
    getGeoData(geoNamesbaseURL, cityName, geoNamesApiID)
        .then(function(data){
            console.log(data)
            res.send(data);
        })
});




////Get weather data - using weatherbit API (api documentation: https://www.weatherbit.io/api/weather-current)
const weatherbitCurrentBaseURL = 'https://api.weatherbit.io/v2.0/current?'

//Define getCurrentWeatherData function to GET data from geoname API
const getCurrentWeatherData = async (baseURL, lat, lon, apiKey) => {
    const res = await fetch(baseURL+"lat="+lat+"&lon="+lon+"&key="+apiKey);
    try {
        const data = await res.json();
        console.log(data.data[0])
        return data.data[0];
    } catch (error) {
        console.log("error:", error);
    }
}

app.post("/WeatherbitCurrent", function(req, res){
    // get user input of zipcode sent from client side
    
    const lat = req.body.lat
    const lon = req.body.lng
    console.log(lat,lon)
    // call weather API to get weather data
    getCurrentWeatherData(weatherbitCurrentBaseURL, lat, lon, weatherbitApikey)
        .then(function(data){
            res.send(data);
        })
});


////Get weather data - using weatherbit API (api documentation: https://www.weatherbit.io/api/climate-normals)
const weatherbitNormalBaseURL = 'https://api.weatherbit.io/v2.0/normals?'

//Define getCurrentWeatherData function to GET data from geoname API
const getNormalWeatherData = async (baseURL, lat, lon, startDay, endDay, apiKey) => {
    const res = await fetch(baseURL+"lat="+lat+"&lon="+lon+"&start_day="+startDay+"&end_day="+endDay+"&tp=daily&key="+apiKey);
    try {
        const data = await res.json();
        console.log(data.data[0])
        return data.data[0];
    } catch (error) {
        console.log("error:", error);
    }
}

app.post("/WeatherbitNormal", function(req, res){
    // get user input of zipcode sent from client side
    
    const lat = req.body.lat
    const lon = req.body.lng
    const userDate = req.body.userDate

    //userDay is a date in YYYY-MM-DD format entered by user. I need to add and substract 7 days to create startDay & endDay. Later I can use API to calculate aggregated stats historically in this day range.
    console.log(lat,lon, userDate)

    // call weather API to get weather data
    getNormalWeatherData(weatherbitNormalBaseURL, lat, lon, userDate, userDate, weatherbitApikey)
        .then(function(data){
            res.send(data);
        })
});
