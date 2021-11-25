import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import DeviceService from "../services/DeviceService";

function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);

  // will run only on first render
  useEffect(() => {
    DeviceService.getDevices().then(dvs => {
      setDevices(dvs);
    });
  }, []);

  useEffect(() => {

  }, [devices])

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
