import { getUserIdLogged, signIn, signUp } from "../data/authService";
import InstaError from "../utils/error";
import { createAppSlice } from "../redux/createAppSlice";

interface authState {
  loading: boolean;
  id: string | null;
  errorEmail: InstaError | null;
  errorPassword: InstaError | null;
  errorPasswordConfirm: InstaError | null;
  errorGeneral: InstaError | null;
  isError: boolean;
}

const initialState: authState = {
  id: null,
  loading: false,
  errorEmail: null,
  errorPassword: null,
  errorPasswordConfirm: null,
  errorGeneral: null,
  isError: false,
};

const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    getUserIdLogged: create.reducer((state) => {
      state.id = getUserIdLogged();
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
          const error = new InstaError(
            "Password does not match",
            "CONFIRM_PASS_ERR"
          );
          return thunkApi.rejectWithValue(error.toObject());
        }
        try {
          const id = await signUp(email, password);
          return id;
        } catch (error) {
          return thunkApi.rejectWithValue((error as InstaError).toObject());
        }
      },
      {
        pending: (state) => {
          state.errorEmail = null;
          state.errorGeneral = null;
          state.errorPassword = null;
          state.errorPasswordConfirm = null;
          state.isError = false;
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          const error = action.payload as InstaError;

          if (error.code.includes("pass")) {
            state.errorPassword = error;
          } else {
            state.errorPassword = null;
          }

          if (error.code.includes("email")) {
            state.errorEmail = error;
            state.errorEmail.message = "Email already exists";
          } else {
            state.errorEmail = null;
          }
          if (error.code === "CONFIRM_PASS_ERR") {
            state.errorPasswordConfirm = error;
          } else {
            state.errorPasswordConfirm = null;
          }
          if (
            state.errorEmail === null &&
            state.errorPassword === null &&
            state.errorPasswordConfirm === null
          ) {
            state.errorGeneral = error;
          }

          state.isError = true;
        },
        fulfilled: (state, action) => {
          state.errorEmail = null;
          state.errorGeneral = null;
          state.errorPassword = null;
          state.errorPasswordConfirm = null;
          state.isError = false;
          state.id = action.payload;
        },
      }
    ),
    signIn: create.asyncThunk(
      async (
        { email, password }: { email: string; password: string },
        thunkApi
      ) => {
        try {
          return await signIn(email, password);
        } catch (error) {
          return thunkApi.rejectWithValue((error as InstaError).toObject());
        }
      },
      {
        pending: (state) => {
          state = { ...initialState };
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          const error = action.payload as InstaError;

          if (error.code?.includes("pass")) {
            state.errorPassword = error;
          } else {
            state.errorPassword = null;
          }

          if (error.code.includes("email")) {
            state.errorEmail = error;
            state.errorEmail.message = "Email already exists";
          } else {
            state.errorEmail = null;
          }

          if (state.errorEmail === null && state.errorPassword === null) {
            state.errorGeneral = error;
          }

          state.isError = true;
        },
        fulfilled: (state, action) => {
          state = { ...initialState };
          state.id = action.payload;
        },
      }
    ),
  }),
});

export const authActions = authSlice.actions;
export { authSlice };
