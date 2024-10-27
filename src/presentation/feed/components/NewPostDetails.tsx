import { ExpandMore } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import {
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  Popover,
  Popper,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { SetStateAction, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createPostActions } from "../../../slices/postsSlice";

const NewPostDetails = ({
  description,
  setDescription,
  location,
  setLocation,
}: {
  description: string;
  setDescription: React.Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<SetStateAction<string>>;
}) => {
  const ref = useRef();

  const [anchorElement, setAnchorElement] = useState<any | null>();
  const [searchTerm, setSearchTerm] = useState("");

  const createPostLoading = useAppSelector(
    (state) => state.createPost.createPostLoading
  );
  const usernames = useAppSelector((state) => state.createPost.usernames);
  const selectedUsername = useAppSelector(
    (state) => state.createPost.selectedUsername
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Stack sx={{ width: "400px", maxHeight: "500px", overflowY: "scroll" }}>
        <Textarea
          disabled={createPostLoading}
          sx={{ minHeight: 200 }}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
        ></Textarea>
        <TextField
          disabled={createPostLoading}
          label="Add location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Add collaborators"
          disabled={createPostLoading}
          onFocus={(e) => {
            setAnchorElement(e.currentTarget);
          }}
          value={searchTerm}
          onChange={(e) => {
            const query = e.target.value;
            if (query) {
              setSearchTerm(query);
              setAnchorElement(e.currentTarget);
              dispatch(createPostActions.searchUsers({ searchTerm: query }));
            } else {
              setSearchTerm(query);
              // setAnchorElement(null);
            }
          }}
        />
        {selectedUsername && (
          <Stack direction={"row"}>
            {selectedUsername.map((e) => (
              <Chip
                key={e + "chip"}
                label={e}
                onDelete={() => {
                  dispatch(createPostActions.toggleSelectedUsername(e));
                }}
              />
            ))}
          </Stack>
        )}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Accessibility
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
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
              <Switch disabled={createPostLoading} />
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
              <Switch disabled={createPostLoading} />
            </Stack>
            <Typography component={"span"} fontSize={10}>
              You can change this later by going to the ··· menu at the top of
              your post.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Popper
          open={Boolean(anchorElement && usernames.length > 0)}
          anchorEl={anchorElement}
          placement="bottom-start"
          disablePortal
        >
          <Paper
            style={{
              width: "100%",
              maxWidth: 300,
              maxHeight: 200,
              overflowY: "auto",
              background: "gray",
            }}
          >
            {usernames.map((e) => (
              <Button
                key={e}
                onClick={() => {
                  dispatch(createPostActions.toggleSelectedUsername(e));
                  dispatch(createPostActions.searchUsers({ searchTerm: "" }));
                  setAnchorElement(null);
                  setSearchTerm("");
                }}
              >
                {e}
              </Button>
            ))}
          </Paper>
        </Popper>
      </Stack>
    </>
  );
};

export default NewPostDetails;
