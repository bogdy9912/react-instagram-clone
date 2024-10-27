import { getFeed } from "../data/postService";
import Post from "../models/post";
import { createAppSlice } from "../redux/createAppSlice";

import { AppDispatch, RootState } from "../redux/store";
import InstaError from "../utils/error";
import { profileActions } from "./profileSlice";

type FeedState = {
  posts: Post[];
  loading: boolean;
  error: InstaError | null;
};

const initialState: FeedState = {
  posts: [],
  loading: false,
  error: null,
};

const feedSlice = createAppSlice({
  name: "feed",
  initialState,
  reducers: (create) => ({
    getFeed: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const rootState = thunkApi.getState() as RootState;
          const dispatch = thunkApi.dispatch as AppDispatch;
          const following = rootState.profile.user.following;
          const posts: Post[] = await getFeed(following);
          const uniqUsers = new Set(posts.map((e) => e.uid));
          uniqUsers.forEach((id) => {
            // dispatch get user for this to get his data
            if (rootState.profile.users[id] === undefined) {
              dispatch(profileActions.getUser(id));
            }
          });
          return posts;
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload as InstaError;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        },
      }
    ),
  }),
});

export default feedSlice;

export const feedAction = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
