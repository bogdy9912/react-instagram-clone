import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { ArrowBack } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createPostActions } from "../../../slices/createPostSlice";
import NewPostDetails from "./NewPostDetails";
import NewPostEdit from "./NewPostEdit";

const steps = ["Create new post", "Crop", "Edit", "Create new post"];

const NewPost = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<any>();
  const [titleIndex, setTitleIndex] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const createPostLoading = useAppSelector(
    (state) => state.createPost.createPostLoading
  );
  const createPostError = useAppSelector(
    (state) => state.createPost.createPostError
  );

  const displayButtons = files !== null;
  const dialogWidth = titleIndex > 1 ? "1200px" : "800px";

  let sideContent;
  let content;

  const handleClose = () => {
    setOpen(false);
    setFiles(null);
    setTitleIndex(0);
    setSelectedFilePreview(null);
    dispatch(createPostActions.resetCreateError());
  };

  const handleShare = () => {
    if (files === null || titleIndex !== 3) {
      return;
    }
    dispatch(
      createPostActions.createPost({ description, location, images: files })
    ).then((action) => {
      if (action.type === createPostActions.createPost.fulfilled.type) {
        handleClose();
      }
    });
  };

  const handleImagePreview = () => {
    return URL.createObjectURL(selectedFilePreview);
  };

  if (files !== null) {
    content = (
      <>
        <Box
          component={"img"}
          src={handleImagePreview()}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            position: "relative",
          }}
          alt="The house from the offer."
        />
      </>
    );
  } else {
    content = (
      <>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <CollectionsIcon />
          <Box height={20} />
          <Typography>Drag photos and videos here</Typography>
          <Box height={20} />
          <Button variant="contained" component="label">
            Select from computer
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={(event) => {
                const files = event.target.files;
                if (files !== null) {
                  setFiles(files);
                  setSelectedFilePreview(files[0]);
                  setTitleIndex(1);
                }
              }}
            />
          </Button>
        </Stack>
      </>
    );
  }

  if (titleIndex === 2) {
    sideContent = <NewPostEdit />;
  } else if (titleIndex === 3) {
    sideContent = (
      <NewPostDetails
        description={description}
        location={location}
        setDescription={setDescription}
        setLocation={setLocation}
      />
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        PaperProps={{
          style: {
            width: `${dialogWidth}`,
            transition: "width 0.3s ease",
          },
        }}
      >
        <DialogTitle align={"center"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={displayButtons ? "space-between" : "center"}
          >
            {displayButtons && (
              <IconButton
                onClick={() => {
                  setTitleIndex((prev) => {
                    if (prev === 1) {
                      setFiles(null);
                    }

                    dispatch(createPostActions.resetCreateError());
                    return prev - 1;
                  });
                }}
              >
                <ArrowBack />
              </IconButton>
            )}
            {createPostError === null ? (
              <Typography>{steps[titleIndex]}</Typography>
            ) : (
              <Alert severity="error">{createPostError.message}</Alert>
            )}
            {displayButtons && (
              <Button
                variant="text"
                disabled={createPostLoading}
                onClick={() => {
                  setTitleIndex((prev) => {
                    if (prev < 3) {
                      return prev + 1;
                    }
                    return prev;
                  });
                  handleShare();
                }}
              >
                {titleIndex === 3
                  ? createPostLoading
                    ? "Sharing..."
                    : "Share"
                  : "Next"}
              </Button>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 0,
          }}
        >
          <Stack direction={"row"}>
            <Box height={"500px"} width={"800px"} overflow="hidden">
              {content}
            </Box>
            {titleIndex > 1 && sideContent}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default NewPost;
