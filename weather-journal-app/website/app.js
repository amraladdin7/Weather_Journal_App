/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const addURL = '&units=metric&appid=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = 'd00adc2659005a2bc48069118655cf6f';

/* Function to GET Web API Data*/
const getWeather = async (zipCode) => {
     const response = await fetch(baseURL + zipCode + addURL + apiKey);
     try {
          const data = await response.json();
          return data;
     } catch (error) {
          console.log('error', error);
     }
}

/* Function to POST data */
const postData = async (url, data) => {
     const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });

     try {
          const newData = await response.json();
          return newData;
     } catch (error) {
          console.log('error', error);
     }
}

/* Function to GET Project Data*/
const getData = async () => {
     const response = await fetch('/all');
     try{
          const data = await response.json();
          return data;
     }
     catch(error) {
          console.log('error:', error);
     }
     
}

//Function to get and update the new data
const getAndUpdateData = async () => {
getData()
.then (data => {
     document.getElementById('date').innerHTML = 'Today\'s date is: ' + data.date;
     document.getElementById('temp').innerHTML = 'The temperature now is: ' + data.temperature + " degC";
     document.getElementById('content').innerHTML = 'You seem to be: ' + data.response;
})
.catch(error => {
     console.log('error', error);
})
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
     const zipCode = document.getElementById('zip').value;
     const feeling = document.getElementById('feelings').value;
     if (!zipCode || zipCode.length != 5) {
          alert('Please Enter a valid zip code!!!');
          return;
     }
     getWeather(zipCode)
     .then(function(data) {
          const entry = {
               temperature: data.main.temp,
               date: newDate,
               response: feeling
          };
          return postData('/addWeather', entry);
     })
     .then (() => {
          getAndUpdateData();
     })
}



