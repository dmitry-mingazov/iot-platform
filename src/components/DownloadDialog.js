import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
  DialogActions,
  TextField,
  Button,
  Chip,
  InputAdornment
} from "@mui/material";
import FileService from "../services/FileService";

const extensions = {
  JSON: '.json',
  TURTLE: '.ttl'
}

const DownloadDialog = ({
  devices,
  extension,
  openDownload,
  handleClose
}) => {
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [filenameError, setFilenameError] = useState(false);

  const handleDownload = () => {
    if (filename.length === 0) {
      setFilenameError(true);
      return;
    } 
    setLoading(true);
    FileService.getDevicesFile(filename + extension, devices).then(_ => {
      setLoading(false);
      setFilename('');
      handleClose();
    }).catch(error => {
      console.error(error);
      setLoading(false);
    })
  };

  const onFilenameChange = (event) => {
    const newFilename = event.target.value ?? '';
    if (newFilename.length !== 0) {
      setFilenameError(false)
    }
    setFilename(event.target.value);
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDownload}
        fullWidth
      >
        <DialogTitle style={{ marginTop: 10, marginLeft: 10 }}>Export Devices</DialogTitle> 
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          {devices.map(device => (
            <Chip key={device._id} size="small" style={{ marginRight: 5, marginBottom: 5 }} label={device.name} color="primary"/>
          ))}
          <TextField
            error={filenameError}
            helperText={filenameError ? "File Name cannot be empty" : ''}
            margin="normal"
            id="filename"
            label="File Name"
            fullWidth
            onChange={(event) => onFilenameChange(event)}
            InputProps={{
                endAdornment: <InputAdornment position="end">{extension}</InputAdornment>
            }}
          />
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button onClick={handleClose}>Cancel</Button>
          {loading ? (
            <CircularProgress size={22} style={{marginLeft: 27, marginRight: 27}} />
          ) : (
              <Button variant="contained" onClick={handleDownload}>
                  Download
              </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { DownloadDialog, extensions };