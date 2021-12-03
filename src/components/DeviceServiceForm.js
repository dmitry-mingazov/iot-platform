import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import interfaces from "./data/interfaceTypes.json";
import { Button, Stack, Typography, Switch, Box } from "@mui/material";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  typeRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  typeRowField: {
    marginTop: 20,
    marginBottom: 0,
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
  textTypeSelected: {
    fontWeight: "bold",
  },
});

//Component
function DeviceServiceForm(props) {
  const classes = useStyles();
  const interfaceTypes = interfaces;

  return (
    <div>
      {props.isFirst ? null : <div className={classes.divider} />}
      <Box className={classes.typeRow}>
        <TextField
          inputProps={{ "aria-label": "service interface" }}
          className={classes.typeRowField}
          select
          label="Interface type"
          margin="normal"
          value={props.interface}
          onChange={(event) => props.onInterfaceTypeChange(event)}
          required
          style={{ width: "100%" }}
          fullWidth
        >
          {interfaceTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Stack
          marginLeft={2}
          flex={"auto"}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Typography className={props.isIn ? null : classes.textTypeSelected}>
            Out
          </Typography>
          <Switch
            defaultChecked
            inputProps={{ "aria-label": "Switch in out" }}
            value={props.isIn}
            onChange={props.onIsInSwitch}
          />
          <Typography className={props.isIn ? classes.textTypeSelected : null}>
            In
          </Typography>
        </Stack>
      </Box>
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
