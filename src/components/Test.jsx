import React from "react";

import ReactHtmlParser from "react-html-parser";

const MyComponent = () => {
  const handleClick = () => {
    console.log("Button clicked!"); // Add your onClick logic here
  };

  const customMapping = {
    button: ({ children }) => <button onClick={handleClick}>{children}</button>,
  };

  const htmlContent = `
        <div>
          <button>Click me</button>
        </div>
      `;

  return (
    <div>
            <h1>HTML with onClick in React</h1>     {" "}
      {ReactHtmlParser(htmlContent, { transform: customMapping })}   {" "}
    </div>
  );
};

export default MyComponent;
