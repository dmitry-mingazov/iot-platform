import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeviceServiceForm from "../components/DeviceServiceForm";
import deviceTypes from "../components/data/deviceTypes.json";
import interfaceTypes from "../components/data/interfaceTypes.json";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { useSnackbar } from "../components/context/SnackbarContext";
import DeviceService from "../services/DeviceService";
import DeviceInformationForm from "../components/DeviceInformationForm";
import ServiceInfoManager from "../services/ServiceInfoManager";

//Styles
const useStyles = makeStyles({
  formColumn: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTextField-root": { width: "52ch" },
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
function AddDevice() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deviceName, setDeviceName] = useState("");
  const [deviceNameError, setDeviceNameError] = useState(false);
  const [deviceDescription, setDeviceDescription] = useState("");
  const [lastKey, setLastKey] = useState(0);
  const [deviceType, setDeviceType] = useState(deviceTypes[0].value);
  const [deviceServices, setDeviceServices] = useState([
    {
      key: lastKey,
      isFirst: true,
      isIn: true,
      interfaceType: interfaceTypes[0].value,
      serviceInfo: ServiceInfoManager.generateServiceInfo(
        interfaceTypes[0].value
      ),
    },
  ]);
  const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar();

  //Add service into the form
  const addService = () => {
    let newKey = lastKey + 1;
    setLastKey(newKey);
    setDeviceServices(
      deviceServices.concat({
        key: newKey,
        isFirst: false,
        isIn: true,
        interfaceType: interfaceTypes[0].value,
        serviceInfo: ServiceInfoManager.generateServiceInfo(
          interfaceTypes[0].value
        ),
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

  //Handle changes on device name
  const onDeviceNameChange = (event) => {
    setDeviceName(event.target.value);
  };

  const onDeviceDescriptionChange = (event) => {
    setDeviceDescription(event.target.value);
  };

  //Handle changes on device type
  const onDeviceTypeChange = (event) => {
    const newValue = event.target.value;
    setDeviceType(newValue);
  };

  //Handle changes on the out / in switch
  const onIsInSwitch = (key) => {
    const newDeviceServices = deviceServices.slice();
    const indexToReplace = newDeviceServices.findIndex((el) => el.key === key);
    if (indexToReplace !== -1) {
      const newIsIn = !newDeviceServices[indexToReplace].isIn;
      newDeviceServices[indexToReplace].isIn = newIsIn;
      const interfaceType = newDeviceServices[indexToReplace].interfaceType;
      newDeviceServices[indexToReplace].serviceInfo =
        ServiceInfoManager.generateServiceInfo(interfaceType, newIsIn);
      setDeviceServices(newDeviceServices);
    }
  };

  //Handle changes on the interface type of a service
  const onInterfaceTypeChange = (event, key) => {
    const newValue = event.target.value;
    const newDeviceServices = deviceServices.slice();
    const indexToReplace = newDeviceServices.findIndex((el) => el.key === key);
    if (indexToReplace !== -1) {
      const isIn = newDeviceServices[indexToReplace].isIn;
      newDeviceServices[indexToReplace].interfaceType = newValue;
      newDeviceServices[indexToReplace].serviceInfo =
        ServiceInfoManager.generateServiceInfo(newValue, isIn);
      setDeviceServices(newDeviceServices);
    }
  };

  //Handle changes on the service info of a service
  const onServiceInfoChange = (event, key, attribute) => {
    const newValue = event.target.value;
    const newDeviceServices = deviceServices.slice();
    const indexToReplace = newDeviceServices.findIndex((el) => el.key === key);
    if (indexToReplace !== -1) {
      newDeviceServices[indexToReplace].serviceInfo[attribute] = newValue;
      setDeviceServices(newDeviceServices);
    }
  };

  //Reset all textfield errors
  const resetErrors = () => {
    setDeviceNameError(false);
    const newDeviceServices = deviceServices.slice();
    newDeviceServices.forEach((service) => {
      newDeviceServices.serviceInfo = ServiceInfoManager.resetServiceInfoErrors(
        service.interfaceType,
        service.serviceInfo
      );
    });
    setDeviceServices(newDeviceServices);
  };

  //Check if the device name field is filled
  const isDeviceNameCorrect = () => {
    if (deviceName) {
      return true;
    } else {
      setDeviceNameError(true);
      return false;
    }
  };

  //Check if all the device services fields are filled
  const areServicesCorrect = () => {
    let error = false;

    const newDeviceServices = deviceServices.slice();
    newDeviceServices.forEach((service) => {
      error = ServiceInfoManager.checkServiceInfoErrors(
        service.interfaceType,
        service.isIn,
        service.serviceInfo,
        error
      );
    });
    if (error) {
      setDeviceServices(newDeviceServices);
      return false;
    } else {
      return true;
    }
  };

  const addDevice = async (e) => {
    e.preventDefault();
    resetErrors();

    if (isDeviceNameCorrect() & areServicesCorrect()) {
      let jsonObject;
      let jsonServices = [];
      deviceServices.forEach((service) => {
        const metadata = ServiceInfoManager.getServiceMetadata(
          service.serviceInfo
        );
        jsonServices.push({
          interfaceType:
            service.interfaceType + (service.isIn ? " in" : " out"),
          endpoint: ServiceInfoManager.getServiceEndpoint(
            service.interfaceType,
            service.isIn,
            service.serviceInfo
          ),
          metadata,
        });
      });
      jsonObject = {
        name: deviceName,
        description: deviceDescription,
        devtype: deviceType,
        services: jsonServices,
      };
      console.log(jsonObject);

      DeviceService.createDevice(jsonObject)
        .then((_) => {
          openSuccessSnackbar("Device added successfully");
          navigate("/");
        })
        .catch((_) => {
          openErrorSnackbar("Something went wrong!");
        });
    } else {
      openErrorSnackbar("Please fill the form");
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
        <DeviceInformationForm
          deviceName={deviceName}
          onDeviceNameChange={onDeviceNameChange}
          nameError={deviceNameError}
          deviceDescription={deviceDescription}
          onDeviceDescriptionChange={onDeviceDescriptionChange}
          deviceType={deviceType}
          deviceTypes={deviceTypes}
          onDeviceTypeChange={onDeviceTypeChange}
        ></DeviceInformationForm>
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
            isIn={s.isIn}
            interfaceType={s.interfaceType}
            serviceInfo={s.serviceInfo}
            onInterfaceTypeChange={(event) =>
              onInterfaceTypeChange(event, s.key)
            }
            onIsInSwitch={() => onIsInSwitch(s.key)}
            onServiceInfoChange={(event, attribute) =>
              onServiceInfoChange(event, s.key, attribute)
            }
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
    </Box>
  );
}

export default AddDevice;
