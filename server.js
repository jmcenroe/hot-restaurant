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
app.use(express.static('public'));

var reservations = [{
    name: 'Reserved Test',
    phone: 5555555,
    email: 'fake@fake.com',
    uniqueID: "12",
    accepted: true,
    place: 'reservation'
}

];
var waitList = [{
    name: 'test',
    phone: 5555555,
    email: 'fake@fake.com',
    uniqueID: "1",
    accepted: true,
    place: 'wait'
}
];



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get('/reserve', function(req,res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get('/api/tables', function(req,res) {
    res.json(reservations);
});

app.get('/api/waitlist', function(req,res) {
    res.json(waitList);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newcharacter = req.body;
  
  console.log(newcharacter);

  //Check uniqueId against existing reservations and waitlist
  var found = false;
  var place = '';
  for (var i = 0; i < reservations.length && !found; i++) {
  	if (newcharacter.uniqueID === reservations[i].uniqueID) 
  	{
  		found = true;
  		place = 'reservation';
  	}
  }

  for (var i = 0; i < waitList.length && !found; i++) {
  	if (newcharacter.uniqueID === waitList[i].uniqueID) 
  	{
  		found=true;
  		place='wait';
  	}
  }

  if (found) {
  	newcharacter.accepted=false;
  	newcharacter.place=place;
  }
  else {
  	  newcharacter.accepted=true;
	  if (reservations.length < 5) {
	  	newcharacter.place = 'reservation';
	  	reservations.push(newcharacter);
	  }
	  else {
	  	newcharacter.place = 'wait'
	  	waitList.push(newcharacter);
	  }

  }

  res.json(newcharacter);

 });

app.post('/api/confirm', function (req,res) {

	var reservationused = req.body.uniqueID;

	console.log(reservationused);

	for (var i = 0; i < reservations.length; i++) {
		if (reservationused === reservations[i].uniqueID) {
			if (waitList.length > 0) {
				reservations[i]=waitList[0];
				waitList.splice(0,1);
			}
			else {
				reservations.splice(i,1);
			}
		}
	}

	res.send('Reservation used.');

});
