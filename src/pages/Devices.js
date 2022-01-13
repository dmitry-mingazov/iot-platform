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
  const [exportSelectMode, setExportSelectMode] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [devicesToExport, setDevicesToExport] = useState([]);

  const resetSelectedDevices = (devices) => {
    devices.forEach((device) => {
      device.exportSelected = false;
    });
  };

  const exportSelectAll = () => {
    const devicesToSet = devices.slice();
    devicesToSet.forEach((device) => {
      device.exportSelected = true;
    });
    setDevices(devicesToSet);
  };

  const exportDeselectAll = () => {
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

  const exportSelectedOnChange = (deviceId) => {
    const devicesToSet = devices.slice();
    const deviceIndex = devices.findIndex((device) => {
      return device._id === deviceId;
    });
    devicesToSet[deviceIndex].exportSelected =
      !devices[deviceIndex].exportSelected;
    setDevices(devicesToSet);
  };

  const displayButtons = () => {
    if (exportSelectMode) {
      return [
        <div key={"start"}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              exportSelectAll();
            }}
            style={{ marginRight: 12 }}
          >
            Select all
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              exportDeselectAll();
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
              setExportSelectMode(false);
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
            Export
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
              setExportSelectMode(true);
            }}
            style={{ marginRight: 12 }}
          >
            Export to Node-RED
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
                exportSelectMode={exportSelectMode}
                exportSelected={device.exportSelected}
                exportSelectedOnChange={() => {
                  exportSelectedOnChange(device._id);
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
