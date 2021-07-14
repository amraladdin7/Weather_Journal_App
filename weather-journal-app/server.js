// Setup empty JS object to act as endpoint for all routes
let projectData = {};

//Set up the server port
const port = 8080;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
     console.log('Server initialized');
     console.log(`Currently running on local host:${port}`);
});



// Initialize all route with a callback function
app.get('/all', getProjectData);

// Callback function to complete GET '/all'
function getProjectData(req, res) {
     res.send(projectData);
}

// Post Route
app.post('/addWeather', addWeather);

//Helper function to post new weather entry
function addWeather(req, res) {
     projectData = {...req.body};
     res.send(projectData);
}
