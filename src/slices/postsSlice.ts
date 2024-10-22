import { createPost } from "../data/postService";
import { createAppSlice } from "../redux/createAppSlice";
import { RootState } from "../redux/store";
import InstaError from "../utils/error";

type PostsState = {
  createPostLoading: boolean;
  createPostError: InstaError | null;
};

const initialState: PostsState = {
  createPostLoading: false,
  createPostError: null,
};

const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    createPost: create.asyncThunk(
      async (
        {
          images,
          location,
          description,
        }: { images: FileList; location: string; description: string },
        thunkApi
      ):Promise<any> => {
        try {

          const rootState: RootState = thunkApi.getState() as RootState;
          const userId: string | null = rootState.auth.id;
          if (userId === null) {
            return thunkApi.rejectWithValue(
              new InstaError("access denied", "no uid", 500)
            );
          }
          return await createPost({ images, description, location, uid: userId });
        } catch (error) {
          return thunkApi.rejectWithValue(error as InstaError);
        }
      },
      {
        pending: (state) => {
          state.createPostLoading = true;
        },
        rejected: (state, action) => {
          state.createPostError = action.payload as InstaError;
          state.createPostLoading = false;
        },
        fulfilled: (state, action) => {
          state.createPostLoading = false;
        },
      }
    ),
  }),
});

export default postsSlice;
export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
