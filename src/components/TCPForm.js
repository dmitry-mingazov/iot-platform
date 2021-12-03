import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import tcpServerTypes from "./data/tcpServerTypes.json";
import tcpBeserverTypes from "./data/tcpBeserverTypes.json";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

//Component
function TCPForm(props) {
  const classes = useStyles();

  return (
    <div>
      {props.isIn ? (
        <div>
          <TextField
            inputProps={{ "aria-label": "tcp type" }}
            className={classes.field}
            select
            label="Type"
            margin="normal"
            value={props.serviceInfo.type}
            onChange={(event) => props.onServiceInfoChange(event, "type")}
            fullWidth
          >
            {tcpServerTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {props.serviceInfo.type === "client" ? (
            <TextField
              inputProps={{ "aria-label": "tcp host" }}
              className={classes.field}
              label="Host"
              margin="normal"
              value={props.serviceInfo.host}
              onChange={(event) => props.onServiceInfoChange(event, "host")}
              required
              error={props.serviceInfo.hostError}
              fullWidth
            ></TextField>
          ) : null}
          <TextField
            inputProps={{ "aria-label": "tcp port" }}
            className={classes.field}
            label="Port"
            margin="normal"
            value={props.serviceInfo.port}
            onChange={(event) => props.onServiceInfoChange(event, "port")}
            required
            error={props.serviceInfo.portError}
            fullWidth
          ></TextField>
        </div>
      ) : (
        <div>
          <TextField
            inputProps={{ "aria-label": "tcp type" }}
            className={classes.field}
            select
            label="Type"
            margin="normal"
            value={props.serviceInfo.type}
            onChange={(event) => props.onServiceInfoChange(event, "type")}
            fullWidth
          >
            {tcpBeserverTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {props.serviceInfo.type === "client" ? (
            <TextField
              inputProps={{ "aria-label": "tcp host" }}
              className={classes.field}
              label="Host"
              margin="normal"
              value={props.serviceInfo.host}
              onChange={(event) => props.onServiceInfoChange(event, "host")}
              required
              error={props.serviceInfo.hostError}
              fullWidth
            ></TextField>
          ) : null}
          {props.serviceInfo.type === "client" ||
          props.serviceInfo.type === "server" ? (
            <TextField
              inputProps={{ "aria-label": "tcp port" }}
              className={classes.field}
              label="Port"
              margin="normal"
              value={props.serviceInfo.port}
              onChange={(event) => props.onServiceInfoChange(event, "port")}
              required
              error={props.serviceInfo.portError}
              fullWidth
            ></TextField>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default TCPForm;
