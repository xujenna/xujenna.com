const synth = window.speechSynthesis;
let utterThis;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;

let turns = 0;
let transcriptIndex = 0;

let interactions = {
    speaking : false,
    listening : false,
    executeCommand : false,
    selectedCommand : {}
}

let absolutistWords = ["always", "never", "all the time", "absolutely", "completely", "constantly", "definitely", "every", "ever", "everything", "entire", "what about when you", "remember when you", "i hate when you", "not my fault", "it's your fault"]

let continueWords = ["i'm ready", "i'm done", "i am done", "next step", "we're ready", "we are ready", "next", "next step"]

let stepContent = {};

stepContent[0] = {};
stepContent[0]["playerNum"] = 0;
stepContent[0]["transcript"] = ["Please take a comfortable seat at the same level... ... First, establish which teammate had the original complaint; they are player one... ... ... Then, take turns reading each rule aloud. Let me know when you're ready."]
// stepContent[1]["transcript"] = "Please take a comfortable seat at the same level, maintain open body language, and face each other. <break time='1s'/> Take a moment to establish which teammate had the original complaint. They are player one. <break time='1s'/> Now close your eyes.[[slnc 2000]] We'll start with a breathing ritual. [[slnc 2500]] Breathe in for one, <break time='1s'/> two, <break time='1s'/> three, <break time='1s'/> four. <break time='1s'/> Back out for one <break time='1s'/>, two <break time='1s'/>, three <break time='1s'/>, four <break time='1s'/>. In for one, <break time='1s'/> two, <break time='1s'/> three, <break time='1s'/> four. <break time='1s'/> Out for one <break time='1s'/>, two <break time='1s'/>, three <break time='1s'/>, four <break time='1s'/>. In for one, <break time='1s'/> two, <break time='1s'/> three, <break time='1s'/> four. <break time='1s'/> Out for one <break time='1s'/>, two <break time='1s'/>, three <break time='1s'/>, four [[slnc 3000]]. You'll only get out alive if you communicate honestly and listen carefully, without assumptions. [[slnc 1500]] Focus on the challenge at hand; you will lose points for global statements, as well as excessive anger. [[slnc 1500]] The quest cannot be completed without the full cooperation of two people, so maintain a positive, generous, and compassionate attitude. [[slnc 1500]] Remember, there can only be either two winners, or two losers, so leave your ego and pride with me before you go. [[slnc 1500]] When a player completes their turn, let me know by saying [[slnc 500]] I'm done. [[slnc 3000]] Now open your eyes. Player one, let me know when you're ready, and we can begin."
stepContent[0]["nextSubstep"] = [];
stepContent[0]["bonus"] = [];
stepContent[0]["bonusWords"] = [];

stepContent[1] = {};
stepContent[1]["playerNum"] = 1;
stepContent[1]["transcript"] = ["Player 1: identify the complaint, not the criticism, by formulating the 'I' statement. Elaborate as necessary, using feeling words.", "...Define your emotional needs, elaborating as necessary, using feeling words."]
stepContent[1]["nextSubstep"] = ["i feel"]
stepContent[1]["bonus"] = ["<p>Acknowledge that their intention may not have been to hurt you: <br><b>'I recognize that you did not mean to _____ because _______'</b></p><p>Give examples of when your partner has done the positive/reverse of the complaint as an example of a solution: <br><b>'I really appreciate when you ________ in the past, because it made me feel _______.'</b></p>"];
stepContent[1]["bonusWords"] = ["i recognize", "you didn't mean", "you did not mean", "you didn't intend", "i appreciate", "i appreciated", "i really appreciate"]

stepContent[2] = {};
stepContent[2]["playerNum"] = 2;
stepContent[2]["transcript"] = ["Player 2: acknowledge their feelings by repeating their 'I' statement.", "...Consider and assert your responsibility, and explain your intentions or perspective using feeling words."]
stepContent[2]["nextSubstep"] = ["i understand"]
stepContent[2]["bonus"] = ["<p>Make positive statements that abate your partner's hurt feelings/address their insecurities: <br><b>'I'm sorry my actions made you feel neglected. I love your company and want to spend time with you.', or, 'I'm sorry my actions made you feel judged. I think it is great that you feel passionate about _____'</b></p>"];
stepContent[2]["bonusWords"] = ["i'm sorry", "caused you to feel", "i'm sorry my actions", "i'm sorry my behavior", "made you feel"]

stepContent[3] = {};
stepContent[3]["playerNum"] = 1;
stepContent[3]["transcript"] = ["Player 1: acknowledge their intentions, consider your role in your emotions, recognize any misunderstandings, and reevaluate your feelings based on the new information given."]
stepContent[3]["nextSubstep"] = []
stepContent[3]["bonus"] = ["<p>Acknowledge that their intention may not have been to hurt you: <br><b>'I recognize that you did not mean to _____ because _______'</b></p><p>Give examples of when your partner has done the positive/reverse of the complaint as an example of a solution: <br><b>'I appreciated when you ________ in the past, because it made me feel _______.'</b></p>"];
stepContent[3]["bonusWords"] = ["i recognize", "you didn't mean", "you did not mean", "you didn't intend", "i appreciate", "i appreciated", "i really appreciated"]

stepContent[4] = {};
stepContent[4]["playerNum"] = 2;
stepContent[4]["transcript"] = ["Player 2: address the complaint and propose a solution."]
stepContent[4]["nextSubstep"] = []
stepContent[4]["bonus"] = ["<p>Make positive statements that abate your partner's hurt feelings/address their insecurities: <br><b>'I'm sorry my actions made you feel neglected. I love your company and want to spend time with you.', or, 'I'm sorry my actions made you feel judged. I think it is great that you feel passionate about _____'</b></p>"];
stepContent[4]["bonusWords"] = ["i'm sorry", "caused you to feel", "i'm sorry my actions", "i'm sorry my behavior", "made you feel"]

stepContent[5] = {};
stepContent[5]["playerNum"] = 1;
stepContent[5]["transcript"] = ["Player 1: evaluate the solution, consider your needs honestly, and renegotiate based on your needs."]
stepContent[5]["nextSubstep"] = []
stepContent[5]["bonusWords"] = []

stepContent[6] = {};
stepContent[6]["playerNum"] = 2;
stepContent[6]["transcript"] = ["Player 2: if a solution has been agreed to, say we're done. Otherwise, continue negotiating, referring to steps 5 and 6 if needed."]
stepContent[6]["nextSubstep"] = []
stepContent[6]["bonusWords"] = []

let deEscalationScript = "Let's take a break to calm down and collect our thoughts, ideally in separate rooms. When you're ready, come back here, try to continue the conversation with one of the phrases on the screen."

let bonusCard = document.getElementById('bonus')
let scoreCard = document.getElementById("score");
let deEscalationCard = document.getElementById("de-escalation");

deEscalationCard.onclick = function(){
    recognition.stop();

    let deEscalationScreen = document.getElementById("de-escalationScreen");
    deEscalationScreen.style.display="block";
    deEscalationScreen.scrollIntoView({behavior:"smooth", block:"center"});
    speak(deEscalationScript);
}

// let continueButton = document.getElementById("deEscalate-continue");
// continueButton.onClick = function(){
//     nextStep();
// }

let scores = {};
scores["player1"] = {};
scores["player1"]["score"] = 0;
scores["player1"]["penalties"] = 0;
scores["player1"]["bonusPts"] = 0;
scores["player1"]["you"] = 0;
scores["player1"]["I"] = 0;
scores["player1"]["we"] = 0;

scores["player2"] = {};
scores["player2"]["score"] = 0;
scores["player2"]["penalties"] = 0;
scores["player2"]["bonusPts"] = 0;
scores["player2"]["you"] = 0;
scores["player2"]["I"] = 0;
scores["player2"]["we"] = 0;


async function speak(textInput) {

    if(synth.speaking || interactions.listening == true) {
        console.error('synth.speaking: ' + synth.speaking + '; interactions.listening: ' + interactions.listening)
        setTimeout( () => {
            interactions.speaking = true;
            recognition.stop();
            interactions.listening = false;
            utterThis = new SpeechSynthesisUtterance(textInput)
            synth.speak(utterThis) 
        }, 2500);
    }
    else if(interactions.listening == false){
        interactions.speaking = true;
        console.log("speaking: "+ interactions.speaking)
        utterThis = new SpeechSynthesisUtterance(textInput);
        await synth.speak(utterThis);
    }

}

let transcript = {};

function listen(){

    if(interactions.speaking == false){
        interactions.listening = true;
        recognition.start();
    }
    else{
        setTimeout(()=>{
            interactions.listening = true;
            recognition.start();
        },2500)
    }
    let newString = "";
    let offendingString;
    let bonusString;
    let finalString = "";
    let finalTranscript = "";

    let newBonus = document.getElementById('player' + stepContent[turns]["playerNum"] + 'bonus');
    let newPenalty = document.getElementById('player' + stepContent[turns]["playerNum"] + 'Penalties');
    let newScore = document.getElementById('player' + stepContent[turns]["playerNum"] + 'score');
    let youCount = document.getElementById('player' + stepContent[turns]["playerNum"] + 'yous');
    let iCount = document.getElementById('player' + stepContent[turns]["playerNum"] + 'Is');
    let weCount = document.getElementById('player' + stepContent[turns]["playerNum"] + 'Wes');

    recognition.onstart = () => {
        interactions.listening = true;
        console.log("listening: "+ interactions.listening)
    }
    recognition.onresult = event => {
        if (typeof (event.results) !== 'undefined') {
            for (var i = event.resultIndex; i < event.results.length; ++i) {

                if (event.results[i].isFinal) {
                    interactions.listening = false;
                    recognition.stop();
                    console.log("listening: "+ interactions.listening)

                    finalString = event.results[i][0].transcript.toLowerCase()

                    // thanks barak
                    // Boolean( absolutistWords.find( phrase => finalString.includes(phrase) ) )
                    // !!absolutistWords.find(p => finalString.match(`(^|[^a-z])(${p})($|[^a-z])`, 'g'))

                    if(!!absolutistWords.find(p => finalString.match(`(^|[^a-z])(${p})($|[^a-z])`, 'g')) && stepContent[turns]["playerNum"] !== 0){
                        interactions.listening = false;
                        recognition.stop();
                        console.log("listening: "+ interactions.listening)
                        
                        offendingString = nlp(event.results[i][0].transcript).normalize().out('text')
                        
                        transcript[turns]["offendingStrings"].push(offendingString);
                        console.log("offendingString: "+ offendingString)
                        newString += ("<span class='offendingString'>" + offendingString + ". </span>");

                        scores["player" + stepContent[turns]["playerNum"]]["penalties"] += 10;
                        newPenalty.textContent = scores["player" + stepContent[turns]["playerNum"]]["penalties"];

                        scores["player" + stepContent[turns]["playerNum"]]["score"] -= 10;
                        newScore.textContent = scores["player" + stepContent[turns]["playerNum"]]["score"];

                        speak("Avoid using global statements.")
                    }
                    else if(stepContent[turns]["bonusWords"].length > 0 && !!stepContent[turns]["bonusWords"].find(p => finalString.match(`(^|[^a-z])(${p})($|[^a-z])`, 'g'))){
                        interactions.listening = false;
                        recognition.stop();
                        console.log("bonus listening: "+ interactions.listening)

                        bonusString = nlp(event.results[i][0].transcript).normalize().out('text');
                        transcript[turns]["bonusStrings"].push(bonusString);
                        console.log("bonusString: "+ bonusString)
                        newString += ("<span class='bonusString'>" + bonusString + ". </span>");

                        scores["player" + stepContent[turns]["playerNum"]]["bonusPts"] += 10;
                        newBonus.textContent = scores["player" + stepContent[turns]["playerNum"]]["bonusPts"]
                        scores["player" + stepContent[turns]["playerNum"]]["score"] += 10;
                        newScore.textContent = scores["player" + stepContent[turns]["playerNum"]]["score"];
                    }
                    else{
                        newString += (nlp(event.results[i][0].transcript).normalize().out('text') + ". ");
                    }
                    console.log("newString: " + newString)
                    let NLPed = nlp(newString);
                    let tagged = NLPed.out('tags')
                    let transcriptArray = [];
                    let youToggle = "off"
                    
                    console.log("tagged", tagged)
                    tagged.forEach(obj => {
                        for (let [key, value] of Object.entries(obj)) {
                        console.log(`${key}: ${value}`);

                        if((key == "you"  || key == "you're") && youToggle == "off"){
                            youToggle = "on";
                            transcriptArray.push("<span class='you-underline'>");
                            transcriptArray.push(key);
                        }
                        else if(value.includes("Pronoun") && youToggle == "on"){
                            transcriptArray.push("</span>");
                            transcriptArray.push(key);
                            youToggle = "off";
                        }
                        else{
                            transcriptArray.push(key);
                        }
                        if(i == (tagged.length - 1) && youToggle == "on"){
                            transcriptArray.push("</span>");
                        }
                        
                        if(value.includes("Pronoun") && stepContent[turns]["playerNum"] !== 0){
                            if(key == "you" || key == "you're"){
                                scores["player" + stepContent[turns]["playerNum"]]["you"] += 1;
                                youCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["you"];
                            }
                            else if(key == "I" || key == "I'm"){
                                scores["player" + stepContent[turns]["playerNum"]]["I"] += 1;
                                iCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["I"];
                            }
                            else if(key == "we" || key == "we're"){
                                scores["player" + stepContent[turns]["playerNum"]]["we"] += 1;
                                weCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["we"];
                            }
                        }
                    }
                })

                    // tagged.forEach(function(d,i){
                    //     if((d.text == "you" || d.text == "you're") && youToggle == "off"){
                    //         youToggle = "on";
                    //         transcriptArray.push("<span class='you-underline'>");
                    //         transcriptArray.push(d.text);
                    //     }
                    //     else if(d['tags'].includes("Pronoun") && youToggle == "on"){
                    //         transcriptArray.push("</span>");
                    //         transcriptArray.push(d.text);
                    //         youToggle = "off";
                    //     }
                    //     else{
                    //         transcriptArray.push(d.text);
                    //     }

                    //     if(i == (tagged.length - 1) && youToggle == "on"){
                    //         transcriptArray.push("</span>");
                    //     }
                        
                    //     if(d['tags'].includes("Pronoun") && stepContent[turns]["playerNum"] !== 0){
                    //         if(d.text == "you" || d.text == "you're"){
                    //             scores["player" + stepContent[turns]["playerNum"]]["you"] += 1;
                    //             youCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["you"];
                    //         }
                    //         else if(d.text == "I" || d.text == "I'm"){
                    //             scores["player" + stepContent[turns]["playerNum"]]["I"] += 1;
                    //             iCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["I"];
                    //         }
                    //         else if(d.text == "we" || d.text == "we're"){
                    //             scores["player" + stepContent[turns]["playerNum"]]["we"] += 1;
                    //             weCount.textContent = scores["player" + stepContent[turns]["playerNum"]]["we"];
                    //         }
                    //     }
                    // })

                    transcriptArray.forEach(function(d){
                        finalTranscript += d + " "
                    })
                    console.log("finalTranscript: " + finalTranscript)
                    // console.log(event.results[i][0].transcript)
                    // newString += (event.results[i][0].transcript + ". ");
                }
            }
        }
    }
    recognition.onend = () => {
        interactions.listening = false;
        recognition.stop();
        console.log("listening: "+ interactions.listening)

        if(stepContent[turns]["playerNum"] > 0){
            transcript[turns]['transcript'] += finalTranscript;
        }

        if(!!continueWords.find(p => finalString.match(`(^|[^a-z])(${p})($|[^a-z])`, 'g'))){
            // recognition.stop();
            if(stepContent[turns]["playerNum"] > 0){
                scores["player" + stepContent[turns]["playerNum"]]["score"] += 10;
                newScore.textContent = scores["player" + stepContent[turns]["playerNum"]]["score"];
                transcribeStep(turns);
            }
            console.log(transcript);
            console.log(scores);

            transcriptIndex = 0;
            turns += 1;
            
            if((stepContent[turns]["nextSubstep"].length) == transcriptIndex && stepContent[turns]["bonus"] !== undefined){
                bonusCard.style.display = "block"
                bonusCard.innerHTML = "<p><b>BONUS</b></p>" + stepContent[turns]["bonus"];
            }
            else{
                bonusCard.style.display = "none"
            }

            transcript[turns] = {};
            transcript[turns]["transcript"] = "";
            transcript[turns]["offendingStrings"] = [];
            transcript[turns]["bonusStrings"] = [];

            nextStep();
        }

        else if(stepContent[turns]["nextSubstep"].length > 0 && transcriptIndex < stepContent[turns]["nextSubstep"].length && !!stepContent[turns]["nextSubstep"].find(p => finalString.match(`(^|[^a-z])(${p})($|[^a-z])`, 'g'))){
        // else if(stepContent[turns]["nextSubstep"].length > 0 && new RegExp(stepContent[turns]["nextSubstep"].join("|")).test(newString)){
            transcriptIndex += 1;
            if((stepContent[turns]["nextSubstep"].length) == transcriptIndex && stepContent[turns]["bonus"] !== undefined){
                bonusCard.style.display = "block"
                bonusCard.innerHTML = "<p><b>BONUS</b></p>" + stepContent[turns]["bonus"];
            }
            else{
                bonusCard.style.display = "none"
            }
            nextStep();
        }
        else if(finalString.includes("we're done", "we are done", "the challenge has been completed")){
            recognition.stop();
            let theEnd = document.getElementById("theEnd");
            theEnd.style.display="block";
            theEnd.scrollIntoView({behavior:"smooth", block:"center"});
        }
        else{
            recognition.stop();
            listen();
        }
    }
    recognition.onerror = event => {
        recognition.stop();
        console.log("error" + event.error);
        listen();
    }
}

function nextStep(){

    if(turns==0){
        bonusCard.style.display = "block";
        deEscalationCard.style.display = "block";
        scoreCard.style.display = "block";
    }

    let currentStep = document.getElementById("step"+turns+"_"+transcriptIndex);
    currentStep.style.display="block";
    currentStep.scrollIntoView({behavior:"smooth", block:"center"});
    speak(stepContent[turns]["transcript"][transcriptIndex]);

    utterThis.addEventListener('start', function(event){
        interactions.speaking = true;
        console.log("speaking: " + interactions.speaking);
    });
    utterThis.addEventListener('end', function(event){
        interactions.speaking = false;
        console.log("speaking: " + interactions.speaking);
        listen();
    });
    utterThis.addEventListener('error', function(event){
        console.log("error: "+ event.error)
    });

    // turns += 1;
}

function transcribeStep(turnNum){
    console.log(transcript[turnNum])
    // playerNum = stepContent[turnNum]["playerNum"]
    // sentiment analysis
    // penalty if angry, bonus if happy

    let currentTranscriptDiv = document.getElementById('transcript'+turnNum)
    currentTranscriptDiv.style.display = "block"
    let newTranscriptP = document.createElement('p');
    currentTranscriptDiv.appendChild(newTranscriptP);
    newTranscriptP.innerHTML = transcript[turnNum]['transcript'];
    newTranscriptP.contentEditable = "true";

    // highlight: you + adverb || verb
    // highlight: I || we + adverb || verb
    // hightlight and penalize: more than one "dates"
}
