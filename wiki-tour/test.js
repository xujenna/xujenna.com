
const landmarkList = require('./alameda_landmarks.json')
const fetch = require('node-fetch')
const fs = require('fs')


// function shuffle(a) {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// }

var data = {}

const wowTimeout = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}
const timeout = 1000
const multiplier = 50

async function getKey() {
    let keys = Object.keys(landmarkList['query']['pages'])
    // shuffle(keys);

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index]

        try {
            const landmark = await getLandmarks(key)
            
            if(landmark) {
                console.log("Landmark:", landmark)
                data[key] = landmark
                console.log(data)
            }
        } catch (error) {
            console.log('Failed to get landmark', error)
        }

        await wowTimeout(timeout + index * multiplier)
    }
    saveFile()
}

function getLandmarks(key){
    let landmarkName = landmarkList['query']['pages'][key]['title']

    let formattedLandmark = encodeURI(landmarkName.replace(" ", "_"));
    const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + formattedLandmark
    
    let landmarkInfo = fetch(url)
    .then(res => res.json())
    .then(json => {
        try{
            let lat = json['coordinates']['lat']
            let long = json['coordinates']['lon']
            // let latLong = lat + "," + long
            let description = json['extract']
            let url = json['content_urls']['desktop']['page']
            let landmarkInfo = {
                name: landmarkName,
                coordinates: {
                    lat: lat,
                    long: long
                },
                // latLong: latLong,
                description: description,
                url: url
            }
            return landmarkInfo
        }
        catch{
            return null;
        }
    })
    
    if(landmarkInfo !== null){
        return landmarkInfo
        // addEvent(landmarkInfo,i, auth)
    }
}


function saveFile(){
    var json = JSON.stringify(data)
    fs.writeFile('data_alameda.json', json, 'utf8', (err) => {
        if (err) throw err;
        console.log('saved')
    })
}

getKey()