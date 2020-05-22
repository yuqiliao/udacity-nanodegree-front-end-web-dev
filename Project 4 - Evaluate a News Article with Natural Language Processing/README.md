# Evaluate a News Article with Natural Language Processing

## Overview
This project requires me to create an asynchronous web app that uses Web API and user data to dynamically update the UI. It's my first dive into [node.js](https://nodejs.org/en/).

This project requires me to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. Using an exciting new api called [Aylien](https://aylien.com/), I build a simple web interface to interact with their NLP system. Users could input the URL of a website, after which this tool will provide pertinent information about the text in the URL, like whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

[Node](https://nodejs.org/en/) and [express](https://expressjs.com/) are used as the webserver and routing, and [webpack](https://webpack.js.org/) is used as the build tool, using which I set up the app to have dev and prod environments, each with their own set of tools and commands. I also used [Jest](https://jestjs.io/) to handle testing, and set up [service workers](https://codelabs.developers.google.com/codelabs/workbox-lab/#5) for offline support.

The goal of this project is for me to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Getting started
1. Install the required packages: 
    ```
    $ npm install
    ```
2. Create your credentials for Aylien on https://developer.aylien.com/signup 
3. Create a .env file on the root of the project and enter your ID and key :
    ```
    API_ID=**************************
    API_KEY=**************************
    ```
4. Run the build : 
    ```
    $ npm run build-prod
    ```
5. Run the server:
    ```
    $ npm start
    ```
6. Run the tests: 
    ```
    $ npm run test
    ```
