import React, { useState } from "react";

function App() {
  const [name, setTypedText] = useState();
  const [headingText, setInputValue] = useState();

  function handleChange(event) {
    console.log(event.target.value);
    setTypedText(event.target.value);
  }

  function handleClick(event) {
    console.log(event);
    setInputValue(name);

    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {headingText}</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
