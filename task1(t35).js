//const fetch = require('node-fetch'); //not supported in the browser.


async function getCityInfo(cityName) {
  try {
    //Make a GET request to the GeoDB API to retrieve city information
    const cityResponse = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${cityName}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': 'a03af79a93mshcb9d81d403c7c46p17b3ddjsn12b5e3582af1'
      }
    });
    //Parse the JSON response from the API
    const cityData = await cityResponse.json();
    console.log(JSON.stringify(cityData)); //inspect the structure of the API response and determine if it is in the expected format and if the relevant information is accessible.
    //Extract the population and elevation from the city data
    const population = cityData.data[0].population;
    const elevation = cityData.data[0].elevation;
    console.log(`Population: ${population}`);
    console.log(`Elevation: ${elevation}`);

    //Extract the latitude and longitude from the city data
    const lat = cityData.data[0].latitude;
    const lon = cityData.data[0].longitude;
    const weatherResponse = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely?lat=${lat}&lon=${lon}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': 'a03af79a93mshcb9d81d403c7c46p17b3ddjsn12b5e3582af1'
      }
    });
    
    //Parse the JSON response from the API
    const weatherData = await weatherResponse.json();
    //Extract the temperature from the weather data
    const temperature = weatherData.data[0].temp;
    console.log(`Temperature: ${temperature}`);
  } catch (error) {
    //Handle any errors that occur during the API requests
    console.error(`Error: ${error}`);
  }
}
//Call the getCityInfo function with the city name 'Johannesburg'
getCityInfo('Johannesburg');

