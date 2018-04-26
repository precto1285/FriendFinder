// Require appropriate js file as a module where we can pull the allFriends array in the friends.js file
var allFriends = require('../data/friends.js');

module.exports = function(app){
  //Route to display all friends that are saved.
  app.get('/api/friends', function(req,res){
    res.json(allFriends);
  });

//A POST route that follows the on "click" submit event handler in survey.html.
//Post function simultaneously checks compatability and then adds the new user's information to the friends.js file
  app.post('/api/friends', function(req,res){

    // Set up variables and pull information from the form
    var newFriendScores = req.body.scores;
    var scoresDifferenceArray = [];

    // Create a nested for loop within a for loop to find the difference in scores between the new user and every other user saved in friends.js
    for (i=0; i < allFriends.length; i++) {
        var scoreDifference = 0
        for (j = 0; j < newFriendScores.length; j++) {
            scoreDifference += Math.abs(parseInt(allFriends[i].scores[j]) - parseInt(newFriendScores[j]))

        }
        //After looping through all friends and their associated scores, push that specific friend index and their difference into a comparison array.
        //It's important to push objects into an array so we can hold keys and values that can be referenced later. 
        scoresDifferenceArray.push(
            {
                friendIndex: i,
                compatability: scoreDifference
            }
    );  
    }
    // After the comparison array is built, we use this sort() method to sort the objects in the array according to compatability numbers
    // i.e. lower compatability (which actually means they have less difference) numbers go first then higher compatability numbers (the most difference in scores) go last
    scoresDifferenceArray.sort(function(a,b){
        return a.compatability - b.compatability;
    });

    // Now that the comparison array has been reorganized, we know that the first item in the array has the lower compatability number.
    // We can then reference the first ordered object in the comparison array and check the friendIndex key for a value.
    // This value will align with the allFriends array with all the stored friends information. 
    var bestMatchIndex = scoresDifferenceArray[0].friendIndex;

    // Console logs to validate information
    console.log("bestMatchIndex: " + bestMatchIndex)
    var bestMatchFriend = allFriends[bestMatchIndex]

    console.log("bestMatchFriend:\nName: " + bestMatchFriend.name + "\nLink: " + bestMatchFriend.photo + "\nScores: " + bestMatchFriend.scores)
    console.log(scoresDifferenceArray)

    // This statement returns the object information of the best match friend back to the survey.html page where they will display their name and photo through modal. 
    res.json(bestMatchFriend)
    
    // We finally add the new user's information to the allFriends array. The user's information must be added to the array last because otherwise
    // the logic of this page will find the new user most compatible with themselves. 
    allFriends.push(req.body);
    
  });
};