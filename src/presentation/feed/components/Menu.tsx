import {
  Explore,
  FavoriteBorder,
  Home,
  MenuSharp,
  Person,
  PostAdd,
  Search,
  Send,
  Slideshow,
} from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";

const options = [
  {
    icon: <Home sx={{ width: "32px", height: "32px" }} />,
    text: "Home",
  },
  {
    icon: <Search sx={{ width: "32px", height: "32px" }} />,
    text: "Search",
  },
  {
    icon: <Explore sx={{ width: "32px", height: "32px" }} />,
    text: "Explore",
  },
  {
    icon: <Slideshow sx={{ width: "32px", height: "32px" }} />,
    text: "Reels",
  },
  {
    icon: (
      <Send
        sx={{ width: "32px", height: "32px", transform: "rotate(-35deg)" }}
      />
    ),
    text: "Messages",
  },
  {
    icon: <FavoriteBorder sx={{ width: "32px", height: "32px" }} />,
    text: "Notifications",
  },
  {
    icon: <PostAdd sx={{ width: "32px", height: "32px" }} />,
    text: "Create",
  },
  {
    icon: <Person sx={{ width: "32px", height: "32px" }} />,
    text: "Profile",
  },
];

const Menu = () => {
  return (
    <>
      <Stack
        direction={"column"}
        alignItems={"start"}
        justifyContent={"start"}
        height={"100vh"}
        paddingLeft={"2rem"}
        sx={{ width: "20%" }}
      >
        <Box sx={{ height: "2rem" }}></Box>
        <Button
          variant="text"
          color="inherit"
          sx={{
            width: "200px",
            justifyContent: "flex-start",
            paddingLeft: "20px",
          }}
        >
          Instagram
        </Button>
        <Box sx={{ height: "2rem" }}></Box>
        {options.map((option) => (
          <Box key={option.text} sx={{ width: "200px" }}>
            <Button
              variant="text"
              startIcon={option.icon}
              color="inherit"
              fullWidth
              sx={{
                justifyContent: "flex-start",
                paddingLeft: "20px",
                paddingTop: "12px",
                paddingBottom: "12px",
                textTransform: "capitalize",
                // fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {option.text}
            </Button>
          </Box>
        ))}
        {/* to take all the available space */}
        <Box sx={{ flex: 1 }}></Box>
        <Box sx={{ width: "200px" }}>
          <Button
            variant="text"
            startIcon={<MenuSharp sx={{ width: "32px", height: "32px" }} />}
            color="inherit"
            fullWidth
            sx={{
              justifyContent: "flex-start",
              paddingLeft: "20px",
              paddingTop: "12px",
              paddingBottom: "12px",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
          >
            More
          </Button>
        </Box>
        <Box height={"1rem"}></Box>
      </Stack>
    </>
  );
};

export default Menu;
