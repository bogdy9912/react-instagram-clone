import { Alert, Skeleton, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { feedAction } from "../../slices/feedSlice";
import PostItem from "./components/PostComponent";

const FeedPage = () => {
  const feedPosts = useAppSelector((state) => state.feed.posts);
  const isLoading = useAppSelector((state) => state.feed.loading);
  const error = useAppSelector((state) => state.feed.error);
  const isError = error !== null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feedAction.getFeed());
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Stack direction={"column"}>
          <Stack direction={"row"}>
            <Skeleton variant="circular" />
            <Skeleton variant="text" />
          </Stack>
          <Skeleton variant="rounded" height={80} width={200} />
        </Stack>
      </>
    );
  } else if (isError) {
    content = (
      <Alert variant="outlined" severity="error">
        {error.message}
      </Alert>
    );
  } else {
    content = (
      <>
        {feedPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </>
    );
  }

  return (
    <>
      <Stack direction={"row"}>
        <Stack direction={"column"}>{content}</Stack>
      </Stack>
    </>
  );
};

export default FeedPage;
