import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    fetch("/notes")
      .then((res) => res.json())
      .then(data => data.forEach((dataItem) => {
        setNotes(prevNotes => {
          return [...prevNotes, dataItem];
        });
      })).catch(err => console.log(err));
  }, []);

  function handleCreate(note) {
    setNotes(prevNotes => {
      return [...prevNotes, note]
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  function handleEditNote(editedNote) {
    setNotes(prevNotes => {
      const newState = prevNotes.map(note => {
        if (note._id === editedNote.noteId) {
          return {
            ...note,
            title: editedNote.title,
            content: editedNote.content
          }
        }
        return note;
      });
      return newState;
    });
  }

  return (

    <div>

      <Header />

      <CreateArea onAdd={handleCreate} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            setOnEdit={handleEditNote}
          />
        );
      })}

      <Footer />

    </div>
  );

}

export default App;


