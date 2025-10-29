import React, { useState, createRef } from "react";
import { nanoid } from "nanoid";
import { useAuth } from "../contexts/AuthContext";
import { useAddNewNoteMutation } from "../features/notes/notesApi";

const AddNote = ({ addNote, setAddNote, addRecipe }) => {
  const { user } = useAuth();

  const [isDisabled, setIsDisabled] = useState(false);
  const buttonRef = createRef();

  const titleRef = createRef();
  const contentRef = createRef();

  const [addNewNote] = useAddNewNoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Disable button
    setIsDisabled(true);

    const newNote = {
      // id: nanoid(),
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    await addNewNote({ newNote });

    // A Chinese seasoning that is salty and good, but should be used moderately

    setIsDisabled(false);
    setAddNote(false);
  };

  return (
    <div className="flex justify-center">
      {!addNote && !addRecipe && (
        <div className="flex justify-center">
          <button
            onClick={() => setAddNote(true)}
            className="bg-amber-400 hover:bg-amber-400/90 shadow-md my-4 px-4 py-1 border border-slate-800 rounded-full text-slate-800 active-translate-y-[1px]"
          >
            Add Note
          </button>
        </div>
      )}
      {addNote && user && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 w-[900px]"
        >
          {/* <label htmlFor="title">Title:</label> */}
          <h1>New Note:</h1>
          <input
            type="text"
            required
            placeholder="Add a title"
            className="m-0 p-2"
            ref={titleRef}
          />
          {/* <label htmlFor="content">Content:</label> */}
          <textarea
            type="text"
            required
            placeholder="Add content"
            className="p-2 border border-blue-500"
            width="600px"
            ref={contentRef}
          ></textarea>
          <div className="flex gap-2">
            <button
              type="submit"
              ref={buttonRef}
              className="self-start bg-green-200 hover:bg-green-100 my-2 px-4 py-2 rounded-md w-1/2"
              disabled={isDisabled}
            >
              Submit
            </button>
            <button
              onClick={() => setAddNote(false)}
              className="bg-red-200 hover:bg-red-100 my-2 px-4 py-2 border rounded-md w-1/2"
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
