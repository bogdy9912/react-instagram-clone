import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Input,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { useAppDispatch } from "../../../redux/store";
import { postsActions } from "../../../slices/postsSlice";

const steps = ["Create new post", "Crop", "Edit", "Create new post"];
const filters = [
  { title: "Filter1" },
  { title: "Filter2" },
  { title: "Filter3" },
  { title: "Filter4" },
  { title: "Filter5" },
  { title: "Filter6" },
  { title: "Filter7" },
  { title: "Filter8" },
  { title: "Filter9" },
];

const NewPost = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<any>();
  const [titleIndex, setTitleIndex] = useState(0);
  const displayButtons = files !== null;
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
    setFiles(null);
    setTitleIndex(0);
    setSelectedFilePreview(null);
  };

  const handleShare = () => {
    if (files === null || titleIndex !== 3){
      return;
    }
    dispatch(postsActions.createPost({description, location, images: files}))
  }

  const handleImagePreview = () => {
    return URL.createObjectURL(selectedFilePreview);
  };

  let content;
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

  let sideContent;
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  if (titleIndex === 2) {
    sideContent = (
      <>
        <Stack sx={{ width: "400px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Filters" value="1" />
                <Tab label="Adjustments" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid2 container spacing={2}>
                {filters.map((e) => (
                  <Grid2 size={4}>
                    <Box
                      key={e.title}
                      height={100}
                      width={100}
                      sx={{ bgcolor: "blue" }}
                    >
                      <Typography>e.title</Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Stack>
      </>
    );
  } else if (titleIndex === 3) {
    sideContent = (
      <>
        <Stack sx={{ width: "400px", maxHeight: "500px", overflowY: "scroll" }}>
          <Textarea
            sx={{ minHeight: 200 }}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          ></Textarea>
          <TextField
            label="Add location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField label="Add collaborators" />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Accessibility
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Alt text describes your photos for people with visual
                impairments. Alt text will be automatically created for your
                photos or you can choose to write your own.
              </Typography>
              <TextField variant="outlined" placeholder="Not implemented" />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Advance settings
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Hide like and view counts on this post</Typography>
                <Switch />
              </Stack>
              <Typography component={"span"} fontSize={10}>
                Only you will see the total number of likes and views on this
                post. You can change this later by going to the ··· menu at the
                top of the post. To hide like counts on other people's posts, go
                to your account settings.
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Turn off commenting</Typography>
                <Switch />
              </Stack>
              <Typography component={"span"} fontSize={10}>
                You can change this later by going to the ··· menu at the top of
                your post.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </>
    );
  }
  const dialogWidth = titleIndex > 1 ? "1200px" : "800px";
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
                    return prev - 1;
                  });
                }}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Typography>{steps[titleIndex]}</Typography>
            {displayButtons && (
              <Button
                variant="text"
                onClick={() => {
                  setTitleIndex((prev) => prev + 1);
                  handleShare();
                }}
              >
                {titleIndex === 3 ? "Share" : "Next"}
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
