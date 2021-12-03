import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import httpMethods from "./data/httpMethods.json";

//Styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

//Component
function HTTPForm(props) {
  const classes = useStyles();
  const methods = httpMethods;

  return (
    <div>
      {props.isIn ? (
        <div>
          <TextField
            inputProps={{ "aria-label": "http url" }}
            className={classes.field}
            label="url"
            margin="normal"
            value={props.serviceInfo.url}
            onChange={(event) => props.onServiceInfoChange(event, "url")}
            required
            error={props.serviceInfo.urlError}
            fullWidth
          ></TextField>
          <TextField
            inputProps={{ "aria-label": "http method" }}
            className={classes.field}
            select
            label="Method"
            margin="normal"
            value={props.serviceInfo.method}
            onChange={(event) => props.onServiceInfoChange(event, "method")}
            fullWidth
          >
            {methods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      ) : (
        <TextField
          inputProps={{ "aria-label": "http status" }}
          className={classes.field}
          label="Status"
          margin="normal"
          value={props.serviceInfo.status}
          onChange={(event) => props.onServiceInfoChange(event, "status")}
          fullWidth
        ></TextField>
      )}
    </div>
  );
}

export default HTTPForm;
