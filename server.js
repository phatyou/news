//dependencies
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
// mongoose.connect('mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1');

// // mongoose.connect();
// mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/scraped_mnews', function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });
// // MONGODB_URI: mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1


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

//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//initialize Express app
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// connecting to MongoDB
// mongoose.connect('mongodb://heroku_jxkjhg1v:6s68tem51mlionrj2sneb7b53c@ds127988.mlab.com:27988/heroku_jxkjhg1v');
mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/scraped_mnews' || 'mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1', function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// mongoose.connect('mongodb://heroku_v2stl7h1:jgt3pt20iq7in7p1dld1nticu5@ds237855.mlab.com:37855/heroku_v2stl7h1');

//mongoose.connect('mongodb://localhost/scraped_news');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});

var routes = require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
