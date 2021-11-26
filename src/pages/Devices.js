import React, { useContext, useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import DeviceService from "../services/DeviceService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Device from "../components/Device";
import { AuthContext } from "../components/context/AuthContext";

function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const { isTokenReady } = useContext(AuthContext);

  // will run only on first render
  useEffect(() => {
    if (isTokenReady) {
      DeviceService.getDevices().then((dvs) => {
        setDevices(dvs);
      });
    }
  }, [isTokenReady]);

  useEffect(() => {}, [devices]);

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            navigate("/add-device-form");
          }}
        >
          Add device
        </Button>
      </Stack>
      <Box m={6}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 4, sm: 12, md: 20 }}
        >
          {devices.map((device) => (
            <Grid key={device._id} item xs={2} sm={4} md={4} align="center">
              <Device
                key={device._id}
                _id={device._id}
                deviceName={device.name}
              ></Device>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Devices;
