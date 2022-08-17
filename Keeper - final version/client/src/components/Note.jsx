import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {

  function handleClickDelete() {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ id: props.id })
    };
    // POST request
    fetch('/delete', requestOptions)
      .then(response => response.json())
      .then(data => {

        console.log(data.message)
      });

    props.onDelete(props.id);
  }

  function handleClickEdit(){}

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClickDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleClickEdit}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;


