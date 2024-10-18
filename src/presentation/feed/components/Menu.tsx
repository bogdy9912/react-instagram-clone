import {
  Explore,
  FavoriteBorder,
  Home,
  Instagram,
  MenuSharp,
  Person,
  PostAdd,
  Search,
  Send,
  Slideshow,
} from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";

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
  const { width } = useScreenSize();

  const displayJustIcons = width < 1024;

  console.log(width);

  return (
    <>
      <Stack
        direction={"column"}
        alignItems={"start"}
        justifyContent={"start"}
        height={"100vh"}
        paddingLeft={"10px"}
        paddingRight={"10px"}
        // sx={{ width: "20%" }}
      >
        <Box sx={{ height: "2rem" }}></Box>
        <Button
          variant="text"
          color="inherit"
          startIcon={<Instagram sx={{ width: "32px", height: "32px" }} />}
          sx={{
            width: displayJustIcons ? "50px" : "200px",
            justifyContent: "flex-start",
            paddingLeft: "20px",
          }}
        >
          {displayJustIcons ? " " : "Instagram"}
        </Button>
        <Box sx={{ height: "2rem" }}></Box>
        {options.map((option) => (
          <Box
            key={option.text}
            sx={{ width: displayJustIcons ? "50px" : "200px" }}
          >
            <Button
              variant="text"
              startIcon={option.icon}
              color="inherit"
              fullWidth
              sx={{
                justifyContent: displayJustIcons ? "center" : "flex-start",
                paddingLeft: "20px",
                paddingTop: "12px",
                paddingBottom: "12px",
                textTransform: "capitalize",
                // fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {displayJustIcons ? " " : option.text}
            </Button>
          </Box>
        ))}
        {/* to take all the available space */}
        <Box sx={{ flex: 1 }}></Box>
        <Box sx={{ width: displayJustIcons ? "50px" : "200px" }}>
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
            {displayJustIcons ? " " : "More"}
          </Button>
        </Box>
        <Box height={"1rem"}></Box>
      </Stack>
    </>
  );
};

export default Menu;
