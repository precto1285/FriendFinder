// List out dependencies
var path = require("path");

module.exports = function(app){
    //Routes directly to the survey.html 
    app.get('/survey', function (req, res) {
      res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });
    //Routes directly to the home page
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'))
    });
    //Accounts for any unexpected inputs following the '/' in the base url
    app.get('/:unknown', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'))
    });
  
};
  