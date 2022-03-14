import NotesAPI from "./NotesAPI.js";
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var result = "nothing"
var activeNote = null;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var voiceEnd = false;


export default class VoiceAPI {
    static startVoiceInput(voiceInputBtn, activeNoteId, title, body) {
        voiceEnd = false;
        recognition.start();
        activeNote = {
            id: activeNoteId,
            title: title,
            body: body
        };
        console.log('Ready to receive a color command.');
    }
}

recognition.onresult = function(event) {
    result = event.results[0][0].transcript;
    console.log('Result: ' + result);
    console.log('Confidence: ' + event.results[0][0].confidence);

    NotesAPI.saveNote({
        id: activeNote.id,
        title: activeNote.title,
        body: activeNote.body + "\n\n" + result
    })

    voiceEnd = true; 
    console.log('finish speech');
  }

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    alarm('I didn\'t recognize that voice.');
}
  
recognition.onerror = function(event) {
    alarm('Error occurred in recognition: ' + event.error);
}