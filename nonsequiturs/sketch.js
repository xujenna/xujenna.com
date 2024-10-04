// Word2Vec class and callCallback function stolen from http://ml5js.org

function callCallback(promise, callback) {
  if (callback) {
    promise
      .then((result) => {
        callback(undefined, result);
        return result;
      })
      .catch((error) => {
        callback(error);
        return error;
      });
  }
  return promise;
}

class Word2Vec {
  constructor(modelPath, callback) {
    this.model = {};
    this.modelPath = modelPath;
    this.modelSize = 0;
    this.modelLoaded = false;

    this.ready = callCallback(this.loadModel(), callback);
  }

  async loadModel() {
    const json = await fetch(this.modelPath)
      .then(response => response.json());
    Object.keys(json).forEach((word) => {
      // this.model[word] = tf.tensor2d(json.vectors[word],[300,1]);
      this.model[word] = tf.tensor1d(json[word]);
    });
    this.modelSize = Object.keys(this.model).length;
    this.modelLoaded = true;
    return this;
  }

  dispose(callback) {
    Object.values(this.model).forEach(x => x.dispose());
    if (callback) {
      callback();
    }
  }
};


  var config = {
    apiKey: "AIzaSyAGKvWESjIqkNOXic9P-SCCrcFjFn3tmKM",
    authDomain: "word2vecgame.firebaseapp.com",
    databaseURL: "https://word2vecgame.firebaseio.com",
    projectId: "word2vecgame",
    storageBucket: "word2vecgame.appspot.com",
    messagingSenderId: "254456730638"
  };
  firebase.initializeApp(config);


var database = firebase.database();
let word2vec = new Word2Vec('data/wordvecs10000_tsne.json', modelLoaded);
const SpeechRecognition = webkitSpeechRecognition;
const synth = window.speechSynthesis;


let playerOneScore = 0;
let playerOnePoints = 0;
let playerOneTimePenalty = 0;
let playerTwoScore = 0;
let playerTwoPoints = 0;
let playerTwoTimePenalty = 0;
let data;
let data_keys;
let counter;
let tsneOpt;
let tsneCoordinates;
let playerNum = 0;
// let body = document.querySelector("body");
let tryAgain = false;
let turnBar = document.getElementById('turnBar');
let statCards = document.querySelectorAll('.playerStats');
let turns;
let xMax, xMin, yMax, yMin;
let svgHeight;
let svgWidth = window.innerWidth - (document.getElementById("playerOneBar").getBoundingClientRect().width * 2)
let plotSVG = d3.select("#tsneSVG")
.append("svg:svg")
  .attr("width", (svgWidth))
  .attr("height", (svgHeight))

async function speak(textInput) {
  if(synth.speaking){
    console.error('already speaking')
    return;
  }
  let utterThis = new SpeechSynthesisUtterance(textInput)
  await synth.speak(utterThis)
}


function modelLoaded() {
  // document.getElementById('start-button').textContent = "Computing t-SNE...";

  data = Object.keys(word2vec.model).map(k => word2vec.model[k].dataSync());
  data_keys = Object.keys(word2vec.model);
  xMax = d3.max(data, function (d) { return d[0] });
  xMin = d3.min(data, function (d) { return d[0] });
  yMax = d3.max(data, function (d) { return d[1] });
  yMin = d3.min(data, function (d) { return d[1] });
  // word2vec_tsne_tensor = tf.tensor2d(data);
  // tsneOpt = tsne.tsne(word2vec_tsne_tensor);
  // await tsneOpt.compute().then(() => {
  //    tsneCoordinates = tsneOpt.coordsArray();
  // })
  document.getElementById('start-button').innerHTML= "<button class='btn-hover color-11' onclick='start();'>START GAME</button>";
}

// function randomProperty(obj) {
//   var keys = Object.keys(obj)

//   return keys[keys.length * Math.random() << 0];
// };

function start() {
  playerNum = 0;
  tryAgain = false;
  prev_xCoord = 0;
  prev_yCoord = 0;
  playerOneScore = 0;
  playerOnePoints = 0;
  playerOneTimePenalty = 0;
  playerTwoScore = 0;
  playerTwoPoints = 0;
  playerTwoTimePenalty = 0;
  turns = 0;

  // document.querySelector('#start-button > button').disabled = true;
  // let scores = document.querySelectorAll(".playerStats > h2");
  // scores.forEach(function(d){d.textContent=0});

  statCards.forEach(function(d){
    d.style.display = "none";
  })
  document.getElementById("highScore").style.display = "none";
  document.getElementById('restart-button').style.display= "none";
  document.querySelector('#start-button > button').style.display = "none";
  document.getElementById('rules-container').style.display= "none";
  document.getElementById('playerOneBar').style.height = "0px";
  document.getElementById('playerTwoBar').style.height = "0px";

  turnBar.style.display = "block";
  document.getElementById('player').textContent = "COMPUTER START";
  document.getElementById('countDown').textContent = '';
  document.getElementById('tryAgain').textContent = '';

  document.getElementById("tsneSVG").style.marginTop = document.getElementById("turnBar").getBoundingClientRect().height + "px"
  svgHeight = window.innerHeight - document.getElementById("turnBar").getBoundingClientRect().height
  document.getElementById('tsneSVG').style.display = "block"

  plotSVG.remove();
  plotSVG = d3.select("#tsneSVG")
  .append("svg:svg")
    .attr("width", (svgWidth))
    .attr("height", (svgHeight))
  
  document.getElementById('countDown').style.display = "inline-block";

  // document.querySelector('#tsneCanvas').style.display = "block";

  // let starter = randomProperty(word2vec.model)
  let starter = data_keys[data_keys.length * Math.random() << 0]

  // document.getElementById('currentWord').textContent = starter;
  getCoordinates(starter,0,0,playerNum);
  speak(starter);
  setTimeout(function(){newTurn(starter);}, 800);
}

function checkModel(word){
  let inModel = false
  if(word2vec.model[word]){
    inModel = true
  }else{
    inModel = false
  }
  return inModel
}
function distance(a, b) {
  console.log("distance a: " + a)
  console.log("distance b; " + b)
  let result = tf.util.distSquared(word2vec.model[a].dataSync(), word2vec.model[b].dataSync());
  console.log("distance result: " + result)
  return result;
}

function newTurn(word) {
  clearInterval(counter);

  turns += 1;

  if(tryAgain==true){
    tryAgain = false;
    turns -= 1;
  }
  else{
    if(playerNum == 0 || playerNum == 2){
      playerNum = 1;
      turnBar.style.backgroundColor = "red";
    }
    else{
      playerNum = 2;
      turnBar.style.backgroundColor = "mediumblue";
    }
  }
  console.log("newTurn PlayerNum: "+ playerNum)

  document.getElementById('player').textContent = "PLAYER " + playerNum + " TURN";


  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();


  let count = 0;
  counter = setInterval(function () {
    count += 1;
    if(count < 10){
      document.getElementById('countDown').textContent = "00:0" + count;
    }
    else if (count >= 10){
      recognition.stop();
      clearInterval(counter);

      // document.getElementById('countDown').textContent = "00:" + count;
      speak("Time's up!")

      let winner = playerNum == 1 ? 2 : 1
      gameOver(winner)
    }
  }, 1000);



  let newWord;
  let timePenalty;

  function result(playerNum, timePenalty, score, newScore){
    console.log("result")
    if(playerNum == 1){
      playerOneScore += newScore;
      playerOnePoints += score;
      playerOneTimePenalty += timePenalty;

      document.getElementById('playerOneBar').style.height = (playerOneScore/10) + "px";

      if(Math.round(document.getElementById('playerOneBar').style.height.match(/(\d+)/)[0]) > svgHeight){
        gameOver(playerNum);
        return;
      }
      else if(playerOneScore >= 0){
        // document.getElementById('playerOneBar').style.width = (playerOneScore/10) + "px";
        newTurn(newWord)
        return
      }
      else if(playerOneScore < 0){
        // document.getElementById('playerOneBar').style.width = "0px";
        gameOver(2);
        return
      }
    }
    else if(playerNum == 2){
      playerTwoScore += newScore;
      playerTwoPoints += score;
      playerTwoTimePenalty += timePenalty;
      
      document.getElementById('playerTwoBar').style.height = (playerTwoScore/10) + "px";

      if(Math.round(document.getElementById('playerTwoBar').style.height.match(/(\d+)/)[0]) > svgHeight){
        // document.getElementById('playerTwoBar').style.width = (playerTwoScore/10) + "px";
        gameOver(playerNum);
        return;
      }
      else if(playerTwoScore >= 0){
        // document.getElementById('playerTwoBar').style.width = (playerTwoScore/10) + "px";
        newTurn(newWord)
      }
      else if(playerTwoScore < 0){
        // document.getElementById('playerTwoBar').style.width = "0px";
        gameOver(1);
      }
    }
  }

  recognition.onresult = event => {
    if (typeof (event.results) !== 'undefined') {
      recognition.stop();
      document.getElementById('tryAgain').textContent = "";
      timePenalty = Math.pow(Math.abs(count-1), 3) * 10;
      console.log("time penalty: " + timePenalty)
      clearInterval(counter);

      newWord = event.results[0][0].transcript;
      newWord = newWord.toLowerCase();
      console.log(word)
      console.log(newWord)
    }
  }
  recognition.onend = () => {
		console.log("ended recording");
    // try {  
    if(checkModel(newWord)){
      let score = Math.round(distance(word, newWord) / 4);
      let newScore = score - timePenalty;
      console.log("score: " + score)
      console.log("newScore: " + newScore)
      console.log("timePenalty: " + timePenalty)
      if(score >= 0){
        getCoordinates(newWord, score, timePenalty, playerNum);
        result(playerNum, timePenalty, score, newScore)

        // result(playerNum, timePenalty, score, newScore)
      } 
    } else if (newWord !==undefined){
        document.getElementById('tryAgain').textContent = "Try again ('" + newWord + "' not in model)";
        speak("Try again ('" + newWord + "' not in model)");
        tryAgain = true;
        setTimeout(function(){newTurn(word)}, 2000);
      }

    // }
    // catch(err){
      // console.log("error: " + err)
      // if(err.name == "TypeError" && newWord !== undefined){
      //   document.getElementById('tryAgain').textContent = "Try again ('" + newWord + "' not in model)";
      //   speak("Try again ('" + newWord + "' not in model)");
      //   tryAgain = true;
      //   setTimeout(function(){newTurn(word)}, 2000);
      // } 
      // else if(err.name == "TypeError" && counter >= 10){
      //   speak("Time's up!")

      //   tryAgain = false
      //   newTurn(word)
      // }
    // }
  }
  // recognition.onerror = event => {
  //   clearInterval(counter);
  //   recognition.stop();

  //   console.log("error: " + event.error);
  //   if (event.error == "no-speech") {
  //     // let score = 0

  //     speak("Time's up!")

  //     // tryAgain = false
  //     // let timePenalty = 1000000
  //     // let newScore = score - timePenalty
  //     // result(playerNum, timePenalty, score, newScore)
  //     let winner = playerNum == 1 ? 2 : 1
  //     gameOver(winner)
  //   } 
  //   // else if(err.name == "TypeError" && newWord !== undefined){
  //   //   document.getElementById('tryAgain').textContent = "Try again ('" + newWord + "' not in model)";
  //   //   speak("Try again ('" + newWord + "' not in model)");
  //   //   tryAgain = true;
  //   //   setTimeout(function(){newTurn(word)}, 2000);
  //   // } 
  // }
}


const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

let prev_xCoord = 0;
let prev_yCoord = 0;


async function getCoordinates(word,score,timePenalty,playerNum) {
  let wordIndex = data_keys.indexOf(word);
  console.log(wordIndex);
  // words = document.querySelectorAll("text");
  // words.forEach(function(d){d.classList.replace("newEmbeddingText", "embeddingText")})
  if(playerNum > 0){
    let prevEmbedding = document.getElementById('newEmbeddingText');
    prevEmbedding.removeAttribute("id");
    prevEmbedding.classList.add("embeddingText");
  }
  let plotScores = document.querySelectorAll(".plotScore");
  if(plotScores.length > 0){
    plotScores.forEach(function(d){d.remove();})
  }

  // let wordIndex = data.indexOf(Array.prototype.slice.call(word2vec.model[word].dataSync()));
  // await tsneCoordinates.then(function(result) {
    // let tsneCoords = word2vec.model[word].dataSync();
    // console.log(tsneCoords[wordIndex]);
    // let xCoord = scale(tsneCoords[wordIndex][0], 0, 1, 0, (window.innerWidth * 0.87));
    // let yCoord = scale(tsneCoords[wordIndex][1], 0, 1, 0, (window.innerHeight * 0.96));
    // console.log(xCoord)
    // console.log(yCoord)
    // distance = Math.round(distance)
    console.log("getCoordinates word :" + word)
    let tsneCoords = word2vec['model'][word].dataSync();
  
    let xCoord = scale(tsneCoords[0], xMin, xMax, 0, (window.innerWidth * 0.87));
    let yCoord = scale(tsneCoords[1], yMin, yMax, 0, (window.innerHeight * 0.88));
  
  function plotWord(){
    plotSVG.selectAll(".concentricCircles").remove()
    for(var i = 0; i < 10; i++){
      plotSVG.append("circle")
        .attr("cx", xCoord)
        .attr("cy", yCoord)
        .attr("r", 90 * i)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("class", "concentricCircles")
        .attr("opacity", 0.5)
      }
    plotSVG.append("text")
      .text(word)
      .attr("x", xCoord + 10)
      .attr("y", yCoord + 5)
      .attr("id", "newEmbeddingText")
      .attr("class", "player" + playerNum + "text");
    plotSVG.append("circle")
      .attr("cx", xCoord)
      .attr("cy", yCoord)
      .attr("r", 5)
      .attr("fill", "silver")
      .attr("class", "player" + playerNum + "text");
  }

    if(prev_xCoord == 0 && prev_yCoord == 0){
      plotWord();
    }
    else if(prev_xCoord !== 0 && prev_yCoord !== 0){

      plotSVG.append("text")
        .text("+" + score + " distance")
        .attr("x", xCoord + 5)
        .attr("y", yCoord + 30)
        .attr("fill", "mediumseagreen")
        .attr("class", "plotScore");
      plotSVG.append("text")
        .text("-" + timePenalty + " time")
        .attr("x", xCoord + 5)
        .attr("y", yCoord + 52)
        .attr("fill", "orangered")
        .attr("class", "plotScore");

      let lineClass = "player" + playerNum + "line";
      var path = plotSVG.append("line")
        .attr("x1", prev_xCoord)
        .attr("y1", prev_yCoord)
        .attr("x2", xCoord)
        .attr("y2", yCoord)
        .attr("class", lineClass)
        .attr("stroke", "silver")
        .attr("stroke-width", 3)
        .attr("opacity", 0.6)

      var totalLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(250)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset",0)
          .on("end", function(d){path.attr("stroke-dasharray", 3); plotWord();})
    }
    prev_xCoord = xCoord;
    prev_yCoord = yCoord;
  // });
}

function gameOver(playerNum){
  // clearInterval(counter);
  document.getElementById('player').textContent = "PLAYER";
  document.getElementById('countDown').textContent = playerNum;
  document.getElementById('tryAgain').textContent = "WINS!!";

  statCards.forEach(function(d){
    d.style.display = "inline-block";
  })

  setTimeout(function(){speak("Player " + playerNum + " Wins!")}, 1000);


  document.getElementById('restart-button').style.display= "block";

  
  let efficiencyBonus;
  if(turns <=8){
    efficiencyBonus = Math.pow((10-turns), 5) * 2;
  }
  else{
    efficiencyBonus = 0;
  }
  
  let winningScore;
  if(playerNum == 1){
    turnBar.style.backgroundColor = "red";
    playerOneScore += efficiencyBonus;
    winningScore = playerOneScore;
    winningPoints = playerOnePoints;
    winningEfficiencyBonus = efficiencyBonus;
    winningTimePenalty = playerOneTimePenalty;
    document.getElementById('playerOneEfficiencyBonus').textContent = efficiencyBonus;
    document.getElementById('playerTwoEfficiencyBonus').textContent = 0;

  }
  else if (playerNum == 2){
    turnBar.style.backgroundColor = "mediumblue";
    playerTwoScore += efficiencyBonus;
    winningScore = playerTwoScore;
    winningPoints = playerTwoPoints;
    winningEfficiencyBonus = efficiencyBonus;
    winningTimePenalty = playerTwoTimePenalty;
    document.getElementById('playerTwoEfficiencyBonus').textContent = efficiencyBonus;
    document.getElementById('playerOneEfficiencyBonus').textContent = 0;

  }

  document.getElementById('playerOneScore').textContent = playerOneScore;
  document.getElementById('playerOnePoints').textContent = playerOnePoints;
  document.getElementById('playerOneTimePenalty').textContent = playerOneTimePenalty;
  document.getElementById('playerTwoScore').textContent = playerTwoScore;
  document.getElementById('playerTwoPoints').textContent = playerTwoPoints;
  document.getElementById('playerTwoTimePenalty').textContent = playerTwoTimePenalty;


  let minThreshold;
  let scoresDB = database.ref('/scores/');
  
  scoresDB.on('value',(snapshot)=>{
    let scores = snapshot.val();
    let scoresKeys = Object.keys(scores).sort(function(a,b){return b-a});
    if(scoresKeys.length < 6){
      // minThreshold = scoresKeys[scoresKeys.length-1]
      minThreshold = 0;
    }
    else{
      minThreshold = scoresKeys[5];
    }
    
    console.log("winningScore: " + winningScore)
    console.log("minThreshold: " + minThreshold)

    if(winningScore >= minThreshold){
      console.log("high score")
      highScore(playerNum, winningScore, winningPoints, winningEfficiencyBonus, winningTimePenalty);
    }
    else if (winningScore < minThreshold){
      // let fromHighScore = "False";
      highScoreBoard();
    }
  })
  return;
}


function highScore(playerNum, totalScore, totalPoints, efficiencyBonus, totalTimePenalty){
  console.log("in highScore")

  let highScoreDiv = document.getElementById("highScore");

  let ps = highScoreDiv.querySelectorAll('p');
  ps.forEach(function(d){ highScoreDiv.removeChild(d)});

  highScoreDiv.style.display = "block";
  let highScoreInput = document.getElementById("hiScore_name");
  highScoreInput.style.display = "inline-block";
  highScoreInput.value = "Player " + playerNum + " Name";
  let submitButton = document.getElementById("submitHighScore");
  submitButton.style.display = "inline-block";

  let time = Date.now();
  let key = "/scores/" + totalScore;
  let newGameEntry = {};

  newGameEntry["time"] = time;
  newGameEntry["totalScore"] = totalScore;
  newGameEntry["totalPoints"] = totalPoints;
  newGameEntry["efficiencyBonus"] = efficiencyBonus;
  newGameEntry["totalTimePenalty"] = totalTimePenalty;

  submitButton.onclick = function(){
    newGameEntry["playerName"] = highScoreInput.value;
    database.ref(key).set(newGameEntry);
    // let fromHighScore = "True"
    // highScoreDiv(fromHighScore);

    submitButton.style.display = "none"
    document.querySelector("#highScore > h1").textContent = "High Scores";
    highScoreInput.style.display = "none";

    let scoresDB = database.ref('/scores/');
    scoresDB.on('value',(snapshot)=>{
      let scores = snapshot.val();
      let scoresKeys = Object.keys(scores).sort(function(a,b){return b-a});
      scoresKeys.forEach(function(d){
        let entry = document.createElement('p')
        entry.textContent = scores[d]['playerName'] + ": " + d;
        highScoreDiv.appendChild(entry)
      })
    })
  }

  document.getElementById('closeHighScore').onclick = function(){
    highScoreDiv.style.display = "none";
  }
}


function highScoreBoard(){
  console.log("in highScoreBoard")
  let highScoreDiv = document.getElementById("highScore");
  highScoreDiv.style.display = "block";

  document.getElementById("submitHighScore").style.display = "none"
  document.querySelector("#highScore > h1").textContent = "High Scores";
  document.getElementById("hiScore_name").style.display = "none";

  let scoresDB = database.ref('/scores/');
  scoresDB.on('value',(snapshot)=>{
    let scores = snapshot.val();
    let scoresKeys = Object.keys(scores).sort(function(a,b){return b-a});
    scoresKeys.forEach(function(d){
      let entry = document.createElement('p')
      entry.textContent = scores[d]['playerName'] + ": " + d;
      highScoreDiv.appendChild(entry)
    })
  })
  document.getElementById('closeHighScore').onclick = function(){
    let ps = highScoreDiv.querySelectorAll('p');
    ps.forEach(function(d){ highScoreDiv.removeChild(d)});
    highScoreDiv.style.display = "none";
  }
} 


function micTest() {
  let instructions = document.getElementById('micTest');
  instructions.innerHTML += "<p style='font-size:12px'>Give your mic permission if necessary, then say something. The transcript will appear here: </p>"
  
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();


  recognition.onresult = event => {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        recognition.stop();
        instructions.innerHTML += "<p style='font-size:12px'><i>" + event.results[i][0].transcript + "</i>";
      }
      // else{
      //   interim_transcript += event.results[i][0].transcript;
      // }
    }
  }
  recognition.onend = () => {
    instructions.innerHTML += " 👍</p>"
  }
  recognition.onerror = event => {
    console.log("error: " + event.error);
    instructions.innerHTML += "Error: " + event.error + ". Are you using Chrome?</p>"

  }
}
