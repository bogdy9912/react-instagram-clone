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
    // createProfile: create.reducer((state, action: PayloadAction<AppUser>) => {
    //   state.user = action.payload;
    // }),
    createProfile: create.asyncThunk(
      async (user: AppUser, thunkApi) => {
        try {
          await createProfile(user);
          return user;
        } catch (error) {
            console.log(error);
            if (error instanceof InstaError){
                
                return thunkApi.rejectWithValue(error.message);
            }
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = new InstaError(
            action.error?.message || "",
            action.error?.code || ""
          );

          console.log(
            "Profile Error: rejected: " +
              action.error.message + " " +
              action.error.code
          );
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
      }
    ),
  })
});

export const profileActions = profileSlice.actions;
export {profileSlice} 