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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [deviceNameError, setDeviceNameError] = useState(false);
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
      endpointError: false,
      metadataError: false,
    },
  ]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

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
        endpointError: false,
        metadataError: false,
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

  //Reset all textfield states
  const resetForm = () => {
    const lastKey = 0;
    setLastKey(lastKey);
    const newValue = "";
    setDeviceName(newValue);
    setDeviceType(deviceTypes[0].value);
    const newDeviceServices = [
      {
        key: lastKey,
        isFirst: true,
        endpoint: "",
        interface: interfaceTypes[0].value,
        metadata: "",
        endpointError: false,
        metadataError: false,
      },
    ];
    setDeviceServices(newDeviceServices);
  };

  //Reset all textfield errors
  const resetErrors = () => {
    setDeviceNameError(false);
    const newDeviceServices = deviceServices.slice();
    newDeviceServices.forEach((service) => {
      service.endpointError = false;
      service.metadataError = false;
    });
    setDeviceServices(newDeviceServices);
  };

  const isDeviceNameCorrect = () => {
    if (deviceName) {
      return true;
    } else {
      setDeviceNameError(true);
      return false;
    }
  };

  const areServicesCorrect = () => {
    let error = false;

    const newDeviceServices = deviceServices.slice();
    newDeviceServices.forEach((service) => {
      if (service.endpoint === "") {
        error = true;
        service.endpointError = true;
      }
      if (service.metadata === "") {
        error = true;
        service.metadataError = true;
      }
    });
    if (error) {
      setDeviceServices(newDeviceServices);
      return false;
    } else {
      return true;
    }
  };

  //Display snackbar
  const displaySnackbar = (status) => {
    let newState;
    if (status === true) {
      newState = {
        open: true,
        severity: "success",
        message: "Device added successfully!",
      };
    } else {
      newState = {
        open: true,
        severity: "error",
        message: "Something went wrong!",
      };
    }
    setSnackbar(newState);
  };

  //Close snackbar
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    const newState = {
      open: false,
      severity: "",
      message: "",
    };
    setSnackbar(newState);
  };

  //On submit
  const addDevice = (e) => {
    e.preventDefault();
    resetErrors();

    if (isDeviceNameCorrect() & areServicesCorrect()) {
      let jsonObject;
      let jsonServices = [];
      deviceServices.forEach((service) => {
        jsonServices.push({
          endpoint: service.endpoint,
          interfaceType: service.interface,
          metadata: {
            metadataType: "Connection details",
            value: service.metadata,
          },
        });
      });
      jsonObject = {
        name: deviceName,
        devtype: deviceType,
        services: jsonServices,
      };
      console.log(jsonObject);
      displaySnackbar(true);

      resetForm();
    } else {
      console.log("Error in the form");
    }
  };

  return (
    <Box className={classes.formColumn}>
      <form noValidate autoComplete="off" onSubmit={addDevice}>
        <Typography
          variant="h4"
          paddingBottom="20px"
          fontWeight="bold"
          textAlign="center"
        >
          Add Device
        </Typography>
        <TextField
          inputProps={{ "aria-label": "device name" }}
          className={classes.field}
          label={"Name"}
          value={deviceName}
          margin="normal"
          onChange={(event) => {
            setDeviceName(event.target.value);
          }}
          required
          error={deviceNameError}
          fullWidth
        />
        <TextField
          inputProps={{ "aria-label": "device type" }}
          select
          className={classes.field}
          label={"Device type"}
          value={deviceType}
          onChange={onChangeDeviceType}
          margin="normal"
          required
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
            endpointError={s.endpointError}
            metadataError={s.metadataError}
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
          <Button type="submit" variant="contained">
            Add device
          </Button>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddDeviceForm;
