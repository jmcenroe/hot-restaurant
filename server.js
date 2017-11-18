// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [{
    customerName: 'Reserved Test',
    phoneNumber: 5555555,
    customerEmail: 'fake@fake.com',
    customerID: "12" 
}

];
var waitList = [{
    customerName: 'test',
    phoneNumber: 5555555,
    customerEmail: 'fake@fake.com',
    customerID: "1" 
}
];



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "test/index.html"));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "test/tables.html"));
});

app.get('/reserve', function(req,res) {
    res.sendFile(path.join(__dirname, "test/reserve.html"));
});

app.get('/api/tables', function(req,res) {
    res.json(reservations);
});

app.get('/api/waitlist', function(req,res) {
    res.json(waitList[0]);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });