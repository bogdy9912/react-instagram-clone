import { FormEvent, useState } from "react";
import { authActions } from "../../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
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

  const error = useAppSelector((state) => state.auth.error);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

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
        username,
        displayName,
      })
    ).then((action) => {
      // trigger set profile
      console.log("EMIT PROFILE ACTION");
      const id = action.payload as string | null;
      console.log("ID is: ", id);
      dispatch(
        profileActions.createProfile({ email, username, displayName, id })
      ).then(() => {
        // navigate to app
        navigate("/home");
      });
    });
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <Paper
          elevation={4}
          sx={{
            padding: "32px",
            width: "300px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography align="center" variant="h3">
              Instagram
            </Typography>
            <Typography align="center" sx={{ margin: "20px" }}>
              Sign up to see photos and videos from your friends
            </Typography>

            <Stack direction={"column"}>
              <TextField
                variant="outlined"
                label="Email"
                placeholder="your_email@gmail.com"
                required
                name="email"
                type="email"
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
                    {focus && (
                      <>
                        <Typography>min 6 chr</Typography>
                        <Typography>min 1 symbol (eg. ?!*#$,.)</Typography>
                      </>
                    )}
                  </>
                }
                error={error !== null}
              />
              <Box sx={{ height: "16px" }} />
              <TextField
                variant="outlined"
                label="Confirm password"
                placeholder="**********"
                type="password"
                required
                name="confirmPassword"
                helperText=""
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
                Already have an account? <Link to={"./sign-in"}>Sign in</Link>
              </small>
            </Typography>
          </form>
        </Paper>
      </Stack>
    </>
  );
};

export default SignUpPage;
