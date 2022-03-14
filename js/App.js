import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
import VoiceAPI from "./VoiceAPI.js"

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onVoiceAdd: (voiceInputBtn, title, body) => {
                console.log(title + body);
                // console.log('aaaaa');
                VoiceAPI.startVoiceInput(voiceInputBtn, this.activeNote.id, title, body);
                this._refreshNotes();
                // console.log('refresh');
            }, 
            onLeetAdd: (difficulty) => {
                // console.log(difficulty)
                // let res = '';
                // res = NotesAPI.getLeetRecc(this.activeNote, difficulty);
                // var promiseB = res.then(function(result) {
                //     // do something with result
                //     // this.view.setLeetRecc(result);
                //     // this._setLeetRecc1(result);
                //     console.log(result);
                //     console.log('hi');
                //     return result;
                //  });
                // console.log(res);
                this.view.setLeetRecc(NotesAPI.getLeetRecc(this.activeNote, difficulty));
                // console.log('promiseB' + promiseB);
                // console.log(res);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
