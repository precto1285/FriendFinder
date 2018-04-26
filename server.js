// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// Use the PORT designation immediately below this line for deploying to heroku.
var PORT = process.env.PORT || 3000;

// Use the PORT designation immediately below this line for local testing.
// var PORT = 3000;

// Handles data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Different modules needed for API routes and HTML routes
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// Initializes the server to begin listening for requests
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
