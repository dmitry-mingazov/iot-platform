import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeviceServiceForm from "./DeviceServiceForm";
import MenuItem from "@mui/material/MenuItem";
import devices from "./data/deviceTypes.json";
import interfaces from "./data/interfaceTypes.json";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  formColumn: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    paddingLeft: "30px",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTextField-root": { width: "55ch" },
  },
  serviceRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  submitFormRow: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 35,
  },
});

//Component
function AddDeviceForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deviceName, setDeviceName] = useState("");
  const interfaceTypes = interfaces;
  const deviceTypes = devices;
  const [lastKey, setLastKey] = useState(0);
  const [deviceType, setDeviceType] = useState(deviceTypes[0].value);
  const [deviceServices, setDeviceServices] = useState([
    {
      key: lastKey,
      isFirst: true,
      endpoint: "",
      interface: interfaceTypes[0].value,
      metadata: "",
    },
  ]);

  //Add service into the form
  const addService = () => {
    let newKey = lastKey + 1;
    setLastKey(newKey);
    setDeviceServices(
      deviceServices.concat({
        key: newKey,
        isFirst: false,
        endpoint: "",
        interface: interfaceTypes[0].value,
        metadata: "",
      })
    );
  };

  //Remove service from the form
  const removeService = (key) => {
    if (deviceServices.length > 1) {
      const newDeviceServices = deviceServices.slice();
      const indexToRemove = newDeviceServices.findIndex((el) => el.key === key);
      if (indexToRemove !== -1) {
        newDeviceServices.splice(indexToRemove, 1);
        setDeviceServices(newDeviceServices);
      }
    }
  };

  //Handle changes on device type
  const onChangeDeviceType = (event) => {
    const newValue = event.target.value;
    setDeviceType(newValue);
  };

  //Handle changes on a service form
  const onChangeService = (event, key, attribute) => {
    const newValue = event.target.value;
    const newDeviceServices = deviceServices.slice();
    const indexToReplace = newDeviceServices.findIndex((el) => el.key === key);
    if (indexToReplace !== -1) {
      if (attribute === "endpoint") {
        newDeviceServices[indexToReplace].endpoint = newValue;
      } else if (attribute === "interface") {
        newDeviceServices[indexToReplace].interface = newValue;
      } else if (attribute === "metadata") {
        newDeviceServices[indexToReplace].metadata = newValue;
      }
      setDeviceServices(newDeviceServices);
    }
  };

  return (
    <Box className={classes.formColumn}>
      <form noValidate autoComplete="off">
        <Typography
          variant="h4"
          paddingBottom="20px"
          fontWeight="bold"
          textAlign="center"
        >
          Add Device
        </Typography>
        <TextField
          className={classes.field}
          label={"Name"}
          margin="normal"
          fullWidth
        />
        <TextField
          select
          className={classes.field}
          label={"Device type"}
          value={deviceType}
          onChange={onChangeDeviceType}
          margin="normal"
          fullWidth
        >
          {deviceTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box className={classes.serviceRow}>
          <Typography variant="h6">Service(s)</Typography>
          <Button
            size="small"
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => {
              addService();
            }}
          >
            Add
          </Button>
        </Box>
        {deviceServices.map((s) => (
          <DeviceServiceForm
            key={s.key}
            isFirst={s.isFirst}
            endpoint={s.endpoint}
            interface={s.interface}
            metadata={s.metadata}
            onEndpointChange={(event) =>
              onChangeService(event, s.key, "endpoint")
            }
            onInterfaceTypeChange={(event) =>
              onChangeService(event, s.key, "interface")
            }
            onMetadataChange={(event) => {
              onChangeService(event, s.key, "metadata");
            }}
            removeService={() => {
              removeService(s.key);
            }}
          />
        ))}
        <Box className={classes.submitFormRow}>
          <Button
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained">Add device</Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddDeviceForm;
