import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import {
  firebaseFirestore as firestore,
  firebaseStorage as storage,
} from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InstaError from "../utils/error";
import Post from "../models/post";

const createPost = async ({
  images,
  description,
  location,
  uid,
  users,
}: {
  images: FileList;
  description: string;
  location: string;
  uid: string;
  users: string[];
}): Promise<void> => {
  const ref = doc(collection(firestore, "posts"));
  const imagesURL = await uploadImages(images, ref.id);

  const post: Post = {
    images: imagesURL,
    description,
    location,
    likes: [],
    tags: [],
    users,
    uid,
    id: ref.id,
  };

  await setDoc(ref, post);
};

const uploadImages = async (
  images: FileList,
  id: string
): Promise<string[]> => {
  const imagesURL: string[] = [];

  for (let i: number = 0; i < images.length; i++) {
    const refFirestore = doc(collection(firestore, "NOT USE"));
    const storageRef = ref(storage, `posts/${id}/${refFirestore.id}`);
    const bytes = await images[0].arrayBuffer();
    if (bytes === undefined) {
      throw new InstaError("error on uploading image", "local-error", 500);
    }
    await uploadBytes(storageRef, bytes);
    const image = await getDownloadURL(storageRef);
    imagesURL.push(image);
  }

  return imagesURL;
};

const getFeed = async (following: string[]): Promise<Post[]> => {
  const approach3Fn = (arr: string[], size: number): string[][] =>
    arr.reduce(
      (result: string[][], _, index) =>
        index % size === 0
          ? [...result, arr.slice(index, index + size)]
          : result,
      []
    );

  const size = 10;
  const result = approach3Fn(following, size);
  const postRef = collection(firestore, "posts");

  let allPosts: Post[] = [];
  for (let part of result) {
    const docRef = query(postRef, where("uid", "in", part));
    const querySnapshot = await getDocs(docRef);
    const posts = querySnapshot.docs.map((e) => e.data() as Post);
    allPosts = [...allPosts, ...posts];
  }

  return allPosts;
};

export { createPost, getFeed };
