
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var exphbs = require("express-handlebars");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapedNews";

mongoose.connect(MONGODB_URI);

