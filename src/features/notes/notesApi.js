import { db } from "../../config/firebase";
import { nanoid } from "nanoid";

import {
  // arrayUnion,
  collection,
  doc,
  setDoc,
  addDoc,
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
      providesTags: ["Notes"],
    }),
    addNewNote: builder.mutation({
      queryFn: async ({ newNote }) => {
        try {
          const docRef = doc(db, "notes", nanoid());
          // await setDoc(ref, newNote, { merge: true });
          await setDoc(docRef, newNote);
          return { data: "ok" };
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
