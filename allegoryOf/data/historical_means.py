import json

with open('LSTM_new_predictor.json', 'r') as f:
    data = json.load(f)

historical_mood_total = 4689.264360785484
historical_morale_total = 4651.966272495938
historical_stress_total = 1887.1840826603825
historical_fatigue_total = 4970.883103297907
historical_pred_count = 1594

runningMean = {}
runningMean['totalPredictions'] = historical_pred_count
runningMean['totalMoodPred'] = historical_mood_total
runningMean['totalMoralePred'] = historical_morale_total
runningMean['totalStressPred'] = historical_stress_total
runningMean['totalFatiguePred'] = historical_fatigue_total

newData = []

for i in range(0, len(data)):
    print(i)
    for prediction in data[i]['predictions']:
        runningMean['totalMoodPred'] += prediction['LSTM_mood_prediction']
        runningMean['totalMoralePred'] += prediction['LSTM_morale_prediction']
        runningMean['totalStressPred'] += prediction['LSTM_stress_prediction']
        runningMean['totalFatiguePred'] += prediction['LSTM_fatigue_prediction']
        runningMean['totalPredictions'] += 1
        prediction['runningMean'] = runningMean

        with open('historical_means.json', 'r') as f:
            fileData = json.load(f)

        fileData.append(prediction)

        with open('historical_means.json', 'w') as f:
            json.dump(fileData, f, indent=2)

    # print("done: ")
    # print(runningMean)
    # data[i]['runningMean'] = runningMean
