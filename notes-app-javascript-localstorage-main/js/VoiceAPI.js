import NotesAPI from "./NotesAPI.js";
import App from "./App.js";
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var activeNote = null;
var voiceInputBtn = null;
// var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
var grammar = '#JSGF V1.0;'
// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var bg = document.querySelector('html');
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var speechEnd = false;

export default class VoiceAPI {
    static startVoiceInput(voiceInputBtn, activeNoteId, title, body) {
        console.log(activeNoteId);
        console.log(title);
        console.log(body);
        console.log('nihao')
        // this.voiceInputBtn = voiceInputBtn;
        // console.log(this.voiceInputBtn);
        // this.voiceInputBtn.innerHTML = 'Recognizing..';
        speechEnd = false;
        recognition.start();
        activeNote = {
            id: activeNoteId,
            title: title,
            body: body
        };
        // console.log('acitveNote:' + this.activeNote.id + this.activeNote.title + this.activeNote.body);
        console.log('acitveNote:' + activeNote.id + activeNote.title + activeNote.body);
        console.log(recognition);
        console.log('hola')

        // document.getElementById("voice").innerHTML = 'Start Voice Recognition...';
        console.log('Ready to receive a color command.');
        while (!speechEnd) {
            console.log('not finish');
        }
    }
}



// var diagnostic = document.querySelector('.output');

// var hints = document.querySelector('.hints');

// var colorHTML= '';
// colors.forEach(function(v, i, a){
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';





// document.getElementById("voice").onclick = function() {
//     recognition.start();
//     document.getElementById("voice").innerHTML = 'Start Voice Recognition...';
//     console.log('Ready to receive a color command.');
// }
recognition.onresult = function(event) {
    var result = event.results[0][0].transcript;
    // diagnostic.textContent = 'Result received: ' + color + '.';
    // if (result === 'dark mode') {
    //     bg.style.backgroundColor = 'black';
    // } else {
    //     bg.style.backgroundColor = 'white';
    // }
    
    console.log('Result: ' + result);
    console.log('Confidence: ' + event.results[0][0].confidence);
    console.log(activeNote.id + activeNote.title + activeNote.body);

    NotesAPI.saveNote({
        id: activeNote.id,
        title: activeNote.title,
        body: activeNote.body + result
    })
    console.log('koni')
    speechEnd = true;
    console.log('speech end');
    // App._refreshNotes();
    // this.voiceInputBtn.innerHTML = 'inini..';
  }

recognition.onspeechend = function() {
    recognition.stop();
    
    // document.getElementById("voice").innerHTML = 'Voice Input';
}

recognition.onnomatch = function(event) {
    // diagnostic.textContent = 'I didn\'t recognize that voice.';
    alarm('I didn\'t recognize that voice.');
}
  
recognition.onerror = function(event) {
    alarm('Error occurred in recognition: ' + event.error);
    // diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}