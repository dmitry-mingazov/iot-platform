import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import webSocketTypes from "./data/webSocketTypes.json";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

//Component
function WebSocketForm(props) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        inputProps={{ "aria-label": "web socket type" }}
        className={classes.field}
        select
        label="Type"
        margin="normal"
        value={props.serviceInfo.type}
        onChange={(event) => props.onServiceInfoChange(event, "type")}
        fullWidth
      >
        {webSocketTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {props.serviceInfo.type === "websocket-listener" ? (
        <TextField
          inputProps={{ "aria-label": "web socket path" }}
          className={classes.field}
          label="Path"
          margin="normal"
          value={props.serviceInfo.path}
          onChange={(event) => props.onServiceInfoChange(event, "path")}
          required
          error={props.serviceInfo.pathError}
          fullWidth
        ></TextField>
      ) : (
        <TextField
          inputProps={{ "aria-label": "web socket url" }}
          className={classes.field}
          label="Url"
          margin="normal"
          value={props.serviceInfo.url}
          onChange={(event) => props.onServiceInfoChange(event, "url")}
          required
          error={props.serviceInfo.urlError}
          fullWidth
        ></TextField>
      )}
    </div>
  );
}

export default WebSocketForm;
