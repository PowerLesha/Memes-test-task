"use client";

import { Meme } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MemeState {
  memes: Meme[];
  selectedMeme: Meme | null;
}

const initialState: MemeState = {
  memes: [],
  selectedMeme: null,
};

const memeSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action: PayloadAction<Meme[]>) => {
      state.memes = action.payload;

      localStorage.setItem("memes", JSON.stringify(action.payload));
    },
    addMeme: (state, action: PayloadAction<Meme>) => {
      state.memes.push(action.payload);

      localStorage.setItem("memes", JSON.stringify(state.memes));
    },
    updateMeme: (state, action: PayloadAction<Meme>) => {
      state.memes = state.memes.map((meme) =>
        meme.id === action.payload.id ? action.payload : meme
      );

      localStorage.setItem("memes", JSON.stringify(state.memes));
    },

    selectMeme: (state, action: PayloadAction<Meme>) => {
      state.selectedMeme = action.payload;
    },
    clearSelectedMeme: (state) => {
      state.selectedMeme = null;
    },
  },
});

export const { setMemes, addMeme, updateMeme, selectMeme, clearSelectedMeme } =
  memeSlice.actions;

export default memeSlice.reducer;
