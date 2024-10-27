import { PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "../models/appUser";
import { createAppSlice } from "../redux/createAppSlice";
import InstaError from "../utils/error";
import { createProfile } from "../data/profileService";

interface profileState {
  user: AppUser;
  error: InstaError | null;
  loading: boolean;
}

const initialState: profileState = {
  user: {
    email: null,
    id: null,
    username: null,
    displayName: null,
    noOfPosts: 0,
    followers: 0,
    following: [],
    bio: "",
    saved: [],
    searchIndex: []
  },
  error: null,
  loading: false,
};

const profileSlice = createAppSlice({
  name: "profile",
  initialState,
  reducers: (create) => ({
    createProfile: create.asyncThunk(
      async (
        user: {
          email: string;
          username: string;
          id: string;
          displayName: string;
        },
        thunkApi
      ) => {
        try {
          const createdUser = await createProfile(user);
          return createdUser;
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload as InstaError;

          console.log("Profile Error: rejected: " + action.payload);
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
      }
    ),
  }),
});

export const profileActions = profileSlice.actions;
export { profileSlice };
