import React, { useContext, useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import DeviceService from "../services/DeviceService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeviceCard from "../components/DeviceCard";
import DeviceExportDialog from "../components/DeviceExportDialog";
import { AuthContext } from "../components/context/AuthContext";

function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const { isTokenReady } = useContext(AuthContext);
  const [isSelectMode, setSelectMode] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [devicesToExport, setDevicesToExport] = useState([]);

  const resetSelectedDevices = (devices) => {
    devices.forEach((device) => {
      device.exportSelected = false;
    });
  };

  const selectAll = () => {
    const devicesToSet = devices.slice();
    devicesToSet.forEach((device) => {
      device.exportSelected = true;
    });
    setDevices(devicesToSet);
  };

  const deselectAll = () => {
    const devicesToSet = devices.slice();
    devicesToSet.forEach((device) => {
      device.exportSelected = false;
    });
    setDevices(devicesToSet);
  };

  const exportToNodered = (devices) => {
    setDevicesToExport(devices);
    setOpenExport(true);
  };

  const selectedOnChange = (deviceId) => {
    const devicesToSet = devices.slice();
    const deviceIndex = devices.findIndex((device) => {
      return device._id === deviceId;
    });
    const newIsSelected = !devices[deviceIndex].exportSelected;
    devicesToSet[deviceIndex].exportSelected = newIsSelected;
    if (devicesToSet.filter(device => device.exportSelected).length === 0) {
      setSelectMode(false);
    }
    
    setDevices(devicesToSet);
  };

  const displayButtons = () => {
    if (isSelectMode) {
      return [
        <div key={"start"}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              selectAll();
            }}
            style={{ marginRight: 12 }}
          >
            Select all
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              deselectAll();
            }}
          >
            Deselect all
          </Button>
        </div>,
        <div key={"end"}>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              resetSelectedDevices(devices);
              setSelectMode(false);
            }}
            style={{ marginRight: 12 }}
          >
            Cancel selection
          </Button>
          <Button
            variant="contained"
            size="medium"
            disabled={
              devices.filter(device => device.exportSelected).length === 0
            }
            onClick={() => {
              exportToNodered(devices.filter(device => device.exportSelected));
            }}
          >
            Export to Node-RED
          </Button>
        </div>,
      ];
    } else {
      return [
        <div key={"start"}></div>,
        <div key={"end"}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setSelectMode(true);
            }}
            style={{ marginRight: 12 }}
          >
            Select Devices
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              navigate("/add-device-form");
            }}
          >
            Add device
          </Button>
        </div>,
      ];
    }
  };

  // will run only on first render
  useEffect(() => {
    if (isTokenReady) {
      DeviceService.getDevices().then((dvs) => {
        resetSelectedDevices(dvs);
        setDevices(dvs);
      });
    }
  }, [isTokenReady]);

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        {displayButtons()}
      </Stack>
      <Box mt={6} ml={8} mr={8} mb={6}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 4, sm: 12, md: 20 }}
        >
          {devices.map((device) => (
            <Grid key={device._id} item xs={2} sm={4} md={4} align="center">
              <DeviceCard
                key={device._id}
                _id={device._id}
                deviceName={device.name}
                exportToNodered={() => {
                  exportToNodered([device]);
                }}
                exportSelectMode={isSelectMode}
                exportSelected={device.exportSelected}
                exportSelectedOnChange={() => {
                  selectedOnChange(device._id);
                }}
              ></DeviceCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DeviceExportDialog
        openExport={openExport}
        devicesToExport={devicesToExport}
        handleClose={() => {
          setOpenExport(false);
        }}
      />
    </div>
  );
}

export default Devices;
