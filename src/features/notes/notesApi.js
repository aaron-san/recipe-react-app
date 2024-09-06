import { db } from "../../config/firebase";
import {
  // arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notes",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Notes"],

  endpoints: (builder) => ({
    fetchNotes: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, "notes");
          const querySnapshot = await getDocs(ref);
          const notes = [];
          querySnapshot?.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
          });
          return { data: notes };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      provideTags: ["Notes"],
    }),
    addNewNote: builder.mutation({
      async queryFn({ newNote }) {
        try {
          const ref = doc(db, "notes");
          // await setDoc(ref, newNote, { merge: true });
          await setDoc(ref, newNote);
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Notes"],
    }),

    updateNote: builder.mutation({
      async queryFn({ noteId }) {
        try {
          await updateDoc(doc(db, "notes", noteId), {
            notes: "new....note",
          });
          return { data: "ok" };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useFetchNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
} = notesApi;
