import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import React from "react";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <div onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
        {/* <h1>{input}</h1> */}
      </div>
    </div>
  );
}

// const FormStyle = styled.form`
//   margin: 0rem 20rem;
//   position: relative;
//   div {
//     width: 100%;
//     position: relative;
//   }

//   input {
//     border: none;
//     background: linear-gradient(25deg, #494949, #313131);
//     font-size: 1.5rem;
//     color: white;
//     padding: 1rem 3rem;
//     border-radius: 1rem;
//     outline: none;
//   }
//   svg {
//     position: absolute;
//     font-size: 2rem;
//     top: 50%;
//     left: -3%;
//     transform: translate(100%, -50%);
//     color: white;
//   }
// `;

export default Search;
