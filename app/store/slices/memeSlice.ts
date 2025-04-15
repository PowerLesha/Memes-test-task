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
      if (typeof window !== "undefined") {
        localStorage.setItem("memes", JSON.stringify(action.payload));
      }
    },
    addMeme: (state, action: PayloadAction<Meme>) => {
      state.memes.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("memes", JSON.stringify(state.memes));
      }
    },
    updateMeme: (state, action: PayloadAction<Meme>) => {
      const index = state.memes.findIndex(
        (meme) => meme.id === action.payload.id
      );
      if (index !== -1) {
        state.memes[index] = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("memes", JSON.stringify(state.memes));
        }
      }
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
