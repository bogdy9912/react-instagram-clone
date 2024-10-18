import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { authActions } from "../../slices/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorEmail = useAppSelector((state) => state.auth.errorEmail);
  const errorPassword = useAppSelector((state) => state.auth.errorPassword);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const email = data.email.toString();
    const password = data.password.toString();

    dispatch(authActions.signIn({ email, password })).then((action) => {
      if (action.type === authActions.signIn.fulfilled.type) {
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        sx={{
          padding: "32px",
          width: "300px",
        }}
      >
        <Stack direction="column">
          <Typography variant="h3">Instagram</Typography>
          <Typography sx={{ margin: "20px" }}>
            Sign up to see photos and videos from your friends
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            placeholder="your_email@gmail.com"
            type="email"
            required
            helperText={
              <Typography component="span">{errorEmail?.message}</Typography>
            }
            error={errorEmail !== null}
          />
          <Box sx={{ height: "16px" }} />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            placeholder="******"
            type="password"
            required
            helperText={
              <Typography component={"span"}>
                {errorPassword?.message}
              </Typography>
            }
            error={errorPassword !== null}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword((pass) => !pass);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ height: "16px" }} />
          <Button variant="contained" type="submit">
            Sign in
          </Button>
          <Typography align="center">
            <small>or</small>
          </Typography>
          <Typography align="center">
            <small>
              Don't have an account? <Link to={"../sign-up"}>Sign up</Link>
            </small>
          </Typography>
        </Stack>
      </Paper>
    </form>
  );
};

export default SignInPage;
