import React, { useContext, useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import DeviceService from "../services/DeviceService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeviceCard from "../components/DeviceCard";
import DeviceExportDialog from "../components/DeviceExportDialog";
import { DownloadDialog, extensions } from "../components/DownloadDialog";
import { AuthContext } from "../components/context/AuthContext";
import UploadDialog from "../components/UploadDialog";
import noDevicesImage from "../assets/images/no-devices.png";
import { useNodeRed } from "../components/context/NodeRedContext";
import DeviceDeleteDialog from "../components/DeviceDeleteDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const { nodeRedDashboardURL } = useNodeRed();
  const { isTokenReady } = useContext(AuthContext);
  const [isSelectMode, setSelectMode] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [isOpenDownload, setOpenDownload] = useState(false);
  const [isOpenUpload, setOpenUpload] = useState(false);
  const [devicesToExport, setDevicesToExport] = useState([]);
  const [downloadExtension, setDownloadExtension] = useState("");
  const [noDevices, setNoDevices] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);

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

  const exportToJSON = (devices) => {
    setDevicesToExport(devices);
    setDownloadExtension("JSON");
    setOpenDownload(true);
  };

  const exportToTTL = (devices) => {
    setDevicesToExport(devices);
    setDownloadExtension("TURTLE");
    setOpenDownload(true);
  };

  const deleteDevices = (devices) => {
    setDevicesToExport(devices);
    setOpenDelete(true);
  };

  const selectedOnChange = (deviceId) => {
    const devicesToSet = devices.slice();
    const deviceIndex = devices.findIndex((device) => {
      return device._id === deviceId;
    });
    const newIsSelected = !devices[deviceIndex].exportSelected;
    devicesToSet[deviceIndex].exportSelected = newIsSelected;
    if (devicesToSet.filter((device) => device.exportSelected).length === 0) {
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
              devices.filter((device) => device.exportSelected).length === 0
            }
            onClick={() => {
              exportToNodered(
                devices.filter((device) => device.exportSelected)
              );
            }}
            style={{ marginRight: 12 }}
          >
            Export to Node-RED
          </Button>
          <Button
            variant="contained"
            size="medium"
            disabled={
              devices.filter((device) => device.exportSelected).length === 0
            }
            onClick={() => {
              exportToJSON(devices.filter((device) => device.exportSelected));
            }}
            style={{ marginRight: 12 }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            size="medium"
            disabled={
              devices.filter((device) => device.exportSelected).length === 0
            }
            onClick={() => {
              deleteDevices(devices.filter((device) => device.exportSelected));
            }}
            endIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        </div>,
      ];
    } else {
      return [
        <div key={"start"}>
          <Button 
            variant="contained"
            size="medium"
            onClick={() => {
              window.open(nodeRedDashboardURL, "_blank");
            }}
          >
              Open Dashboard
          </Button>
        </div>,
        <div key={"end"}>
          <Button
            disabled={devices.length === 0}
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
            style={{ marginRight: 12 }}
          >
            Add device
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setOpenUpload(true);
            }}
          >
            Import devices
          </Button>
        </div>,
      ];
    }
  };

  const getDevices = () => {
    return DeviceService.getDevices().then((dvs) => {
      if (dvs.length === 0) {
        setNoDevices(true);
      }
      resetSelectedDevices(dvs);
      setDevices(dvs);
    });
  };

  // will run only on first render
  useEffect(() => {
    if (isTokenReady) {
      getDevices();
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
      {noDevices ? (
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          minHeight="100%"
          paddingTop={7}
          flexDirection="column"
        >
          <img
            src={noDevicesImage}
            alt="No devices available"
            style={{
              width: "40%",
              height: "40%",
              opacity: 0.7,
            }}
          />
          <Typography variant="h5" sx={{ opacity: 0.7 }}>
            No devices available.
          </Typography>
        </Box>
      ) : (
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
                  exportToJSON={() => {
                    exportToJSON([device]);
                  }}
                  exportToTTL={() => {
                    exportToTTL([device]);
                  }}
                  deleteDevice={() => {
                    deleteDevices([device]);
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
      )}
      <DeviceExportDialog
        openExport={openExport}
        devicesToExport={devicesToExport}
        handleClose={() => {
          setOpenExport(false);
        }}
      />
      <DownloadDialog
        openDownload={isOpenDownload}
        devices={devicesToExport}
        extension={downloadExtension}
        handleClose={() => {
          setOpenDownload(false);
        }}
      />
      <UploadDialog
        openUpload={isOpenUpload}
        refreshDevices={getDevices}
        handleClose={() => {
          setOpenUpload(false);
        }}
      />
      <DeviceDeleteDialog
        openDelete={isOpenDelete}
        devicesToDelete={devicesToExport}
        refreshDevices={getDevices}
        isSelectMode={isSelectMode}
        setSelectMode={setSelectMode}
        handleClose={() => {
          setOpenDelete(false);
        }}
      />
    </div>
  );
}

export default Devices;
