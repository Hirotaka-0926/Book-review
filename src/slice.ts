import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initialState = {
  isSignIn: cookies.get("token") !== undefined,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state: { isSignIn: boolean }) => {
      state.isSignIn = true;
    },
    signOut: (state: { isSignIn: boolean }) => {
      state.isSignIn = false;
    },
  },
});

export const { signIn, signOut } = slice.actions;
