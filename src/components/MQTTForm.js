import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import qosTypes from "../components/data/mqttQos.json";
import protocolVersions from "../components/data/mqttProtocolVersion.json";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

//Component
function MQTTForm(props) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        inputProps={{ "aria-label": "mqtt broker" }}
        className={classes.field}
        label="Broker"
        margin="normal"
        value={props.serviceInfo.broker}
        onChange={(event) => props.onServiceInfoChange(event, "broker")}
        required
        error={props.serviceInfo.brokerError}
        fullWidth
      ></TextField>
      <TextField
        inputProps={{ "aria-label": "mqtt port" }}
        className={classes.field}
        select
        label="Port"
        margin="normal"
        value={props.serviceInfo.port}
        onChange={(event) => props.onServiceInfoChange(event, "port")}
        fullWidth
      ></TextField>
      <TextField
        inputProps={{ "aria-label": "mqtt topic" }}
        className={classes.field}
        label="Topic"
        margin="normal"
        value={props.serviceInfo.topic}
        onChange={(event) => props.onServiceInfoChange(event, "topic")}
        required
        error={props.serviceInfo.topicError}
        fullWidth
      ></TextField>
      <TextField
        inputProps={{ "aria-label": "mqtt qos" }}
        className={classes.field}
        select
        label="Qos"
        margin="normal"
        value={props.serviceInfo.qos}
        onChange={(event) => props.onServiceInfoChange(event, "qos")}
        fullWidth
      >
        {qosTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        inputProps={{ "aria-label": "mqtt protocol version" }}
        className={classes.field}
        select
        label="Protocol version"
        margin="normal"
        value={props.serviceInfo.protocolVersion}
        onChange={(event) =>
          props.onServiceInfoChange(event, "protocolVersion")
        }
        fullWidth
      >
        {protocolVersions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default MQTTForm;
