import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  let count = 0;

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleSubmit() {
    setInputText("");
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} value={inputText} type="text" />
        <button onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem) => (
            <li key={count++}>{todoItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
