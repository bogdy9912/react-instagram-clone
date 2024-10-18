import { Navigate } from "react-router";
import "./App.css";
import { useAppSelector } from "./redux/store";

function App() {
  const id = useAppSelector((state) => state.auth.id);

  if (id === null) {
    return <Navigate to={"sign-up"} />;
  }

  return (
    <>
      <h1>Logged user: {id}</h1>
    </>
  );
}

export default App;
