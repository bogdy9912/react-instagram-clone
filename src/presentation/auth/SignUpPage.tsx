import { FormEvent, useState } from "react";
import { authActions } from "../../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { profileActions } from "../../slices/profileSlice";

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const isLoadingAuth = useAppSelector((state) => state.auth.loading);
  const isLoadingProfile = useAppSelector((state) => state.profile.loading);

  const errorAuthEmail = useAppSelector((state) => state.auth.errorEmail);
  const errorAuthPass = useAppSelector((state) => state.auth.errorPassword);
  const errorAuthPassConfirm = useAppSelector(
    (state) => state.auth.errorPasswordConfirm
  );
  const errorAuth = useAppSelector((state) => state.auth.errorGeneral);
  const isErrorAuth = useAppSelector((state) => state.auth.isError);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  const passRules = ["*min 6 chrs", "min 1 capital letter", "min 1 symbol"];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);

    const email = data.email.toString();
    const password = data.password.toString();
    const confirmPassword = data.confirmPassword.toString();
    const username = data.username.toString();
    const displayName = data.displayName.toString();

    dispatch(
      authActions.signUp({
        email,
        password,
        confirmPassword,
      })
    ).then((action) => {
      if (action.type === authActions.signUp.fulfilled.type) {
        // trigger set profile
        const id = action.payload as string | null;
        dispatch(
          profileActions.createProfile({ email, username, displayName, id })
        ).then((action) => {
          if (action.type === profileActions.createProfile.fulfilled.type) {
            // navigate to app
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={4}
          sx={{
            padding: "32px",
            width: "300px",
          }}
        >
          <Stack direction={"column"}>
            <Typography align="center" variant="h3">
              Instagram
            </Typography>
            <Typography align="center" sx={{ margin: "20px" }}>
              Sign up to see photos and videos from your friends
            </Typography>

            <TextField
              variant="outlined"
              label="Email"
              placeholder="your_email@gmail.com"
              required
              name="email"
              type="email"
              error={errorAuthEmail !== null}
              helperText={
                <>
                  {errorAuthEmail !== null && (
                    <Typography component={"span"}>
                      {errorAuthEmail.message}
                    </Typography>
                  )}
                </>
              }
            />
            <Box sx={{ height: "16px" }} />
            <TextField
              onFocus={() => setFocus(true)}
              variant="outlined"
              label="Password"
              placeholder="**********"
              type="password"
              required
              name="password"
              helperText={
                <>
                  {!isErrorAuth && focus && (
                    <>
                      {passRules.map((e) => (
                        <Typography
                          key={e}
                          component={"span"}
                          variant="body2"
                          sx={{ display: "block" }}
                        >
                          {e}
                        </Typography>
                      ))}
                    </>
                  )}
                  {isErrorAuth && (
                    <Typography component={"span"}>
                      {errorAuthPass?.message.substring(10, 50)}
                    </Typography>
                  )}
                </>
              }
              error={errorAuthPass !== null}
            />
            <Box sx={{ height: "16px" }} />
            <TextField
              variant="outlined"
              label="Confirm password"
              placeholder="**********"
              type="password"
              required
              name="confirmPassword"
              error={errorAuthPassConfirm !== null}
              helperText={
                <>
                  {errorAuthPassConfirm !== null && (
                    <Typography component={"span"}>
                      {errorAuthPassConfirm.message}
                    </Typography>
                  )}
                </>
              }
            />
            <Box sx={{ height: "16px" }} />
            <TextField
              variant="outlined"
              label="Username"
              type="text"
              required
              name="username"
              helperText=""
            />
            <Box sx={{ height: "16px" }} />
            <TextField
              variant="outlined"
              label="Display name"
              type="text"
              required
              name="displayName"
              helperText=""
            />
            <Box sx={{ height: 32 }}></Box>

            <LoadingButton
              loading={isLoadingAuth || isLoadingProfile}
              type="submit"
              variant="contained"
            >
              Create account
            </LoadingButton>
          </Stack>
          <Typography align="center">
            <small>or</small>
          </Typography>
          <Typography align="center">
            <small>
              Already have an account? <Link to={"sign-in"}>Sign in</Link>
            </small>
          </Typography>
          <Button
            onClick={() => {
              dispatch(authActions.getUserIdLogged());
            }}
          >
            Get current user
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default SignUpPage;
