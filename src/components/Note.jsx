import React from "react";
import { useFetchNotesQuery } from "../features/notes/notesApi";

const Note = () => {
  const { data: notes, error, isLoading } = useFetchNotesQuery();

  const randNote = notes
    ? notes[Math.floor(Math.random() * notes.length)]
    : null;

  return (
    <section className="text-purple text-boldest bg-gradient-to-br from-green-200 via-yellow-300 to-orange-400 rounded-md w-[200px] mt-4 p-2">
      <div className="bg-white border-8 border-white">
        {/* <h1>Note:</h1> */}
        {randNote && (
          <div className="p-2">
            <h1 key={randNote.id}>{randNote.title}</h1>
            <p>{randNote.content}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Note;
