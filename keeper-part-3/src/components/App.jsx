import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function handleDelete(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function addNote(inputText) {
    setNotes((prevNotes) => {
      return [...prevNotes, inputText];
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={handleDelete}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
