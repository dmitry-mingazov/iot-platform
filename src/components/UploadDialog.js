import React from "react";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  CircularProgress,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import DeviceService from "../services/DeviceService";
import { useSnackbar } from "./context/SnackbarContext";

const UploadDialog = ({
  openUpload,
  handleClose
}) => {
  const fileInput = React.createRef();
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(undefined);
  const [devices, setDevices] = React.useState([]);
  const [isFileValid, setFileValid] = React.useState(true);
  const {openSuccessSnackbar, openErrorSnackbar } = useSnackbar();

  const handleImport = () => {
    setLoading(true);
    DeviceService.createDevices(devices)
      .then(_ => {
        openSuccessSnackbar('Devices imported successfully');
        setLoading(false);
      }).catch(_ => {
        openErrorSnackbar('Something went wrong');
        setLoading(false);
      })
  }

  const onChange = (e) => {
    console.log(e);
    const _file = fileInput?.current.files[0];
    setFile(_file);
    const reader = new FileReader();
      reader.onload = async (e) => {
        const rawText = e.target.result;
        try {
          const _devices = JSON.parse(rawText);
          setFileValid(true);
          setDevices(_devices);
        } catch (err) {
          setFileValid(false);
        }
      }
      reader.readAsText(_file);
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openUpload}
        fullWidth
      >
        <DialogTitle style={{ marginTop: 10, marginLeft: 10 }}>Import Device</DialogTitle> 
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          <div style={{border: "1px solid grey", padding: 8, borderRadius: 5, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Typography sx={{display: 'flex', alignItems: 'center'}}>{file ? file.name :  'No file chosen'}</Typography>
            <Button
              variant="contained"
              size="small"
              component="label"
              style={{marginLeft: 10}}
            >
              Choose a File
              <input
                type="file"
                accept=".json"
                ref={fileInput}
                onChange={onChange}
                hidden
              />
            </Button>
          </div>
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button onClick={handleClose}>Cancel</Button>
          {loading ? (
            <CircularProgress size={22} style={{marginLeft: 27, marginRight: 27}} />
          ) : (
            <Button 
              variant="contained" 
              onClick={handleImport} 
              disabled={!isFileValid || !file}
            >
              Import
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadDialog;