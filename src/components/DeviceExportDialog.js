import React, { useState } from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
  DialogActions,
  TextField,
  Button,
  Chip
} from "@mui/material";

function DeviceExportDialog(props) {
  const [label, setLabel] = useState('');
  const [comment, setComment] = useState('');

  const handleExport = () => {
    console.log('Exporting',props.devicesToExport);
    console.log('Label', label);
    console.log('Comment', comment);
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };
  const onCommentChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openExport}
        fullWidth
      >
        <DialogTitle style={{ marginTop: 10, marginLeft: 10 }}>Create new flow</DialogTitle> 
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          {props.devicesToExport.map(device => (
            <Chip key={device._id} size="small" style={{ marginRight: 5, marginBottom: 5 }} label={device.name} color="primary"/>
          ))}
          <TextField
            margin="normal"
            id="label"
            label="Flow name"
            fullWidth
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
          <Button onClick={props.handleClose}>Cancel</Button>
          {props.loading ? (
            <CircularProgress size={22} style={{marginLeft: 27, marginRight: 27}} />
          ) : (
            <Button variant="contained" onClick={() => {handleExport();}}>
              Export
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeviceExportDialog;
