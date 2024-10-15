import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "./firebase.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./presentation/auth/SignUpPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </StrictMode>
);
