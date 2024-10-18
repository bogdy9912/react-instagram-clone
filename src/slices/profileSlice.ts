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
  user: { email: null, id: null, username: null, displayName: null },
  error: null,
  loading: false,
};

const profileSlice = createAppSlice({
  name: "profile",
  initialState,
  reducers: (create) => ({
    createProfile: create.asyncThunk(
      async (user: AppUser, thunkApi) => {
        try {
          await createProfile(user);
          return user;
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
