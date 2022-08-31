import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupNote from './PopupNote';
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Fab from "@mui/material/Fab";
import { Modal } from "react-native";

function Note(props) {

  const [text, setText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handleShow = () => { setModalVisible(true) }
  const handleClose = () => { setModalVisible(false) && setText("") }

  //Button event handler Delete.
  function handleClickDelete() {

    const deleteRequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ id: props.id })
    };
    // POST request
    fetch('/delete', deleteRequestOptions)
      .then(response => response.json())
      .then(data => { console.log(data.message) });

    props.onDelete(props.id);
  }

  return (
    <div className="note">

      <h1>{props.title}</h1>
      <p>{props.content}</p>

      <button onClick={handleClickDelete}>
        <DeleteIcon />
      </button>

      <button onClick={handleShow}>
        <EditIcon />
      </button>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <div className="myoverlay" >
          <div className="mymodal">
            <h1 className="myModalText">{text}</h1>
            <PopupNote
              noteId={props.id}
              noteTitle={props.title}
              noteContent={props.content}
              setOnEdit={props.setOnEdit}
              setStatus={setText}
            />
            <Fab id="edit-note" onClick={handleClose}>
              <DisabledByDefaultIcon />
            </Fab>
          </div>
        </div>
      </Modal>

    </div>
  );
}


export default Note;


