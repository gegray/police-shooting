// Function to draw your map
var drawMap = function() {

  // Create map and set viewd
  var map = L.map('container').setView([38, -100], 4);

  // Create an tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
  layer.addTo(map);

  // Execute your function to get data
  getData(map);
}

// Function for getting data
var getData = function(map) {
  
  var data;
  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
  	url: './data/response.json',
  	type: 'get',
  	// When your request is successful, call your customBuild function
  	success: function(dat) {
  		data = dat;
  		customBuild(data, map);
  	},
  	dataType: 'json'
  });

}

// Do something creative with the data here!  
var customBuild = function(data, map) {
  
  data.map(function(d) {
  	var circle = new L.circle(
  		[d.lat, d.lng], 2000, {
  		color: 'LightSlateGray', 
  		fillOpacity: 1,
  		opacity: 1.0
  	})

  	var race = d['Race'];
  	var hispanicOrLatino = d['Hispanic or Latino Origin'];
  	var vAge = d["Victim's Age"];
  	var vName = d["Victim Name"];
  	var vArmed = d["Armed or Unarmed?"];
  	var vKilled = d["Hit or Killed?"];
  	var vSource = d["Source Link"];
  	var vRace;

  	if (race == 'Black or African American') {
  		circle.setStyle({color:'Black'});
  		vRace = 'Black or African American';
  	} else if (race == 'White') {
  		circle.setStyle({color:'DeepSkyBlue'});
  		vRace = 'White';
  	} else if (hispanicOrLatino == 'Hispanic or Latino origin') {
  		circle.setStyle({color:'Crimson'});
  		vRace = 'Hispanic or Latino origin';
  	} else {
  		vRace = 'Unknown'
  	}

  	if (vAge >=0 && vAge < 18) {
 		circle.setRadius(16000);
  	}

  	circle.addTo(map);
  	circle.bindPopup("<b>Name: </b>" + vName + 
  					 "<br><b>Age: </b>" + vAge + 
  					 "<br><b>Race: </b>" + vRace + 
  					 "<br><b>Hit or Killed: </b>" + vKilled +
  					 "<br><a href='" + vSource + "' target='_blank'>Source</a>"
  					);
  })
  
}