import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Box, Tab, Grid2, Typography } from "@mui/material";
import { useState } from "react";
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

const NewPostEdit = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
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
  );
};

export default NewPostEdit;
