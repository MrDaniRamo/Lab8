// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up variables
var tables =[];

var waitlist =[];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  // Displays Tables
app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

  // Displays waiting list
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Reserve table - takes in JSON input
app.post("/api/tables", function(req, res) {
   
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  
    console.log(newReservation);
    if (tables.length < 5){
     tables.push(newReservation);
    }
    else {
     waitlist.push(newReservation);
     
    }
    res.json(newReservation);
    
  });

  //clears tables
  app.post("/api/clear", function(req,res) {

    var newclear = req.body;
  
    tables = [];
    waitlist = [];
    
    res.json(newclear);
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
