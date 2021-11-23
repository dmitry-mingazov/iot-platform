import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import interfaces from "./data/interfaceTypes.json";
import { Button } from "@mui/material";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  divider: {
    backgroundColor: "#949494",
    height: 0.5,
    margin: "auto",
    marginTop: 18,
    textAlign: "center",
    width: "50%",
  },
  button: {
    margin: "auto",
    marginTop: 18,
    display: "block",
  },
});

//Component
function DeviceServiceForm(props) {
  const classes = useStyles();
  const interfaceTypes = interfaces;

  return (
    <div>
      {props.isFirst ? null : <div className={classes.divider} />}

      <TextField
        className={classes.field}
        label="Endpoint"
        margin="normal"
        value={props.endpoint}
        onChange={(event) => props.onEndpointChange(event)}
        fullWidth
      ></TextField>
      <TextField
        className={classes.field}
        select
        label="Interface type"
        margin="normal"
        value={props.interface}
        onChange={(event) => props.onInterfaceTypeChange(event)}
        fullWidth
      >
        {interfaceTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={classes.field}
        label="Metadata"
        margin="normal"
        value={props.metadata}
        onChange={(event) => props.onMetadataChange(event)}
        fullWidth
      ></TextField>
      {props.isFirst ? null : (
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={props.removeService}
        >
          Remove Service
        </Button>
      )}
    </div>
  );
}

export default DeviceServiceForm;
