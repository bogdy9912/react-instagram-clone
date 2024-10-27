import { AppUser } from "../models/appUser";
import { createAppSlice } from "../redux/createAppSlice";
import InstaError from "../utils/error";
import { createProfile, getUserById } from "../data/profileService";
import { RootState } from "../redux/store";

interface profileState {
  user: AppUser;
  error: InstaError | null;
  loading: boolean;

  users: {
    [uid: string]: AppUser;
  };
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
    searchIndex: [],
  },
  error: null,
  loading: false,
  users: {},
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
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
      }
    ),
    getUser: create.asyncThunk(
      async (uid: string, thunkApi) => {
        try {
          const user = await getUserById(uid);
          return user;
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          const uid = action.meta.arg;
          state.users[uid] = action.payload;
        },
      }
    ),
    getCurrentUser: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const rootState = thunkApi.getState() as RootState;
          const uid = rootState.auth.id;
          if (uid === null) {
            throw new InstaError("no user logged", "invalid uid", 500);
          } else {
            const user = await getUserById(uid);
            return user;
          }
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
      }
    ),
  }),
});

export const profileActions = profileSlice.actions;
export { profileSlice };
