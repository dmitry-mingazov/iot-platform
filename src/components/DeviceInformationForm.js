import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  }
});

//Component
function DeviceInformationForm(props) {
  const classes = useStyles();

  return (
    <div>
      <TextField
          inputProps={{ "aria-label": "device name" }}
          className={classes.field}
          label={"Name"}
          value={props.deviceName}
          margin="normal"
          onChange={props.onDeviceNameChange}
          required
          error={props.nameError}
          fullWidth
        />
        <TextField
          inputProps={{ "aria-label": "device type" }}
          select
          className={classes.field}
          label={"Device type"}
          value={props.deviceType}
          onChange={props.onDeviceTypeChange}
          margin="normal"
          required
          fullWidth
        >
          {props.deviceTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
  );
}

export default DeviceInformationForm;
