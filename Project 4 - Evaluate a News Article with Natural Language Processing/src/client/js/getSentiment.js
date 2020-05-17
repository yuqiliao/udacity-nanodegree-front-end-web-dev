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
        //const newData = await res.json();
        const newData = await res.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error); 
      }
  }


function getSentiment(textInput) {
    console.log(textInput);
    postData('/addData', {url: textInput})
    
}


export { getSentiment }