import React from "react";

const Instructions = ({ instructions }) => {
  instructions.map((instruction) => {
    return (
      <div key={instruction}>
        <input type="text" disabled>
          {instruction}
        </input>
      </div>
    );
  });
};

export default Instructions;
