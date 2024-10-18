import { addDoc, doc, setDoc } from "firebase/firestore";
import { firebaseFirestore as firestore } from "../firebase";
import { AppUser } from "../models/appUser";

const createProfile = async (user: {
  email: string;
  username: string;
  id: string;
  displayName: string;
}): Promise<AppUser> => {
  const ref = doc(firestore, "users", user.id);

  const newUser: AppUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    bio: "",
    followers: 0,
    following: [],
    noOfPosts: 0,
    saved: []
  };

  await setDoc(ref, newUser);
  return newUser;
};

export { createProfile };
