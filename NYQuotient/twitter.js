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
let pizzaW2V = new Word2Vec('w2v_models/pizza_tsne.json', modelLoaded);
let trumpW2V = new Word2Vec('w2v_models/trump_tsne.json', modelLoaded);
let MTAW2V = new Word2Vec('w2v_models/MTA_tsne.json', modelLoaded);
let cuomoW2V = new Word2Vec('w2v_models/cuomo_tsne.json', modelLoaded);
let kanyeW2V = new Word2Vec('w2v_models/kanye_tsne.json', modelLoaded);
let amazonW2V = new Word2Vec('w2v_models/amazon_tsne.json', modelLoaded);
let seduceMeW2V = new Word2Vec('w2v_models/SeduceMeIn4Words_tsne.json', modelLoaded);

let allModels = [pizzaW2V, trumpW2V, MTAW2V, cuomoW2V, kanyeW2V, amazonW2V, seduceMeW2V]
let allStarters = ["pizza", "trump", "mta", "cuomo", "kanye", "amazon", "#seducemein4words"]
const SpeechRecognition = webkitSpeechRecognition;
const synth = window.speechSynthesis;

let playerOneScore = 0;
let playerOneDistance = 0;
let playerOneTimePenalty = 0;
let playerTwoScore = 0;
let playerTwoDistance = 0;
let playerTwoTimePenalty = 0;
let data;
let data_keys;
let counter;
let playerNum = 0;
// let body = document.querySelector("body");
let tryAgain = false;
let turnBar = document.getElementById('turnBar');
let statCards = document.querySelectorAll('.playerStats');
let turns;
let xMax, xMin, yMax, yMin;
let originCoords;
let starter;
let gameNum = 0;
let demoDiv = document.getElementById('demo');
let startButton = document.getElementById('start-button');

for(var i = 0; i < allModels.length; i++){
 d3.select("#tsneSVG")
  .append("svg:svg")
  .attr("width", (window.innerWidth))
  .attr("height", (window.innerHeight - 100))
  .attr("id", "SVGnum" + i);
}

let SVGlist = document.querySelectorAll("#tsneSVG > svg");


async function speak(textInput) {
  if (synth.speaking) {
    console.error('already speaking')
    setTimeout(function () {
      let utterThis = new SpeechSynthesisUtterance(textInput)
      synth.speak(utterThis) 
    }, 2000);
  }
  else{
    let utterThis = new SpeechSynthesisUtterance(textInput)
    await synth.speak(utterThis)
  }
}


let modelsLoaded = 0;

function modelLoaded() {
  modelsLoaded += 1;
  if (modelsLoaded == allModels.length) {
    document.getElementById('start-button').innerHTML = "<button onclick='start();'>START GAME</button>";
  }
}


function demo(){
  startButton.style.display="none";

  let demoSVG = d3.select("#demo")
    .append("svg:svg")
    .attr("width", (window.innerWidth))
    .attr("height", (window.innerHeight));

  demoDiv.scrollIntoView({behavior:"smooth", block:"center"});

  clearStats();
  statCards.forEach(function(d){d.style.display="block"});
  document.getElementById('countDown').style.display = "inline-block";

  demoSVG.selectAll("text").remove()
  demoSVG.selectAll("line").remove()
  demoSVG.selectAll("circle").remove()


  function demoCountDown() {
    demoCount += 1;
    if(demoCount < 10){
      document.getElementById('countDown').textContent = "00:0" + demoCount;
    }
    else if (demoCount >= 10){
      document.getElementById('countDown').textContent = "00:" + demoCount;
    }
  }

  let turnBar = document.getElementById("turnBar");
  let playerIndicator = document.getElementById('player');
  playerIndicator.textContent = "PLAYER 1 TURN"
  turnBar.style.backgroundColor = "orangered";

  speak("cat");
  let demoCount = 0;
  let demoCounter = setInterval(demoCountDown, 1000);
  let demoCounter2;
  let demoCounter3;
  let demoCounter4;

  let randomX = Math.random() * (window.innerWidth - 800) + 400;
  let randomY = Math.random() * (window.innerHeight - 500) + 250;
  demoSVG.append("circle")
    .attr("cx", randomX)
    .attr("cy", randomY)
    .attr("r", 4)
    .attr("fill", "dimgray");
  demoSVG.append("text")
    .text("cat")
    .attr("x", randomX + 10)
    .attr("y", randomY + 5)
    .attr("id", "newEmbeddingText")
    .attr("class", "player0text");


  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 1.5; //0 to 2
  msg.text = 'so cute';
  msg.lang = 'en-US';
  setTimeout(function(){ 
    speechSynthesis.speak(msg);
    setTimeout(function(){
      clearInterval(demoCounter);
      demoTurn(msg.text, 1);
    }, 800);
  }, 1500);

var msg2 = new SpeechSynthesisUtterance();
msg2.voice = voices[5]; // Note: some voices don't support altering params
msg2.voiceURI = 'native';
msg2.volume = 1; // 0 to 1
msg2.rate = 1; // 0.1 to 10
msg2.pitch = 1; //0 to 2
msg2.text = 'very fluffy';
msg2.lang = 'en-US';

setTimeout(function(){
  clearInterval(demoCounter);
  demoCount = 0;
  demoCounter2 = setInterval(demoCountDown, 1000);  
  playerIndicator.textContent = "PLAYER 2 TURN";
  turnBar.style.backgroundColor = "dodgerblue";
  speechSynthesis.speak(msg2);
  setTimeout(function(){
    clearInterval(demoCounter2)
    demoTurn(msg2.text, 2);
  }, 1000);}, 3000);


  setTimeout(function(){
    demoSVG.selectAll("text").remove()
    demoSVG.selectAll("line").remove()
    demoSVG.selectAll("circle").remove();

    speak("dog");
    demoCount = 0;
    demoCounter3 = setInterval(demoCountDown, 1000);   

  randomX = Math.random() * (window.innerWidth - 800) + 400;
  randomY = Math.random() * (window.innerHeight - 500) + 250;
  demoSVG.append("circle")
    .attr("cx", randomX)
    .attr("cy", randomY)
    .attr("r", 4)
    .attr("fill", "dimgray");
  demoSVG.append("text")
    .text("dog")
    .attr("x", randomX + 10)
    .attr("y", randomY + 5)
    .attr("id", "newEmbeddingText")
    .attr("class", "player0text");
    playerIndicator.textContent = "PLAYER 1 TURN";
    turnBar.style.backgroundColor = "orangered";
  }, 5000);

  setTimeout(function(){
    msg.text = "i want one"
    speechSynthesis.speak(msg);
    setTimeout(function(){
      clearInterval(demoCounter3)
      demoTurn(msg.text, 1);
      }, 800);
  }, 6500);

  setTimeout(function(){
    demoCount = 0;
    demoCounter4 = setInterval(demoCountDown, 1000);   
    playerIndicator.textContent = "PLAYER 2 TURN";
    turnBar.style.backgroundColor = "dodgerblue";
    msg2.text = "they're good dogs brent"
    speechSynthesis.speak(msg2);
    setTimeout(function(){
      clearInterval(demoCounter4)
      demoTurn(msg2.text, 2);
      startButton.style.display="block";
    }, 1500);
  }, 8500);


  function demoTurn(string, playerNum){
    let words = string.split(" ");
    let totalDistance = 0;
    words.forEach(function(d){
      let word = d;
      let xCoord = Math.random() * (window.innerWidth - 400) + 200;
      let yCoord = Math.random() * (window.innerHeight - 300) + 150;

      let a = randomX - xCoord;
      let b = randomY - yCoord;
      totalDistance += Math.sqrt(a*a + b*b);

      var path = demoSVG.append("line")
      .attr("x1", randomX)
      .attr("y1", randomY)
      .attr("x2", xCoord)
      .attr("y2", yCoord)
      .attr("class", "player" + playerNum + "line")
      .attr("stroke-width", 3)
      .attr("opacity", 0.6)
    
    var totalLength = path.node().getTotalLength();
    
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(250)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", function (d) { path.attr("stroke-dasharray", 3); plotDemoWord(word, playerNum, xCoord, yCoord); })
    })
  
  function plotDemoWord(word,playerNum, xCoord, yCoord) {
    demoSVG.append("text")
    .text(word)
    .attr("x", xCoord + 10)
    .attr("y", yCoord + 5)
    .attr("id", "embeddingText")
    .attr("class", "player" + playerNum + "text");
    demoSVG.append("circle")
    .attr("cx", xCoord)
    .attr("cy", yCoord)
    .attr("r", 4)
    .attr("fill", "silver")
    .attr("class", "player" + playerNum + "text");
  }


  let demoTimePenalty = Math.pow(demoCount, 2) * 10;

  if (playerNum == 1) {
    playerOneScore += Math.round(100000/ Math.round(totalDistance));
    playerOneDistance += Math.round(totalDistance);
    playerOneTimePenalty += demoTimePenalty;
    document.getElementById('playerOneScore').textContent = playerOneScore;
    document.getElementById('playerOneDistance').textContent = playerOneDistance;
    document.getElementById('playerOneTimePenalty').textContent = playerOneTimePenalty;
  }
  else if (playerNum == 2) {
    playerTwoScore += Math.round(100000/ Math.round(totalDistance));
    playerTwoDistance += Math.round(totalDistance);
    playerTwoTimePenalty += demoTimePenalty;
    document.getElementById('playerTwoScore').textContent = playerTwoScore;
    document.getElementById('playerTwoDistance').textContent = playerTwoDistance;
    document.getElementById('playerTwoTimePenalty').textContent = playerTwoTimePenalty;
  }

}
}

function micTest() {
  let instructions = document.getElementById('micTest');
  instructions.innerHTML += "<p style='text-decoration:none'><i>Give your mic permission, then say something. The transcript will appear here:</i></p> "
  
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();


  recognition.onresult = event => {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        recognition.stop();
        instructions.innerHTML += "<p>" + event.results[i][0].transcript + "</p>";
      }
      // else{
      //   interim_transcript += event.results[i][0].transcript;
      // }
    }
  }
  recognition.onend = () => {
    // instructions.textContent += " 👍"
  }
  recognition.onerror = event => {
    console.log("error: " + event.error);
    instructions.innerHTML += "<b><span style='color:red'> Error: " + event.error + ". </span></b>"
  }
}


function clearStats(){
  document.getElementById('playerOneScore').textContent = 0;
  document.getElementById('playerOneDistance').textContent = 0;
  document.getElementById('playerOneTimePenalty').textContent = 0;
  document.getElementById('playerTwoScore').textContent = 0;
  document.getElementById('playerTwoDistance').textContent = 0;
  document.getElementById('playerTwoTimePenalty').textContent = 0;
}

function start() {
  clearInterval(counter);

  playerNum = 0;
  turns = 0;
  let data = Object.keys(allModels[gameNum].model).map(k => allModels[gameNum].model[k].dataSync());
  xMax = d3.max(data, function (d) { return d[0] });
  xMin = d3.min(data, function (d) { return d[0] });
  yMax = d3.max(data, function (d) { return d[1] });
  yMin = d3.min(data, function (d) { return d[1] });

  if(gameNum == 0){
    clearStats();
    SVGlist[gameNum].style.display = "block";
    turnBar.style.backgroundColor = "grey";
    document.getElementById('player').textContent = "";
    demoDiv.style.display ="none";
    startButton.style.display="none";
    document.getElementById('homepage').style.display = "none";
    document.getElementById('footer').style.display="none"

    statCards.forEach(function (d) {
      d.style.display = "inline-block";
    })
    document.getElementById("highScore").style.display = "none";
    document.getElementById('countDown').style.display = "inline-block";

  }
  else if(gameNum > 0){
    SVGlist[gameNum-1].style.display = "none";
    SVGlist[gameNum].style.display = "block";
  }


  starter = allStarters[gameNum];

  // document.getElementById('currentWord').textContent = starter;
  getCoordinates(starter, 0, 0, 0);
  if (starter == "mta") {
    speak("m.t.a.")
    setTimeout(function () { newTurn(); }, 1000);
  }
  else if (starter =="#seducemein4words"){
    speak("Hashtag Seduce Me In Four Words")
    setTimeout(function () { newTurn(); }, 1800);
  }
  else {
    speak(starter);
    setTimeout(function () { newTurn(); }, 800);
  }
}


function newTurn() {
  clearInterval(counter);
  let count = 0;
  counter = setInterval(function () {
    count += 1;
    if(count < 10){
      document.getElementById('countDown').textContent = "00:0" + count;
    }
    else if (count >= 10){
      document.getElementById('countDown').textContent = "00:" + count;
    }
  }, 1000);

  if (tryAgain == true) {
    tryAgain = false;
    turns -= 1;
  }
  else {
    if (playerNum == 0 || playerNum == 2) {
      playerNum = 1;
      turnBar.style.backgroundColor = "orangered";
    }
    else {
      playerNum = 2;
      turnBar.style.backgroundColor = "dodgerblue";
    }
  }
  console.log("newTurn PlayerNum: " + playerNum)

  document.getElementById('player').textContent = "PLAYER " + playerNum + " TURN";

  let newString = "";
  let timePenalty;
  // var interim_transcript = "";
  // var final_transcript = "";

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();


  recognition.onresult = event => {

    if (typeof (event.results) !== 'undefined') {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          recognition.stop();
          newString += event.results[i][0].transcript;
        }
        // else{
        //   interim_transcript += event.results[i][0].transcript;
        // }
      }
      document.getElementById('tryAgain').textContent = "";
      timePenalty = Math.pow(count, 2) * 10;
      //console.log("time penalty: " + timePenalty)
      clearInterval(counter);

      newString = newString.toLowerCase();
      //console.log(newString)
    }
    else {
      speak(event.results + " wasn't tweeted!")
      setTimeout(function () { start() }, 2500);
    }
    // if(event.results[0][0].transcript !== undefined){
    //   recognition.stop();

    // }

  }
  recognition.onend = () => {
    console.log("ended recording");
    // try {  

    if(newString.length > 0){
      // let plotScores = document.querySelectorAll(".plotScore");
      // if(plotScores.length > 0){
      // plotScores.forEach(function(d){d.remove();})
      // }
      let totalDistance = Math.round(distance(newString, timePenalty, playerNum));
  
      if(totalDistance >=0){
        // let newScore = Math.pow(totalDistance,2) / 100;
        let newScore = Math.round(100000 / (totalDistance + timePenalty));
        // let newScore = totalDistance+timePenalty;
        console.log("score: " + newScore)
        console.log("distance: " + totalDistance)
        console.log("timePenalty: " + timePenalty)  
        if (playerNum == 1) {
          playerOneScore += newScore;
          playerOneDistance += totalDistance;
          playerOneTimePenalty += timePenalty;
          document.getElementById('playerOneScore').textContent = playerOneScore;
          document.getElementById('playerOneDistance').textContent = playerOneDistance;
          document.getElementById('playerOneTimePenalty').textContent = playerOneTimePenalty;
          console.log("player 1 gets " + newScore)
        }
        else if (playerNum == 2) {
          playerTwoScore += newScore;
          playerTwoDistance += totalDistance;
          playerTwoTimePenalty += timePenalty;
          document.getElementById('playerTwoScore').textContent = playerTwoScore;
          document.getElementById('playerTwoDistance').textContent = playerTwoDistance;
          document.getElementById('playerTwoTimePenalty').textContent = playerTwoTimePenalty;
          console.log("player 2 gets " + newScore)
        }
  
        turns += 1;
  
        if (turns == 2) {
          gameNum += 1;
          if (gameNum == allModels.length) {
            setTimeout(function () { gameOver(); }, 1000);
          }
          else {
            setTimeout(function () { start() }, 2000);
          }
        }
        else {
          newTurn();
        }
      }
      else {
        speak(newString + " not in model.")
        turns += 1;
  
        if (turns == 2) {
          gameNum += 1;
          if (gameNum == allModels.length) {
            setTimeout(function () { gameOver(); }, 1000);
          }
          else {
            setTimeout(function () { start() }, 2000);
          }
        }
        else {
          setTimeout(function () { newTurn() }, 3000);
        }
      }
    }

    }
  recognition.onerror = event => {
    console.log("error: " + event.error);
    if (event.error == "no-speech") {
      speak("Time's up!")

      turns += 1;

      if (turns == 2) {
        gameNum += 1;
        if (gameNum == allModels.length) {
          setTimeout(function () { gameOver(); }, 1000);
        }
        else {
          setTimeout(function () { start(); }, 1800);
        }
      }
      else {
        setTimeout(function () { newTurn() }, 1800);
      }
   
    }
  }
}


const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


function getCoordinates(word, distance, timePenalty, playerNum) {
let currentSVG = d3.select(SVGlist[gameNum]);

  if(playerNum > 0){
  let prevEmbedding = document.querySelectorAll('#newEmbeddingText');
  prevEmbedding.forEach(function(d){
    d.removeAttribute("id");
    // d.classList.add("embeddingText");
    d.setAttribute("id", "embeddingText")
  })
  }


  // words.forEach(function(d){
  // try{
  // let word = d;
  // if(word == "f***"){
  //   word = "fuck";
  // }
  // else if (word == "f*****"){
  //   word = "fucked";
  // }
  distance = Math.round(distance)
  console.log("getCoordinates word :" + word)
  let tsneCoords = allModels[gameNum]['model'][word].dataSync();

  let xCoord = scale(tsneCoords[0], xMin, xMax, 0, (window.innerWidth * 0.87));
  let yCoord = scale(tsneCoords[1], yMin, yMax, 0, (window.innerHeight * 0.88));

  if (playerNum == 0) {
    plotFirstWord(word, xCoord, yCoord);
    originCoords = [xCoord, yCoord];
  }
  else if (playerNum !== 0) {
    // currentSVG.append("text")
    //   .text("-" + distance + " distance")
    //   .attr("x", xCoord + 5)
    //   .attr("y", yCoord + 30)
    //   .attr("fill", "silver")
    //   .attr("class", "plotScore");
    // currentSVG.append("text")
    //   .text("-" + timePenalty + " time")
    //   .attr("x", xCoord + 5)
    //   .attr("y", yCoord + 52)
    //   .attr("fill", "silver")
    //   .attr("class", "plotScore");

    console.log("getCoords playerNum: " + playerNum)
    let lineClass = "player" + playerNum + "line";
    var path = currentSVG.append("line")
      .attr("x1", originCoords[0])
      .attr("y1", originCoords[1])
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
      .attr("stroke-dashoffset", 0)
      .on("end", function (d) { path.attr("stroke-dasharray", 3); plotWord(word, xCoord, yCoord, playerNum); })
  }
  // }
  // catch{
  //   return;
  // }

  // })
  function plotFirstWord(d, xCoord, yCoord) {
    if(d == "#seducemein4words"){
      d = "#SeduceMeIn4Words";
    }
  for(var i = 0; i < 10; i++){
    currentSVG.append("circle")
      .attr("cx", xCoord)
      .attr("cy", yCoord)
      .attr("r", 90 * i)
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("class", "concentricCircles");
    }
    currentSVG.append("circle")
      .attr("cx", xCoord)
      .attr("cy", yCoord)
      .attr("r", 4)
      .attr("fill", "dimgray");
      currentSVG.append("text")
      .text(d)
      .attr("x", xCoord + 10)
      .attr("y", yCoord + 5)
      .attr("class", "newEmbeddingText")
      .attr("class", "player0text");
  }

  function plotWord(d, xCoord, yCoord, playerNum) {
    console.log("plotWord playerNum: " + playerNum)

    currentSVG.append("text")
      .text(d)
      .attr("x", xCoord + 10)
      .attr("y", yCoord + 5)
      .attr("id", "newEmbeddingText")
      .attr("class", "player" + playerNum + "text");
      currentSVG.append("circle")
      .attr("cx", xCoord)
      .attr("cy", yCoord)
      .attr("r", 4)
      .attr("fill", "silver")
      .attr("class", "player" + playerNum + "text");
  }
}

function distance(string, timePenalty, playerNum) {
  let totalDistance = 0;
  let words = string.split(' ')
  if (playerNum > 0) {
    var index = words.indexOf(allStarters[gameNum])
    if (index > -1) {
      words.splice(index, 1);
    }
  }

  let successfulWords = 0;

  words.forEach(function (d) {
    console.log(d)
    if (d == "f***") {
      d = "fuck";
    }
    else if (d == "f*****") {
      d = "fucked";
    }
    //console.log(d)


    // try{

    if (allModels[gameNum].model[d] && allModels[gameNum].model[starter]) {
      let result = tf.util.distSquared(allModels[gameNum].model[d].dataSync(), allModels[gameNum].model[starter].dataSync());
      totalDistance += result;
      getCoordinates(d, result, timePenalty, playerNum)
      successfulWords += 1;
    } else {
      console.log('missing word ' + d + ' ' + starter);
    }
    // }
    // catch{
    //   console.log('missing word ' + d);
    //   //return;
    // }

  })
  if (successfulWords > 0) {
    let avgDistance = totalDistance / successfulWords;
    return avgDistance;
  } else {
    return -1;
  }
}

function gameOver() {
  clearInterval(counter);
  if (playerOneScore > playerTwoScore) {
    playerNum = 1;
  }
  else {
    playerNum = 2;
  }
  document.getElementById('player').textContent = "PLAYER " + playerNum + " WINS!!";
  document.getElementById('timer').style.display = "none";
  document.getElementById('error').style.display = "none";

  let buttonContainer = document.getElementById('restartButtonContainer');
  buttonContainer.style.display = "inline-block"
  buttonContainer.innerHTML = '<button onclick="showSVG(0);">pizza</button><button onclick="showSVG(1);">Trump</button><button onclick="showSVG(2);">MTA</button><button onclick="showSVG(3);">Cuomo</button><button onclick="showSVG(4);">Kanye</button><button onclick="showSVG(5);">Amazon</button><button onclick="showSVG(6);">#SeduceMeIn4Words</button>'

  let restartButton = startButton.cloneNode(true);
  restartButton.innerHTML = "<button onclick='window.location.href = \"https://xujenna.com/NYQuotient/\";'>RESTART GAME</button>";
  restartButton.style.zIndex = 1000
  restartButton.style.display="block";
  restartButton.select
  let canvas = document.getElementById("tsneSVG")
  canvas.appendChild(restartButton)

  document.getElementById('tryAgain').textContent = "";

  // statCards.forEach(function(d){
  //   d.style.display = "inline-block";
  // })

  speak("Player " + playerNum + " wins!")

  // document.getElementById('restart-button').style.display= "block";



  let winningScore = 0;
  if (playerNum == 1) {
    turnBar.style.backgroundColor = "orangered";
    winningScore = playerOneScore;
    winningDistance = playerOneDistance;
    winningTimePenalty = playerOneTimePenalty;
  }
  else if (playerNum == 2) {
    turnBar.style.backgroundColor = "dodgerblue";
    winningScore = playerTwoScore;
    winningDistance = playerTwoDistance;
    winningTimePenalty = playerTwoTimePenalty;
  }

  document.getElementById('playerOneScore').textContent = playerOneScore;
  document.getElementById('playerOneDistance').textContent = playerOneDistance;
  document.getElementById('playerOneTimePenalty').textContent = playerOneTimePenalty;
  document.getElementById('playerTwoScore').textContent = playerTwoScore;
  document.getElementById('playerTwoDistance').textContent = playerTwoDistance;
  document.getElementById('playerTwoTimePenalty').textContent = playerTwoTimePenalty;

  // if(gameNum == 5){
  let minThreshold;
  let scoresDB = database.ref('/twitter_scores/');

  scoresDB.on('value', (snapshot) => {
    let scores = snapshot.val();
    if(scores !== undefined && scores !== null){
      let scoresKeys = Object.keys(scores).sort(function (a, b) { return b - a });
      if (scoresKeys.length < 10) {
        // minThreshold = scoresKeys[scoresKeys.length-1]
        minThreshold = 0;
      }
      else {
        minThreshold = scoresKeys[9];
      }
    }
    else{
      minThreshold = 0;
    }


    console.log("winningScore: " + winningScore)
    console.log("minThreshold: " + minThreshold)

    if (winningScore >= minThreshold) {
      console.log("high score")
      highScore(playerNum, winningScore, winningDistance, winningTimePenalty);
    }
    else if (winningScore < minThreshold) {
      // let fromHighScore = "False";
      highScoreBoard();
    }
  })
  // }
  // else if(gameNum < 5){
  //   gameNum += 1;
  //   setTimeout(function(){start();}, 5000);
  // }
  return;
}

function showSVG(SVGnum){
  let allSVGs = document.querySelectorAll("#tsneSVG > svg");
  allSVGs.forEach(function(d){
    d.style.display = "none"
  })
  allSVGs[SVGnum].style.display="block"
}

function highScore(playerNum, totalScore, totalDistance, totalTimePenalty) {
  console.log("in highScore")

  let highScoreDiv = document.getElementById("highScore");

  let ps = highScoreDiv.querySelectorAll('p');
  ps.forEach(function (d) { highScoreDiv.removeChild(d) });

  highScoreDiv.style.display = "block";
  let highScoreInput = document.getElementById("hiScore_name");
  highScoreInput.style.display = "inline-block";
  highScoreInput.placeholder = "Player " + playerNum + " Name";
  let submitButton = document.getElementById("submitHighScore");
  submitButton.style.display = "inline-block";

  let time = Date.now();
  let key = "/twitter_scores/" + totalScore;
  let newGameEntry = {};

  newGameEntry["time"] = time;
  newGameEntry["totalScore"] = totalScore;
  newGameEntry["totalDistance"] = totalDistance;
  newGameEntry["totalTimePenalty"] = totalTimePenalty;

  submitButton.onclick = function () {
    newGameEntry["playerName"] = highScoreInput.value;
    database.ref(key).set(newGameEntry);
    // let fromHighScore = "True"
    // highScoreDiv(fromHighScore);

    submitButton.style.display = "none"
    document.querySelector("#highScore > h1").textContent = "High Scores";
    highScoreInput.style.display = "none";

    let scoresDB = database.ref('/twitter_scores/');
    scoresDB.on('value', (snapshot) => {
      let scores = snapshot.val();
      let scoresKeys = Object.keys(scores).sort(function (a, b) { return b - a });
      scoresKeys.forEach(function (d,i) {
        if(i<=10){
          let entry = document.createElement('p')
          entry.textContent = scores[d]['playerName'] + ": " + d;
          highScoreDiv.appendChild(entry)
        }
      })
    })
  }

  document.getElementById('closeHighScore').onclick = function () {
    highScoreDiv.style.display = "none";
  }
}


function highScoreBoard() {
  console.log("in highScoreBoard")
  let highScoreDiv = document.getElementById("highScore");
  highScoreDiv.style.display = "block";

  document.getElementById("submitHighScore").style.display = "none"
  document.querySelector("#highScore > h1").textContent = "High Scores";
  document.getElementById("hiScore_name").style.display = "none";

  let scoresDB = database.ref('/twitter_scores/');
  scoresDB.on('value', (snapshot) => {
    let scores = snapshot.val();
    let scoresKeys = Object.keys(scores).sort(function (a, b) { return b - a });
    scoresKeys.forEach(function (d,i) {
      if(i<=10){
        let entry = document.createElement('p')
        entry.textContent = scores[d]['playerName'] + ": " + d;
        highScoreDiv.appendChild(entry)
      }
    })
  })
  document.getElementById('closeHighScore').onclick = function () {
    let ps = highScoreDiv.querySelectorAll('p');
    ps.forEach(function (d) { highScoreDiv.removeChild(d) });
    highScoreDiv.style.display = "none";
  }
}