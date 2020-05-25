/*set up dotenv*/
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv')
dotenv.config()

const openWeatherMapApiKey = process.env.OpenWeatherMap_API_KEY;


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


////Get weather data - using OpenWeatherMap API (api documentation: https://openweathermap.org/current)
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

//Define getWeatherData function to GET data from OpenWeather API
const fetch = require("node-fetch");
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+",us&units=imperial"+"&appid="+apiKey);
    try {
        const data = await res.json();
        console.log("this is a test printout from getWeatherData"+data.main.temp);
        return data.main.temp;
    } catch (error) {
        console.log("error:", error);
    }
}

app.post("/userZipCode", function(req, res){

    // get user input of zipcode sent from client side
    const zipCode = req.body.zipCode
    
    // call weather API to get weather data
    getWeatherData(baseURL, zipCode, openWeatherMapApiKey)
        .then(function(data){
            console.log({temperature: data})
            res.send({temperature: data});
        })
});



