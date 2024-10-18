import { Navigate, Outlet } from "react-router";
import "../../App.css";
import { useAppSelector } from "../../redux/store";
import { Divider, Stack } from "@mui/material";
import Menu from "../feed/components/Menu";

function HomePage() {
  const id = useAppSelector((state) => state.auth.id);

  if (id === null) {
    return <Navigate to={"sign-up"} />;
  }

  return (
    <>
    <Stack direction={"row"}>
      <Menu/>
      <Divider orientation="vertical" flexItem/>
      <h1>Logged user: {id}</h1>
      <Outlet/>
    </Stack>
    </>
  );
}

export default HomePage;
