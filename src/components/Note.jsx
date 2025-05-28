import React, { useMemo } from "react";
import { useFetchNotesQuery } from "../features/notes/notesApi";

const Note = () => {
  const { data: notes, error, isLoading } = useFetchNotesQuery();

  const randNote = useMemo(() => {
    return notes ? notes[Math.floor(Math.random() * notes.length)] : null;
  }, [notes]);

  return (
    <section className="relative bg-amber-100 mx-auto my-4 mt-4 p-2 border border-amber-400 rounded-md min-w-[200px] max-w-[600px] h-fit text-boldest text-purple">
      <div className="bg-amber-50">
        <div className="-top-2 -left-2 z-20 absolute bg-amber-200 shadow px-4 py-1 border border-amber-400 rounded text-amber-600 text-sm">
          Note
        </div>
        {randNote && (
          <div className="px-2 pt-8 pb-4">
            <h1 key={randNote.id} className="text-emerald-800">
              {randNote.title}
            </h1>
            <p>{randNote.content}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Note;
