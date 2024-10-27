import { PayloadAction } from "@reduxjs/toolkit";
import { createPost } from "../data/postService";
import { searchUsers } from "../data/profileService";
import { createAppSlice } from "../redux/createAppSlice";
import { RootState } from "../redux/store";
import InstaError from "../utils/error";

type PostsState = {
  createPostLoading: boolean;
  createPostError: InstaError | null;
  searchUserLoading: boolean;
  searchUserError: InstaError | null;
  usernames: string[];
  selectedUsername: string[];
};

const initialState: PostsState = {
  createPostLoading: false,
  createPostError: null,
  searchUserLoading: false,
  searchUserError: null,
  usernames: [],
  selectedUsername: [],
};

const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    toggleSelectedUsername: create.reducer(
      (state, action: PayloadAction<string>) => {
        const payload = action.payload;

        if (state.selectedUsername.includes(payload)) {
          state.selectedUsername = state.selectedUsername.filter(
            (e) => e !== payload
          );
        } else {
          state.selectedUsername.push(payload);
        }
      }
    ),
    resetCreateError: create.reducer((state) => {
      state.createPostError = null;
    }),
    createPost: create.asyncThunk(
      async (
        {
          images,
          location,
          description,
        }: { images: FileList; location: string; description: string },
        thunkApi
      ): Promise<any> => {
        try {
          const rootState: RootState = thunkApi.getState() as RootState;
          const userId: string | null = rootState.auth.id;
          const users: string[] | null = rootState.posts.selectedUsername;
          if (userId === null) {
            return thunkApi.rejectWithValue(
              new InstaError("access denied", "NO-UID", 500)
            );
          }
          return await createPost({
            images,
            description,
            location,
            uid: userId,
            users,
          });
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {
          state.createPostError = null;
          state.createPostLoading = true;
        },
        rejected: (state, action) => {
          state.createPostError = action.payload as InstaError;
          state.createPostLoading = false;
        },
        fulfilled: (state, action) => {
          state.createPostError = null;
          state.createPostLoading = false;
        },
      }
    ),
    searchUsers: create.asyncThunk(
      async ({ searchTerm }: { searchTerm: string }, thunkApi) => {
        try {
          const usernames = await searchUsers(searchTerm);
          return usernames;
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {
          state.searchUserError = null;
          state.searchUserLoading = true;
        },
        rejected: (state, action) => {
          state.searchUserLoading = false;
          state.searchUserError = action.payload as InstaError;
        },
        fulfilled: (state, action) => {
          state.searchUserLoading = false;
          state.usernames = action.payload;
        },
      }
    ),
  }),
});

export default postsSlice;
export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
