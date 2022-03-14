export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }

    static async getLeetRecc(note, difficulty) {
        // console.log(note.body);
        // console.log(difficulty);
        let _data = {
            note: note.body,
            difficulty: difficulty
        }
        
        // fetch('http://localhost:8080/get-sims-recommendation-by-filter', {
        //     // mode: 'no-cors',
        //     method: "POST",
        //     body: JSON.stringify(_data),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // .then(response => response.json())
        // .then(data => NotesAPI.getLeetReccRes(data))
        // .catch(err => console.log(err));
        const response = await fetch('http://localhost:8080/get-sims-recommendation-by-filter', {
            // mode: 'no-cors',
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        const data = await response.json();
        // console.log('api' + JSON.stringify(data));
        return JSON.stringify(data);
    }

    static getLeetReccRes(data) {
        console.log(data);
    }
}
