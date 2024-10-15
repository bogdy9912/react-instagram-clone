import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut as signOutFirebase,
} from "firebase/auth";
import InstaError from "../utils/error";
import { firebaseAuth as auth } from "../firebase";

const signIn = async (email: string, password: string) => {
  let userCredential: UserCredential;

  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const newError = new InstaError(error.message, error.code, 400);
      throw newError;
    }

    const newError = new InstaError("Unexpected error", "", 500);
    throw newError;
  }

  return userCredential;
};

const signUp = async (email: string, password: string): Promise<string> => {
  let userCredential: UserCredential;

  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      const newError = new InstaError(error.message, error.code, 400);
      throw newError;
    }

    const newError = new InstaError("Unexpected error", "", 500);
    throw newError;
  }

  return userCredential.user.uid;
};

const signOut = async () => {
  try {
    await signOutFirebase(auth);
  } catch (error) {
    throw new InstaError("Couldn't sign out", "", 500);
  }
};

export { signIn, signUp, signOut };
