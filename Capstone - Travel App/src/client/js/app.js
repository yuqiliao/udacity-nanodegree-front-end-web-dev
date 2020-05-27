//// process date input
let today = new Date();

let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();
if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
today = yyyy+'-'+mm+'-'+dd;
// console.log(today)
document.getElementById("departureDate").setAttribute("min", today);


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

function displayResult(data){
  console.log("here's results!")
  console.log(data)

  const resultHTML =
  `<div id = "countdown"><span id = "city">${data.des.cityName}, ${data.des.countryName}</span> is <span id = "daysAway"></span> away!</div> 
  <div id = "temperature">
    Typical weather for then is: 
    <br>
    <span id = "tempHigh">High: ${data.data.max_temp} °C</span>, <span id = "tempLow">Low: ${data.data.min_temp} °C</span>, <span id = "temAvg">Average: ${data.data.temp}°C</span>
  </div>`
  document.getElementById('results').innerHTML = resultHTML 

}
  




function doSomething() {
    // get user input of cityName
    const userCityName = document.querySelector('#city').value;

    // // get user input of feeling. if userFeeling is empty, get a reminder instead
    //const userFeeling = (document.querySelector('#feelings').value === "") ? "Don't forget to fill in your feeling today!" : document.querySelector('#feelings').value;

    //send userCityName to geoNames API to get lat/lon info (process in the server)
    postData("http://localhost:3000/GeoNames", {cityName: userCityName})
        //GeoNames stats returned
        .then(function(res){
            console.log(res)
            //console.log({lng: res.lng, lat: res.lat})
            
          
            //get user inputed date (after the button click event)
            let userDate = document.getElementById('departureDate').value;
            
            //compare user inputed date and today
            let diffTime = Math.abs(new Date(userDate) - new Date(today));
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log("difference in userDate and today: " + diffDays + " days")

            //get user inputed date in the MM-DD format (for weatherbit API use)
            //console.log(userDate.slice(userDate.length - 5))
            let userDateMMDD = userDate.slice(userDate.length - 5)
            

            //if the departure date is less than 7 days away
            if(diffDays <= 7){
              //send it to weatherbitAPI to get CURRENT weather data
              return postData("http://localhost:3000/WeatherbitCurrent", {lng: res.lng, lat: res.lat, des: {cityName: res.name, countryName: res.countryName}})
              //weather data returned
              // .then(function(res){
              //   console.log(res);

              //   //display results
              //   displayResults(res)
                
              // })
              

            } else {//if the departure date more than 7 days in the future
              //send it to weatherbitAPI to get FUTURE weather data
              return postData("http://localhost:3000/WeatherbitNormal", {lng: res.lng, lat: res.lat, userDate: userDateMMDD, des: {cityName: res.name, countryName: res.countryName}})
              //weather data returned
              // .then(function(res){
              //   console.log(res);

              //   //display results
              //   displayResults(res)
              // })
            }


           


        //update values with new entry
        // document.querySelector('#userDate').innerHTML = newDate;
        // document.querySelector('#userTemp').innerHTML = res.temperature;
        // document.querySelector('#userFeeling').innerHTML = userFeeling;
        })
        ///
        .then(displayResult)
        
}

export{ doSomething }


