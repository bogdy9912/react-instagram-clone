import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_APP_ID ?? "",
  measurementId: import.meta.env.VITE_MEASUREMENT_ID ?? "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// create a promise here, to make sure that the auth is fully init
// when I am calling getUserIdLogged at store creation
const firebaseAuth: Auth = await new Promise((resolve) => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, () => {
    unsubscribe(); // Clean up the listener once we get a response
    resolve(auth);
  });
});
const firebaseFirestore = getFirestore(app);

export { app, firebaseAuth, analytics, firebaseFirestore };
