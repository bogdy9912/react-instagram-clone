import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import {
  firebaseFirestore as firestore,
  firebaseStorage as storage,
} from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InstaError from "../utils/error";

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
  users: string[]
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

type Post = {
  images: string[];
  description: string;
  location: string;
  likes: string[];
  tags: string[];
  uid: string;
  users: string[];
  id: string;
};

export { createPost };
