// //dependencies
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var logger = require('morgan');

// //initialize Express app
// var express = require('express');
// var app = express();

// app.use(logger('dev'));
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use(express.static(process.cwd() + '/public'));

// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

// //connecting to MongoDB
// // mongoose.connect('mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1');

// // mongoose.connect('mongodb://localhost/scraped_mnews');

// var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraped_mnews';
// //Mongoose data base connection configuration. Name of DB will be scraped_mnews.
// console.log(MONGODB_URI);
// mongoose.connect(MONGODB_URI);
// // var db = mongoose.connection;


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to Mongoose!')
// });

// var routes = require('./controller/controller.js');
// app.use('/', routes);

// var port = process.env.PORT || 8080;
// app.listen(port, function(){
//   console.log('Listening on PORT ' + port);
// });

/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requiring our Note and Article models
var Note = require("./models/Comment.js");
var Article = require("./models/Article.js");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
//mongoose.connect("mongodb://localhost:3000/week18day3mongoose");
// mongoose.connect("mongodb://localhost/mongoscrape");
 //mongoose.connect("mongodb://localhost:32769/week18day3mongoose");
// mongoose.connect('mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraped_mnews";
//Mongoose data base connection configuration. Name of DB will be yTimesCheerioScraper
// var db = mongoose.connection;
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// require("./routes/savedArticles-routes.js")(app);
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

// // A GET request to scrape the echojs website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with request
//   request("http://www.echojs.com/", function(error, response, html) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(html);
//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {

//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this).children("a").text();
//       result.link = $(this).children("a").attr("href");

//       // Using our Article model, create a new entry
//       // This effectively passes the result object to the entry (and the title and link)
//       var entry = new Article(result);

//       // Now, save that entry to the db
//       entry.save(function(err, doc) {
//         // Log any errors
//         if (err) {
//           console.log(err);
//         }
//         // Or log the doc
//         else {
//           console.log(doc);
//         }
//       });

//     });
//   });
//   // Tell the browser that we finished scraping the text
//   res.send("Scrape Complete");
// });

// // This will get the articles we scraped from the mongoDB
// app.get("/articles", function(req, res) {
//   // Grab every doc in the Articles array
//   Article.find({}, function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Grab an article by it's ObjectId
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   Article.findOne({ "_id": req.params.id })
//   // ..and populate all of the notes associated with it
//   .populate("note")
//   // now, execute our query
//   .exec(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });


// // Create a new note or replace an existing note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   var newNote = new Note(req.body);

//   // And save the new note the db
//   newNote.save(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise
//     else {
//       // Use the article id to find and update it's note
//       Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
//       // Execute the above query
//       .exec(function(err, doc) {
//         // Log any errors
//         if (err) {
//           console.log(err);
//         }
//         else {
//           // Or send the document to the browser
//           res.send(doc);
//         }
//       });
//     }
//   });
// });


// Listen on port 3000
app.listen(8080, function() {
  console.log("App running on port 8080!");
});
