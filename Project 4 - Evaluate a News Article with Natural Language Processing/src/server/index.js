/*set up dotenv*/
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv')
dotenv.config()

/*set up aylien*/
//https://docs.aylien.com/
var aylien = require('aylien_textapi')
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });



/*set up express*/
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

// Middleware
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    console.log(`Your API key is ${process.env.API_KEY}`);
})


console.log(__dirname) //ask why this is not printed in the server console?


// GET method route
var path = require('path')

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.send("hello wol")
    // console.log(path)
    // console.log(path.resolve('src/client/views/index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})


const mockAPIResponse = require('./mockAPI.js')

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


// POST method route
app.post("/addData", function(req, res){
    // console.log(projectData)
    // console.log(req.body.url)
    //projectData['url'] = req.body
    // console.log(req.body)
    // console.log(Object.values(req.body))
    const userURL = Object.values(req.body)
    // feed url to aylien api

    textapi.sentiment({
        url: userURL,
        mode: 'document'
        }, function(error, response) {
        if (error === null) {
            //console.log(response);
            res.send(response)
        } else {
            //console.log(error);
            res.send({error: "#_# Something is wrong, please try a different URL"})
        }
    });

    // res.send(projectData);

    // console.log(projectData);
});

