import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
  DialogActions,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import DeviceService from "../services/DeviceService";
import { useSnackbar } from "../components/context/SnackbarContext";

function DeviceDeleteDialog(props) {
  const [loading, setLoading] = useState(false);
  const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    const deviceIds = [];
    props.devicesToDelete.forEach((device) => {
      deviceIds.push(device._id);
    });
    console.log(deviceIds);
    DeviceService.deleteDevices(deviceIds)
      .then((_) => {
        setLoading(false);
        props.handleClose();
        openSuccessSnackbar("Device deleted successfully");
        props.refreshDevices();
      })
      .catch((_) => {
        setLoading(false);
        props.handleClose();
        openErrorSnackbar("Something went wrong!");
      });
  };

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDelete}
        fullWidth
      >
        <DialogTitle style={{ marginTop: 10, marginLeft: 10 }}>
          Delete devices
        </DialogTitle>
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          {props.devicesToDelete.map((device) => (
            <Chip
              key={device._id}
              size="small"
              style={{ marginRight: 5, marginBottom: 5 }}
              label={device.name}
              color="primary"
            />
          ))}
          <Typography sx={{ marginTop: 2 }}>
            Are you sure you want to delete these devices? <br />
            The flows created from these devices will not be deleted.
          </Typography>
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          {loading ? (
            <CircularProgress
              size={22}
              style={{ marginLeft: 27, marginRight: 27 }}
            />
          ) : (
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeviceDeleteDialog;
