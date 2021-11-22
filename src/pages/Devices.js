import React from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";

function Devices() {
  const navigate = useNavigate();

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'flex-end'}}
      >
        <Button variant="contained" size="medium" onClick={() => {navigate("/add-device-form")}}>Add device</Button>
      </Stack>
    </div>
  );
}

export default Devices;
