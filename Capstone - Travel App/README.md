# Capstone - Travel App

## Overview
This project requires me to create an asynchronous web app that uses Web API and user data to dynamically update the UI. It's my first dive into [node.js](https://nodejs.org/en/).

## Project Rubric
Some key rubrics include
- Create API credentials on OpenWeatherMap.com.
- There should be a GET route setup on the server side with the first argument as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.
- There should be an asynchronous function to fetch the data from the app endpoint
- You should be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function. The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.
- Adds an event listener to an existing HTML button from DOM using Vanilla JS. In the file `app.js`, the element with the id of generate should have an `addEventListener()` method called on it, with `click` as the first parameter, and a named callback function as the second parameter.
- Sets the properties of existing HTML elements from the DOM using Vanilla JavaScript. Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their `innerHTML` properties dynamically set according to data returned by the app route.

