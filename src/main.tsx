import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./presentation/home/HomePage.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "./firebase.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./presentation/auth/SignUpPage.tsx";
import SignInPage from "./presentation/auth/SignInPage.tsx";
import RootLayout from "./presentation/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // index: true,
        path: '/',
        element: <HomePage/>,
        children: [
          {
            path: 'test',
            element: <><h2>Test</h2></>
          }
        ]
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage/>
      },
      {
        path: 'forgot-password'
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
