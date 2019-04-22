
require('dotenv').config();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
const exphbs = require("express-handlebars");
var express = require("express");
var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;

if(process.env.MONGODB_URI) {
  console.log('MDB')
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log('Local')
  mongoose.connect("mongodb://localhost/scrapedNews", function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected')
    }
  })
}

async = require('async');

// Use morgan for logging requests
app.use(morgan("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// render HTML templates and send them back to the client using (res.render)
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
// Set view engine/viewport to handlebars
app.set("view engine", "handlebars");


// attach routes to express app, pass app as parameter
require("./controllers/index.js")(app);
require("./controllers/articlesNotes.js")(app);



app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});