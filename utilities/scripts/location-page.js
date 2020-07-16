const mymap = L.map('mapid');

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, {attribution})
tiles.addTo(mymap);

//vieI4Nl56-cT8TEjf2FwiIn-DMrHk_eErVhGLROpmlA
//-lHFKMcQ3A0F2iyDQkPR1gJEGGMD7WAb8sAWBOw8Z4I

//https://pos.ls.hereapi.com/positioning/v1/locate?apiKey={YOUR_API_KEY}

	fetch('https://api.ipdata.co/?api-key=68394ed17d59e97ed50320d106f473a73d561d22582467b6586927f9')
	.then(result => result.json())
	.then(data => console.log(data));
/*	fetch('https://ip-api.com/json')
	.then(result => result.json())
	.then(data => console.log(data));
*/
let  requestOptions = {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    mode: 'cors', // no-cors, *cors, same-origin
	    headers: {
	      'Content-Type': 'application/json'
	    },
		body: JSON.stringify({
			  "lte": [{
			  "mcc": 655,
			  "mnc": 2,
			  "cid": 2898945
			  }],
			  "wlan": [
			  {"mac": "F4-55-95-11-2C-C1"}
		  ]
		})
}

fetch('https://pos.ls.hereapi.com/positioning/v1/locate?apiKey=-lHFKMcQ3A0F2iyDQkPR1gJEGGMD7WAb8sAWBOw8Z4I', requestOptions)
	.then(result => result.json())
	.then(data => {
		console.log(data.location.lat);
		//L.marker([data.location.lat, data.location.lng]).addTo(mymap);
	 	//mymap.setView([data.location.lat, data.location.lng], 13)
	});
	
	var options = {
	  enableHighAccuracy: true\,
	  timeout: 10 * 1000,
	  maximumAge: 0
	};

	function success(pos) {
	  var crd = pos.coords;
	  console.log(crd);
	  console.log('Your current position is:');
	  console.log(`Latitude : ${crd.latitude}`);
	  console.log(`Longitude: ${crd.longitude}`);
	  console.log(`More or less ${crd.accuracy} meters.`);
	  L.marker([crd.latitude, crd.longitude]).addTo(mymap);
	  mymap.setView([crd.latitude, crd.longitude], 13)
	}

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);


