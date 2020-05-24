// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();
// console.log(d);
// console.log(newDate);

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

function getData() {
    // get user input of zipcode
    const userZipCode = document.querySelector('#zip').value;

    // // get user input of feeling. if userFeeling is empty, get a reminder instead
    const userFeeling = (document.querySelector('#feelings').value === "") ? "Don't forget to fill in your feeling today!" : document.querySelector('#feelings').value;

    //send it to server to process
    postData("http://localhost:3000/userZipCode", {zipCode: userZipCode})
        .then(function(res){
            console.log(res)

        //update values with new entry
        document.querySelector('#userDate').innerHTML = newDate;
        document.querySelector('#userTemp').innerHTML = res.temperature;
        document.querySelector('#userFeeling').innerHTML = userFeeling;
        })
}

export{ getData }