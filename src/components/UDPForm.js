import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import udpIPVersions from "./data/udpIPVersions.json";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

//Component
function UDPForm(props) {
  const classes = useStyles();

  return (
    <div>
      {props.isIn ? null : (
        <TextField
          inputProps={{ "aria-label": "udp address" }}
          className={classes.field}
          label="Address"
          margin="normal"
          value={props.serviceInfo.address}
          onChange={(event) => props.onServiceInfoChange(event, "address")}
          fullWidth
        ></TextField>
      )}
      <TextField
        inputProps={{ "aria-label": "udp port" }}
        className={classes.field}
        label="Port"
        margin="normal"
        value={props.serviceInfo.port}
        onChange={(event) => props.onServiceInfoChange(event, "port")}
        required
        error={props.serviceInfo.portError}
        fullWidth
      ></TextField>
      <TextField
        inputProps={{ "aria-label": "udp ipv" }}
        className={classes.field}
        select
        label="IPv"
        margin="normal"
        value={props.serviceInfo.ipv}
        onChange={(event) => props.onServiceInfoChange(event, "ipv")}
        fullWidth
      >
        {udpIPVersions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default UDPForm;
