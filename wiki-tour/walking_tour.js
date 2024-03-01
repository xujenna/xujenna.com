var API_key = "AIzaSyBFyL7TGJ0-8yZqGPGT-ZhB1BtKlvxYyIk"

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './sf_eastbay_data.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
}

function getLocation() {
    console.log("get location function")
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(sortData);
    }
    else{
        x.innerHTML = 'nope'
    }
}

function mapsCallback() {
    console.log("maps API")
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

function initMap(waypts,position) {
    console.log(waypts)
    var centerCoord = waypts[Math.floor(waypts.length/2)]
    
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: centerCoord.location
    });
    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer,position, waypts);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer,position, waypts) {
    console.log(position)
    directionsService.route({
      origin: {lat: position.coords.latitude, lng: position.coords.longitude},
      destination: waypts[waypts.length-1],
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
        var wayptOrder = response.routes[0].waypoint_order
        console.log(wayptOrder)

        for(i=0;i<wayptOrder.length; i++){
            document.getElementById('tour-container').appendChild(document.getElementById(wayptOrder[i]))
        }
        // var route = response.routes[0];
        // var summaryPanel = document.getElementById('directions-panel');
        // summaryPanel.innerHTML = '';
        // For each route, display summary information.
        // for (var i = 0; i < route.legs.length; i++) {
        //   var routeSegment = i + 1;
        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
        //       '</b><br>';
        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        // }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

function getWayPts(data){
    console.log("get waypts function")

    // return new Promise(resolve => {
        var waypts = [];
    
        var sortedDistances = Object.keys(data).sort(function(a,b) {return a-b})
        for(i=0; i < 10; i++){
            var x = document.getElementById(i)
            var thisLat = data[sortedDistances[i]]['coordinates']['lat']
            var thisLong = data[sortedDistances[i]]['coordinates']['long']
            x.innerHTML = "<a href='" + data[sortedDistances[i]]['url'] + "' target='new'>" + data[sortedDistances[i]]['name'] + "</a><br>" + thisLat + ", " + thisLong + "<br>" + data[sortedDistances[i]]['description']
            // var coords = {location: new google.maps.LatLng(thisLat, thisLong)}
            var coords = {location: {lat: thisLat, lng: thisLong}}
            waypts.push(coords)
        }
        return waypts
    // })
}

function sortData(position) {
    console.log("sort data function")
    const userLat = position.coords.latitude
    const userLong = position.coords.longitude

    loadJSON(function(json) {
        var data = json
        var dataByDistance = {}
        for(const property in data) {
            var lat = data[property]['coordinates']['lat']
            var long = data[property]['coordinates']['long']
            
            var distance = calculateDistance(userLat, userLong, lat, long, "N")
            dataByDistance[distance] = data[property]
        }
        // console.log("dataByDistance")
        // console.log(dataByDistance)
        // return dataByDistance
        initMap(getWayPts(dataByDistance), position)
    })
    // sort by distance key
    // console.log("new data" + newData)
    // var wayPts = getWayPts(newData)

}