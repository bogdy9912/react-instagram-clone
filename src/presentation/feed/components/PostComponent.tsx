import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/store";
import Post from "../../../models/post";

const PostItem = ({ post }: { post: Post }) => {
  const users = useAppSelector((state) => state.profile.users);

  return (
    <>
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <Typography>{users[post.uid]?.username ?? "not loaded"}</Typography>
        </Stack>
        <img src={post.images[0]} />
      </Stack>
    </>
  );
};

export default PostItem;
