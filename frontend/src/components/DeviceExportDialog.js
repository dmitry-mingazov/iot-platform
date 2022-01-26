import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
  DialogActions,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { useNodeRed } from "./context/NodeRedContext";

function DeviceExportDialog(props) {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { createNewFlow } = useNodeRed();
  const [labelError, setLabelError] = useState(false);

  const handleExport = () => {
    if (!label) {
      setLabelError(true);
    } else {
      setLabelError(false);
      setLoading(true);
      createNewFlow(label, comment, props.devicesToExport)
        .then((flowId) => {
          setLoading(false);
          navigate(`/node-red/${flowId}`);
        })
        .catch((err) => {
          // TODO add snackbar here
          setLoading(false);
          console.error(err);
        });
    }
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };
  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openExport}
        fullWidth
      >
        <DialogTitle style={{ marginTop: 10, marginLeft: 10 }}>
          Create new flow
        </DialogTitle>
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          {props.devicesToExport.map((device) => (
            <Chip
              key={device._id}
              size="small"
              style={{ marginRight: 5, marginBottom: 5 }}
              label={device.name}
              color="primary"
            />
          ))}
          <TextField
            error={labelError}
            margin="normal"
            id="label"
            label="Flow name"
            fullWidth
            helperText={labelError ? "Insert a value" : ""}
            onChange={(event) => onLabelChange(event)}
          />
          <TextField
            margin="normal"
            id="comment"
            label="Description"
            fullWidth
            onChange={(event) => onCommentChange(event)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button
            onClick={() => {
              props.handleClose();
              setLabelError(false);
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
            <Button variant="contained" onClick={handleExport}>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeviceExportDialog;
