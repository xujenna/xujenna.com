const fs = require('fs');
var data = JSON.parse(fs.readFileSync('./db_data.json', 'utf8'));

// let predictionsWnull = []

// Object.keys(data).forEach(key => {
//     data[key].forEach(d => {
//         if(d.timestamp < 1555164021){
//             delete d
//         }
//     })
// })

// delete data.documentation
// delete data.historicalMeans

// data.predictions.forEach((d,i,obj) => {

//     if (i > 0 && d.timestamp !== null && data['predictions'][i-1]['timestamp'] !== null && (d.timestamp >= (data['predictions'][i-1]['timestamp'] + 60 * 60 * 5))){
        
//         let nullObj = {}
//         nullObj['LSTM_mood_prediction'] = null
//         nullObj['LSTM_morale_prediction'] = null
//         nullObj['LSTM_stress_prediction'] = null
//         nullObj['LSTM_fatigue_prediction'] = null
//         nullObj['timestamp'] = null
//         predictionsWnull.push(nullObj)
//     }
//     else{
//         predictionsWnull.push(d)
//     }
// })

// data.predictions = predictionsWnull

// Object.keys(data).forEach(key => {
//     data[key] = data[key].filter(d => d.timestamp > 1555164021 )
// })

let oldThresholds = {
    fatigue: 3.05,
    stress: 1.3,
    morale: 2.9,
    mood: 2.8
}

let allKeys = Object.keys(data['predictions'][0])
let keys = allKeys.filter(key => {return key !== "runningMean" && key !== "timestamp" && key !== "mean_deltas"})

data.predictions.forEach(d => {
    d['mean_deltas'] = {}

    keys.forEach(key => {
        let marker = key.replace("LSTM_", "").replace("_prediction", "")

        if (d[key] == null){
            d['mean_deltas'][marker + "_mean_delta"] = null;
        }
        else if(d['runningMean']){
            let meanKey = "total" + (marker.charAt(0).toUpperCase() + marker.slice(1)) + "Pred"
            d['mean_deltas'][marker + "_mean_delta"] = d[key] - (d['runningMean'][meanKey] / d['runningMean']['totalPredictions'])
        }
        else if (d[key]){
            d['mean_deltas'][marker + "_mean_delta"] = d[key] - oldThresholds[marker]
        }
    })

})

data.interventions.forEach(intervention => {
    let timestamp = intervention.timestamp
    data.predictions.forEach(prediction => {
        if(prediction.timestamp == timestamp){
            intervention['mean_delta'] = prediction['mean_deltas'][intervention.marker + '_mean_delta']
        }
    })

})

fs.writeFile('./data.json', JSON.stringify(data), function(err) {
    if(err) console.log(err)
  })