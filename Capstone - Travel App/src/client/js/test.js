describe("default city picture", () => {

    test('user has NOT entered the city name', () => {
        // get user input of cityName
        const userCityName = document.querySelector('#city').value;
        if(userCityName === ""){
            //if there's no user input, the default picture should be loaded
            const cityPicURL = document.querySelector('#cityPic').innerHTML
            expect(cityPicURL).toStrictEqual('<img src="https://cdn.pixabay.com/photo/2017/01/16/15/51/hiker-1984421_960_720.jpg" alt="destination city picture">');
        } 
      
    });
  })
