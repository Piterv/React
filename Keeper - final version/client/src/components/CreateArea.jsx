import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [inputID, setInputId] = useState({
    title: true,
    content: true
  })

  // These method updates the state properties.
  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });

    setInputId({
      title: true,
      content: true
    });
  }

  function HandleSubmit(event) {

    event.preventDefault();

    if (!note.title && note.content) {
      setInputId({
        title: false,
        content: true
      });
    } else if (!note.content && note.title) {
      setInputId({
        title: true,
        content: false
      });
    } else if (!note.title && !note.content) {
      setInputId({
        title: false,
        content: false
      });
    } else if (note.title && note.content) {

      //Post note
      fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      }).then(response => response.json())
        .catch(err => { console.log(err) });

      setNote({
        title: "",
        content: ""
      });

      // This method fetches the records from the database.
      fetch("/notes")
        .then((res) => res.json())
        .then(data => data[data.length - 1])
        .then(dataItem => props.onAdd(dataItem));
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder={"Title"}
            id={inputID.title ? "inputCastomID" : 'inputDangerID'}
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder={"Type here..."}
          rows={isExpanded ? 3 : 1}
          id={inputID.content ? "inputCastomID" : 'inputDangerID'}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={HandleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
