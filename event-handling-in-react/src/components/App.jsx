import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello!");
  const [isMouseOver, setChangeColor] = useState(false);

  function handleClick() {
    setHeadingText("Submited");
  }

  function handleMouseOver() {
    setChangeColor(true);
  }

  function handleMouseOut() {
    setChangeColor(false);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: isMouseOver ? "red" : "white" }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
