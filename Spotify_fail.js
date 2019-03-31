// left to do:
//     moment js for bands-in-town - done
//     finish backstreet boys thing
//     take pics for readMe
//      submit to GitHub and BootCampSpot

require("dotenv").config();

var keys = require("./keys.js");
var axios = require('axios');
var bandsintown = require('bandsintown');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var fs = require('fs');
var moment = require('moment');

const userInput = process.argv[2];

function spotifyThis(song) {
  if (!song) { song = 'The Sign (US Album)'};
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      for(var i = 0; i < data.tracks.items.length; i++){
          console.log(data.tracks.items[i].artists[0].name + " \n" +
          data.tracks.items[i].name + " \n" +
          data.tracks.items[i].href + " \n" +
          data.tracks.items[i].album.name + " \n" 
        
          ); 
        }
      });
    };

// BANDS IN TOWN -----------------------------------------
if (userInput === 'concert-this') {

    var artist = process.argv[3];
    console.log(artist);
    if (!artist) { artist = 'Beyonce'};
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!
    //   console.log(response.data[0]);
        for(var i = 0; i < response.data.length; i++){
          var momentTime = moment(response.data[i].datetime).format("MM-DD-YYYY");
          console.log( response.data[i].venue.name + ": " 
                    + response.data[i].venue.city + ","
                    + response.data[i].venue.region + ","
                    + response.data[i].venue.country + ", "
                    + momentTime + "\n"  );
        }
      });

// SPOTIFY -----------------------------------------------------
} else if (userInput === 'spotify-this-song') {
    spotifyThis(process.argv[3]);
    // var song = process.argv[3];
    

// OMDB --------------------------------------------------------
} else if (userInput === 'movie-this') {
    var movie = process.argv[3];
    if (!movie) { movie = 'Mr. Nobody'};
    axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log("*" + response.data.Title + "\n*" +
                response.data.Year + "\n*" +
                response.data.Ratings[0].Value + "\n*" +
                response.data.Ratings[1].Value + "\n*" +
                response.data.Country + "\n*" +
                response.data.Language + "\n*" +
                response.data.Plot + "\n*" +
                response.data.Actors + "\n*"
                );
    });
    
// RANDOM.TXT -------------------------------------------------
} else if (userInput === 'do-what-it-says') {
    console.log('do-what-it-says');
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
    // console.log(data);
    const Song =  data.split(',')[1];
    spotifyThis(Song);
    // console.log(data);
    // const brokeUp = data.split(',');
    // console.log(brokeUp)
    // console.log(`node liri.js ${brokeUp[0]} ${brokeUp[1]}\n`)
    });

// ELSE INSTRUCTIONS ------------------------------------------
} else {
    console.log('please input one of these: \n concert-this \n spotify-this-song \n movie-this \n do-what-it-says')
}

