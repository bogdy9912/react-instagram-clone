import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseFirestore as firestore } from "../firebase";
import { AppUser } from "../models/appUser";
import createSearchIndex from "./createSearchIndex";

const createProfile = async (user: {
  email: string;
  username: string;
  id: string;
  displayName: string;
}): Promise<AppUser> => {
  const ref = doc(firestore, "users", user.id);

  const searchIndex = createSearchIndex(user.username);

  const newUser: AppUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    bio: "",
    followers: 0,
    following: [],
    noOfPosts: 0,
    saved: [],
    searchIndex,
  };

  await setDoc(ref, newUser);
  return newUser;
};

const searchUsers = async (searchTerm: string): Promise<string[]> => {
  const usersRef = collection(firestore, "users");
  const docRef = query(usersRef, where("searchIndex", "array-contains", searchTerm));
  const querySnapshot = await getDocs(docRef);
  const usernames = querySnapshot.docs.map((e) => e.get("username"));
  console.log(usernames)
  return usernames;
};

export { createProfile, searchUsers };
