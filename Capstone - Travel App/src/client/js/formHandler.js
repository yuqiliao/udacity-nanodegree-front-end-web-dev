/* Function to POST combined data to server */
const postData = async ( url = '', data = {})=>{
    //console.log(data)
      const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
`<div class="resultTable">

    <table class="tg">
        <thead>
            <tr>
                <th class="tablerow" colspan="2"><span >Result Snapshot</span></th>
            </tr>
        </thead>
        
        <tbody>
            <tr>
                <td class="stub">Polarity</td>
                <td class="result">${d.polarity}</td>
            </tr>
            <tr>
                <td class="stub">Polarity Confidence</td>
                <td class="result">${(d.polarity_confidence).toFixed(3)}</td>
            </tr>
            <tr>
                <td class="stub">Subjectivity</td>
                <td class="result">${d.subjectivity}</td>
            </tr>
            <tr>
                <td class="stub">Subjectivity Confidence</td>
                <td class="result">${(d.subjectivity_confidence).toFixed(3)}</td>
            </tr>
            <tr>
                <td class="tablerow" colspan="2"><span>Text Analysed</span></td>
            </tr>
            <tr>
                <td class="result" colspan="2">${d.text}</td>
            </tr>
        </tbody>
    </table>
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
        postData('http://localhost:3000/addData', data)
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
