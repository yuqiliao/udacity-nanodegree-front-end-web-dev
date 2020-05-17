function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // Client.checkForName(formText)
    Client.getSentiment(formText)

    console.log("::: Form Submitted :::")
    
    //Get from sever the processed aylien info
    fetch('http://localhost:8080/addData')
        .then(function(res){
            console.log(res.json)
            return res.json()
        })
    //.then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
