/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '1802912abfaa1ea29ddcf5d66c39e5e0';
//api documentation: https://openweathermap.org/current

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();
// console.log(d);
// console.log(newDate);


/* Function to GET data from OpenWeather API */
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+",us&units=imperial"+"&appid="+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data.main.temp;
    } catch (error) {
        console.log("error:", error);
    }
}




/* Function to POST combined data to server */
const postData = async ( url = '', data = {})=>{
    //console.log(data)
      const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
      try {
        //console.log(res);
        const newData = await res.json();
        //console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error); 
      }
  }


/* Function to GET combined data from server & update DOM*/
const updateDOM = async () => {
    
    const req = await fetch('/database');
    try {
        //console.log(req);
        const allData = await req.json();
        //console.log(allData);
        
        //update values with new entry
        document.querySelector('#userDate').innerHTML = allData.date;
        document.querySelector('#userTemp').innerHTML = allData.temperature;
        document.querySelector('#userFeeling').innerHTML = allData.userFeeling;
    
    } catch(error) {

        console.log('error', error);
    }
};


function getResults(event) {

    //event.preventDefault();

    // get user input of zipcode
    const userZipCode = document.querySelector('#zip').value;

    // get user input of feeling. if userFeeling is empty, get a reminder instead
    const userFeeling = (document.querySelector('#feelings').value === "") ? "Don't forget to fill in your feeling today!" : document.querySelector('#feelings').value;
    console.log(userFeeling);

    //get weather data
    getWeatherData(baseURL, userZipCode, apiKey)
        //combine weather data & other data; post to server
        .then(function(data) {
            // console.log(data);
    
            //if data is NA, meaning either users didn't input a zipcode, or the zipcode is wrong, either way, it resulted to the fact that data returned by `getWeatherData` is NA.
            if (isNaN(data)) {
                postData("/addData", {temperature: "Please enter a correct US zipcode to get weather data.", date: newDate, userFeeling: userFeeling});
            } else {
                postData("/addData", {temperature: data, date: newDate, userFeeling: userFeeling});
            }
            
            
        })
        //get data from server & update dom 
        .then(updateDOM);
}