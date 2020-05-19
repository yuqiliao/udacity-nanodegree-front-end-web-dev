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


function storeResultHTML(d){
const resultHTML = 
`<div class="card">
    <p class= "resultTitle">Result Snapshot</p>
    <ul>
        <li><span class="bold">Polarity</span>: ${d.polarity}</li>
        <li><span class="bold">Polarity Confidence</span>: ${(d.polarity_confidence).toFixed(3)}</li>
        <li><span class="bold">Subjectivity</span>: ${d.subjectivity}</li>
        <li><span class="bold">Subjectivity Confidence;</span>: ${(d.subjectivity_confidence).toFixed(3)}</li>
    </ul>
    <p class = "resultTitle">Text Analysed</p>
    <p>${d.text}</p>
</div>`;
return resultHTML;
}


function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formInput = document.getElementById('name').value

    // Validate user input, and get an object in return
    let data = Client.checkUserInput(formInput)

    console.log(data)
    console.log(data.error)
    console.log(data.url)
    if(data.error !== undefined){
        //aka if user types an invalid URL
        document.getElementById('message').innerHTML = data.error
    } else {
        //otherwise, proceed
        // Send the object to aylien API
        console.log("::: Form Submitted :::")
        postData('/addData', data)
            .then(function(res) {
                console.log(res)

                if(res.text === ""){
                    //sometimes res.text is an empty string, throw out a warning
                    res.text = "No meaningful text detected, please interpret the results above with caution."
                }
                document.getElementById('results').innerHTML = storeResultHTML(res) 

            })
    }
    
    


    //Get from sever the processed aylien info
    
        // .then(function(res){
        //     console.log(res.json())
        //     return res.json()
        // })
    //.then(res => res.json())
    // .then(function(res) {
    //     console.log(res)
    //     document.getElementById('results').innerHTML = res.message
    // })
}

export { handleSubmit }
