import React from "react";
import { Stack, Button } from "@mui/material";

function Devices() {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'flex-end'}}
      >
        <Button variant="contained" size="medium" onClick={() => {console.log("Clicked")}}>Add device</Button>
      </Stack>
    </div>
  );
}

export default Devices;
