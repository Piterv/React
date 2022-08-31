import React, { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

function PopupNote(props) {

    const [note, setNote] = useState({
        title: props.noteTitle,
        content: props.noteContent,
        noteId: props.noteId
    });

    // These method updates the state properties.

    function handleChange(event) {
        const { name, value } = event.target;
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    };

    function handleClick() {

        //Post note
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => {
            console.log("ok")
            props.setOnEdit(note);
            props.setStatus("Changes saved successfully.")
            setTimeout(()=>{props.setStatus("")}, 2000);
            
        }).catch(err => { console.log(err) });
    }

    return (

        <form className="create-note">
            <input
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder={"Title"}

            />
            <textarea
                name="content"
                onChange={handleChange}
                value={note.content}
                placeholder={"Type here..."}
                rows={3}
            />
            <Fab onClick={handleClick} >
                <AddIcon />
            </Fab>
        </form>

    )
};

export default PopupNote;