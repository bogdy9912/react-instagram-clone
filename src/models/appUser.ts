export type AppUser = {
  email: string | null;
  id: string | null;
  username: string | null;
  displayName: string | null;
  noOfPosts: number;
  followers: number;
  following: string[];
  bio: string;
  saved: string[];
  searchIndex: string[];
};
