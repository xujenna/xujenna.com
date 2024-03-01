const SpeechRecognition = webkitSpeechRecognition;
const synth = window.speechSynthesis;
let utterThis;

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;


let turns = 0;
let transcriptIndex = 0;

let interactions = {
    speaking: false,
    listening: false,
    // executeCommand: false,
    // selectedCommand: {}
}

let absolutistWords = ["always", "never", "all the time", "absolutely", "completely", "constantly", "constant", "definitely", "every", "ever", "everything", "entire", "all", "what about when you", "remember when you", "i hate when you", "not my fault", "it's your fault"]

let stepContent = {};

stepContent[0] = {};
stepContent[0]["playerNum"] = 0;
stepContent[0]["transcript"] = ["Please take a comfortable seat at the same level. [[slnc 1000]] Take a moment to establish which teammate had the original complaint."]
// stepContent[1]["transcript"] = "Please take a comfortable seat at the same level, maintain open body language, and face each other. [[slnc 1000]] Take a moment to establish which teammate had the original complaint. They are player one. [[slnc 1000]] Now close your eyes.[[slnc 2000]] We'll start with a breathing ritual. [[slnc 2500]] Breathe in for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Back out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 1000]]. In for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 1000]]. In for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 3000]]. You'll only get out alive if you communicate honestly and listen carefully, without assumptions. [[slnc 1500]] Focus on the challenge at hand; you will lose points for global statements, as well as excessive anger. [[slnc 1500]] The quest cannot be completed without the full cooperation of two people, so maintain a positive, generous, and compassionate attitude. [[slnc 1500]] Remember, there can only be either two winners, or two losers, so leave your ego and pride with me before you go. [[slnc 1500]] When a player completes their turn, let me know by saying [[slnc 500]] I'm done. [[slnc 3000]] Now open your eyes. Player one, let me know when you're ready, and we can begin."
stepContent[0]["nextSubstep"] = []
stepContent[0]["bonuses"] = []

stepContent[1] = {};
stepContent[1]["playerNum"] = 1;
stepContent[1]["transcript"] = ["Player 1: identify the complaint, not the criticism, by formulating the 'I' statement. Elaborate as necessary, using feeling words. [[slnc 1000]] Consider and include assertions of individual responsibility, self-disclosure, and empathy.", "[[slnc 1500]] Define your emotional needs, elaborating as necessary, using feeling words. [[slnc 1000]] Let me know when you're done."]
stepContent[1]["nextSubstep"] = ["i feel"]
stepContent[1]["bonuses"] = ["i recognize", "you didn't mean", "you did not mean", "you didn't intend", "i appreciate", "i appreciated"]

stepContent[2] = {};
stepContent[2]["playerNum"] = 2;
stepContent[2]["transcript"] = ["Player 2: acknowledge their feelings by repeating their 'I' statement.", "[[slnc 1000]] Consider and assert your responsibility, and explain your intentions or perspective using feeling words."]
stepContent[2]["nextSubstep"] = ["i understand that you feel"]
stepContent[2]["bonuses"] = ["i'm sorry", "caused you to feel", "i'm sorry my actions", "i'm sorry my behavior", "made you feel"]

stepContent[3] = {};
stepContent[3]["playerNum"] = 1;
stepContent[3]["transcript"] = ["Player 1: acknowledge their intentions, consider your role in your emotions, recognize any misunderstandings, and reevaluate your feelings based on the new information given."]
stepContent[3]["nextSubstep"] = []
stepContent[3]["bonuses"] = []

stepContent[4] = {};
stepContent[4]["playerNum"] = 2;
stepContent[4]["transcript"] = ["Player 2: address the complaint and propose a solution."]
stepContent[4]["nextSubstep"] = []
stepContent[4]["bonuses"] = []

stepContent[5] = {};
stepContent[5]["playerNum"] = 1;
stepContent[5]["transcript"] = ["Player 1: evaluate the solution, consider your needs honestly, and renegotiate based on your needs."]
stepContent[5]["nextSubstep"] = []
stepContent[5]["bonuses"] = []

stepContent[6] = {};
stepContent[6]["playerNum"] = 2;
stepContent[6]["transcript"] = ["Player 2: if a solution has been agreed to, say 'the challenge has been completed'. Otherwise, continue negotiating, referring to steps 5 and 6 if needed."]
stepContent[6]["nextSubstep"] = []
stepContent[6]["bonuses"] = []



let deEscalationScript = "Let's take a break to calm down and collect our thoughts. [[slnc 1000]] We'll start with a breathing exercise. Please close your eyes. [[slnc 2000]] Breathe in for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Back out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 1000]]. In for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 1000]]. In for one, [[slnc 1000]] two, [[slnc 1000]] three, [[slnc 1000]] four. [[slnc 1000]] Out for one [[slnc 1000]], two [[slnc 1000]], three [[slnc 1000]], four [[slnc 3000]]. Remember that you are on the same team, playing for the same goal of a healthy, harmonious relationship. [[slnc 2000]] Let go of your pride, or feelings of being wronged, and consider your partner's pain. [[slnc 4000]] What can you both do to heal each other's pain and protect your relationship? [[slnc 5000]] When you're ready, open your eyes, and try to continue the conversation with one of the following phrases on the screen."

let deEscalationCard = document.getElementById("de-escalation");

deEscalationCard.onclick = function () {
    let deEscalationScreen = document.getElementById("de-escalationScreen");
    deEscalationScreen.style.display = "block";
    deEscalationScreen.scrollIntoView({ behavior: "smooth", block: "center" });
    speak(deEscalationScript);

    let continueButton = document.getElementById("deEscalate-continue");
    continueButton.onClick = function () {
        nextStep();
    }
}


let scores = {};
scores["player1"] = {};
scores["player1"]["score"] = 0;
scores["player1"]["penalties"] = 0;
scores["player1"]["bonusPts"] = 0;
scores["player2"] = {};
scores["player2"]["score"] = 0;
scores["player2"]["penalties"] = 0;
scores["player2"]["bonusPts"] = 0;



function speak(textInput) {
    if (synth.speaking) {
        console.error('already speaking')
        setTimeout(function () {
            utterThis = new SpeechSynthesisUtterance(textInput)
            synth.speak(utterThis)
        }, 2500);
    }
    else {
        utterThis = new SpeechSynthesisUtterance(textInput);
        synth.speak(utterThis);
    }
}

function listen() {
    recognition.start();
    let newString = "";
    let offendingString;

    recognition.onstart = () => {
        interactions.listening = true;
        console.log("listening: " + interactions.listening)
    }
    recognition.onresult = event => {
        if (typeof (event.results) !== 'undefined') {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                // console.log("resultIndex: " + event.resultIndex)
                // console.log("results.length: " + event.results.length)
                // console.log("i: "+ i)
                // console.log(event.results[i][0].transcript);
                // console.log(event.results[0][0].transcript);
                // console.log(offendingString)
                // console.log(event.results[0][0].transcript.includes(offendingString))

                if (event.results[i].isFinal) {
                    if (new RegExp(absolutistWords.join("|")).test(event.results[i][0].transcript.toLowerCase()) && stepContent[turns]["playerNum"] !== 0) {
                        offendingString = event.results[i][0].transcript;
                        console.log("offendingString: " + offendingString)
                        scores["player" + stepContent[turns]["playerNum"]]["penalties"] += 10;
                        scores["player" + stepContent[turns]["playerNum"]]["score"] -= 10;
                        speak("Focus on the issue at hand; avoid using global statements.")
                    }
                    if (stepContent[turns]["bonuses"].length > 0 && new RegExp(stepContent[turns]["bonuses"].join("|")).test(event.results[i][0].transcript.toLowerCase())) {
                        scores["player" + stepContent[turns]["playerNum"]]["bonusPts"] += 10;
                        scores["player" + stepContent[turns]["playerNum"]]["score"] += 10;
                    }
                    recognition.stop();
                    // console.log("final")
                    // console.log(event.results[i][0].transcript)
                    newString += event.results[i][0].transcript.toLowerCase();
                }
            }
        }
    }
    recognition.onend = () => {
        interactions.listening = false;
        console.log("listening: " + interactions.listening)

        if (newString.includes("i'm ready", "i'm done", "next step", "continue", "we're ready", "we are ready")) {
            recognition.stop();
            if (stepContent[turns]["playerNum"] > 0) {
                scores["player" + stepContent[turns]["playerNum"]]["score"] += 10;
            }
            turns += 1;
            transcriptIndex = 0;
            nextStep();
        }
        else if (stepContent[turns]["nextSubstep"].length > 0 && new RegExp(stepContent[turns]["nextSubstep"].join("|")).test(newString)) {
            transcriptIndex += 1;
            nextStep();
        }
        else if (newString.includes("we're done, the challenge has been completed")) {
            recognition.stop();
        }
        else {
            recognition.stop();
            listen();
        }
    }

    recognition.onerror = event => {
        recognition.stop();
        console.log("error" + event.error);
        //error no-speech goes to not listening repeatedly
        listen();
    }
}

function nextStep() {

    if (turns == 0) {
        let bonusCard = document.getElementById("bonus");
        let deEscalationCard = document.getElementById("de-escalation");
        let scoreCard = document.getElementById("score");

        bonusCard.style.display = "block";
        deEscalationCard.style.display = "block";
        scoreCard.style.display = "block";
    }

    let currentStep = document.getElementById("step" + turns + "_" + transcriptIndex);
    currentStep.style.display = "block";
    currentStep.scrollIntoView({ behavior: "smooth", block: "center" });

    speak(stepContent[turns]["transcript"][transcriptIndex]);


    utterThis.addEventListener('start', function (event) {
        interactions.speaking = true;
        console.log("speaking: " + interactions.speaking);
    });
    utterThis.addEventListener('end', function (event) {
        interactions.speaking = false;
        console.log("speaking: " + interactions.speaking);
        listen();
    });
    utterThis.addEventListener('error', function (event) {
        console.log("error: " + event.error)
    });

    // turns += 1;
}