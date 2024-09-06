import React, { useState, createRef } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
// import { getAuth } from "firebase/auth";
// import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

const AddNote = ({ addNote, setAddNote, addRecipe }) => {
  const { user } = useAuth();

  const [isDisabled, setIsDisabled] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const buttonRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Disable button
    setIsDisabled(true);

    const newNote = {
      id: nanoid(),
      title: title,
      content: content,
    };

    // await setDoc(doc(db, "notes", newNote.id), newNote);

    // setTimeout(() => {
    setIsDisabled(false);
    setAddNote(false);
    setTitle("");
    setContent("");
    // }, 2000);
  };

  return (
    <div className="flex justify-center">
      {!addNote && user && !addRecipe && (
        <div className="flex justify-center">
          <button
            onClick={() => setAddNote(true)}
            className="px-6 py-2 text-slate-800 border border-slate-800 active-translate-y-[1px] rounded-md shadow-md hover:bg-slate-100 my-4"
          >
            Add Note
          </button>
        </div>
      )}
      {addNote && user && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-[900px] flex flex-col gap-2"
        >
          {/* <label htmlFor="title">Title:</label> */}
          <h1>New Note:</h1>
          <input
            type="text"
            required
            placeholder="Add a title"
            className="p-2 m-0"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <label htmlFor="content">Content:</label> */}
          <textarea
            type="text"
            required
            placeholder="Add content"
            className="p-2 border border-blue-500"
            width="600px"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex gap-2">
            <button
              type="submit"
              ref={buttonRef}
              className="self-start w-1/2 px-4 py-2 my-2 bg-green-200 rounded-md hover:bg-green-100"
              disabled={isDisabled}
            >
              {isDisabled ? "Disabled" : "Submit"}
            </button>
            <button
              onClick={() => setAddNote(false)}
              className="w-1/2 px-4 py-2 my-2 bg-red-200 border rounded-md hover:bg-red-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNote;
