import { signUp } from "../data/authService";
import InstaError from "../utils/error";
import { createAppSlice } from "../redux/createAppSlice";

interface authState {
  loading: boolean;
  id: string | null;
  error: InstaError | null;
}

const initialState: authState = {
  id: null,
  loading: false,
  error: null,
};

const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    test: create.reducer((authState, action) => {
      console.log(action.payload);
      console.log("DEBUG");
    }),
    signUp: create.asyncThunk(
      async (
        {
          email,
          password,
          confirmPassword,
        }: {
          email: string;
          password: string;
          confirmPassword: string;
        },
        thunkApi
      ) => {
        if (confirmPassword !== password) {
          throw new InstaError("Password does not match", "CONFIRM_PASS_ERR");
        }
        try {
          const id = await signUp(email, password);
          return id;
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
          state.error = new InstaError(
            action.error?.message || "",
            action.error?.code || ""
          );

          console.log(
            "Sign Up Error: rejected: " +
              action.error.message +
              action.error.code
          );
        },
        fulfilled: (state, action) => {
          console.log("FULFILLED SIGN UP");
          state.loading = false;
          state.id = action.payload;
        },
      }
    ),
  }),
});

export const authActions = authSlice.actions;
export { authSlice };
