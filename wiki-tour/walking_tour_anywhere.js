// let API_key = 'AIzaSyBFyL7TGJ0-8yZqGPGT-ZhB1BtKlvxYyIk';
let proxyurl = 'https://cors-anywhere.herokuapp.com/';
// function loadJSON(callback) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType('application/json');
//   xobj.open('GET', './sf_eastbay_data.json', true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == '200') {
//       callback(JSON.parse(xobj.responseText));
//     }
//   };
//   xobj.send(null);
// }

function getLocation() {
  console.log('get location function');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geocodeLatLng);
  } else {
    x.innerHTML = 'nope';
  }
}

function mapsCallback() {
  console.log('maps API');
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var radlon1 = (Math.PI * lon1) / 180;
  var radlon2 = (Math.PI * lon2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

function initMap(waypts, position) {
  console.log(waypts);
  var centerCoord = waypts[Math.floor(waypts.length / 2)];

  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: centerCoord.location,
  });
  directionsRenderer.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsRenderer, position, waypts, map);
}

function geocodeLatLng(position) {
  const latlng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      let userLocation = {
        county: '',
        state: '',
        city: '',
        latlng: latlng,
      };
      results[0].address_components.forEach((component) => {
        if (component.types.includes('administrative_area_level_2')) {
          userLocation.county = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          userLocation.state = component.long_name;
        } else if (component.types.includes('locality')) {
          userLocation.city = component.long_name;
        }
      });
      document.getElementById('tour-container').innerHTML +=
        "<p>You're visiting " + userLocation.city + ', ' + userLocation.state;
      getWikiPage(userLocation);
      // results.forEach((result) => {
      //   if (result.formatted_address.includes('County')) {
      //     let county = result.formatted_address.split(',')[0]
      //     let state =
      //   }
      // });
    } else {
      document.getElementById('tour-container').innerHTML = 'Geocode failed due to: ' + status;
    }
  });
}

async function getResponse(url) {
  const response = await fetch(proxyurl + url);
  const responseJson = await response.json();
  return responseJson;
}

async function getWikiPage(userLocation) {
  console.log('getWikiPage function');
  let sectionURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=National_Register_of_Historic_Places_listings_in_${userLocation.county.replace(
    ' ',
    '_'
  )},_${userLocation.state.replace(' ', '_')}&prop=sections`;

  let sectionResponse = await getResponse(sectionURL);
  console.log(sectionResponse);
  let url = '';

  if (sectionResponse.parse.sections.length > 0 && sectionResponse.parse.sections[0].line == 'Current listings') {
    // listings exist for county
    url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=National_Register_of_Historic_Places_listings_in_${userLocation.county.replace(
      ' ',
      '_'
    )},_${userLocation.state.replace(' ', '_')}&section=1&prop=links`;
  } else if (
    sectionResponse.parse.sections.length > 0 &&
    sectionResponse.parse.sections[0].line == 'Listings by town'
  ) {
    console.log('');
  } else if ((sectionResponse.parse.sections[0].length = 0)) {
    // listings don't exist for county, probably renamed
    let linksURL = sectionURL.replace('&prop=sections', '&prop=links');
    let linksResponse = await getResponse(linksURL);
    if (linksResponse.parse.links) {
      // find the renamed page
      linksResponse.parse.links.forEach((link) => {
        if (link['*'].includes('National Register of Historic Places listings')) {
          url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${link['*'].replace(
            ' ',
            '_'
          )}&section=1&prop=links`;
        }
      });
    }
  }

  console.log('final url: ');
  console.log(url);
  let finalResponse = await getResponse(url);
  console.log(finalResponse);

  // if (response.error && response.error.code === 'nosuchsection') {
  //   // if there are no sections, the page probably doesn't exist, and was probably renamed (ie, kings county to brooklyn)
  //   url.replace('&section=1', '');
  //   if (response.parse.links) {
  //     // find the renamed page
  //     response.parse.links.forEach((link) => {
  //       if (link['*'].includes('National Register of Historic Places listings')) {
  //         url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${link['*'].replace(
  //           ' ',
  //           '_'
  //         )}&section=1&prop=links`;
  //       }
  //     });
  //   }
  //   response = await getResponse(url);
  // }

  let landmarkList = [];

  await Promise.all(
    finalResponse.parse.links.map(async (link) => {
      let landmark = await getLandmarkData(link);
      if (landmark !== null) {
        console.log('adding landmark');
        landmarkList.push(landmark);
      }
    })
  );
  // let landmarksList = await getLandmarkData(response);
  sortData(landmarkList, userLocation);
}

async function getLandmarkData(link) {
  // let landmarksList = [];
  // console.log('getLandmarkData function');

  // response.parse.links.forEach((link) => {
  console.log(link);
  let formattedLandmark = encodeURI(link['*'].replace(' ', '_'));
  const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + formattedLandmark;

  // const response = await fetch(proxyurl + url);
  // const responseJson = await response.json();
  // return responseJson;

  // let response = await fetch(url);
  // let responseJson = await response.json();

  let landmarkInfo = fetch(proxyurl + url)
    .then((res) => res.json())
    .then((responseJson) => {
      try {
        console.log('trying');
        console.log(responseJson);
        let landmarkName = responseJson.displaytitle;
        let lat = responseJson['coordinates']['lat'];
        let long = responseJson['coordinates']['lon'];
        // let latLong = lat + "," + long
        let description = responseJson['extract'];
        let url = responseJson['content_urls']['desktop']['page'];
        let landmarkInfo = {
          name: landmarkName,
          coordinates: {
            lat: lat,
            long: long,
          },
          // latLong: latLong,
          description: description,
          url: url,
        };
        console.log(landmarkInfo);

        return landmarkInfo;
      } catch {
        console.log('not valid landmark');

        return null;
      }
    });

  // if (landmarkInfo !== null) {
  return landmarkInfo;
  // addEvent(landmarkInfo,i, auth)
  // }
  // return landmarkInfo;
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, position, waypts, map) {
  console.log(position);
  directionsService.route(
    {
      origin: { lat: position.latlng.lat, lng: position.latlng.lng },
      destination: waypts[waypts.length - 1],
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING',
    },
    function (response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);

        var wayptOrder = response.routes[0].waypoint_order;
        console.log(wayptOrder);
        for (i = 0; i < wayptOrder.length; i++) {
          document.getElementById('tour-container').appendChild(document.getElementById(wayptOrder[i]));
          const infowindow = new google.maps.InfoWindow({
            content: document.getElementById(wayptOrder[i]).innerHTML,
          });
          const marker = new google.maps.Marker({
            position: waypts[wayptOrder[i]].location,
            map,
            title: document.getElementById(wayptOrder[i]).querySelector('a').textContent,
            label: wayptOrder[i],
          });
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
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
    }
  );
}

function getWayPts(data) {
  console.log('get waypts function');

  // return new Promise(resolve => {
  var waypts = [];

  var sortedDistances = Object.keys(data).sort(function (a, b) {
    return a - b;
  });
  console.log('sortedDistances');
  console.log(sortedDistances);
  for (i = 0; i < 10; i++) {
    var x = document.getElementById(i);
    console.log(data[sortedDistances[i]]);
    var thisLat = data[sortedDistances[i]]['coordinates']['lat'];
    var thisLong = data[sortedDistances[i]]['coordinates']['long'];
    x.innerHTML =
      "<a href='" +
      data[sortedDistances[i]]['url'] +
      "' target='new'>" +
      data[sortedDistances[i]]['name'] +
      '</a><br>' +
      thisLat +
      ', ' +
      thisLong +
      '<br>' +
      data[sortedDistances[i]]['description'];
    // var coords = {location: new google.maps.LatLng(thisLat, thisLong)}
    var coords = { location: { lat: thisLat, lng: thisLong } };
    waypts.push(coords);
  }
  return waypts;
  // })
}

function sortData(landmarksList, userLocation) {
  console.log('sort data function');
  console.log(landmarksList);
  console.log(userLocation);
  const userLat = userLocation.latlng.lat;
  const userLong = userLocation.latlng.lng;

  // loadJSON(function (json) {
  //   var data = json;
  var dataByDistance = {};
  landmarksList.forEach((landmark) => {
    var lat = landmark['coordinates']['lat'];
    var long = landmark['coordinates']['long'];

    var distance = calculateDistance(userLat, userLong, lat, long, 'N');
    dataByDistance[distance] = landmark;
  });
  console.log(dataByDistance);
  // console.log("dataByDistance")
  // console.log(dataByDistance)
  // return dataByDistance
  initMap(getWayPts(dataByDistance), userLocation);
}

async function getRandomCoords() {
  let url = 'https://api.3geonames.org/?randomland=US&json=1';
  fetch(proxyurl + url)
    .then((res) => res.json())
    .then((json) => {
      let position = {
        coords: {
          latitude: parseFloat(json.nearest.latt),
          longitude: parseFloat(json.nearest.longt),
        },
      };
      console.log(position);
      geocodeLatLng(position);
      return position;
    });
}
