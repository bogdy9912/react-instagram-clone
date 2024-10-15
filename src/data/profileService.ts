import { addDoc, doc, setDoc } from "firebase/firestore";
import { firebaseFirestore as firestore } from "../firebase";
import { AppUser } from "../models/appUser";
import InstaError from "../utils/error";

const createProfile = async (user: AppUser): Promise<void> => {
  if (user.id === null || user.email === null || user.username === null) {
    throw new InstaError("Mandatory fields cannot be null", "INPUT_NULL_ERR");
  }
  const ref = doc(firestore, "users", user.id);

  await setDoc(ref, user);
};

export { createProfile };
