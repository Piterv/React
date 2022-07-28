import React, { useState } from "react";

function CreateArea(props) {
  const [note, setInputText] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submit(event) {
    props.onAdd(note);

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button onClick={submit} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
