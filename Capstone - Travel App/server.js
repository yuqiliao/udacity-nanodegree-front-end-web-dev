// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
app.use(express.static('website'));

const port = 3000;

// Setup Server
const server = app.listen(port, () => {
    console.log(`this is working! the server is running on localhost: ${port}`)
});

// GET method route
app.get("/database", function(req, res){
    // console.log(req);
    res.send(projectData);
});

// POST method route

app.post("/addData", function(req, res){

    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userFeeling'] = req.body.userFeeling;

    res.send(projectData);

    console.log(projectData);
});





