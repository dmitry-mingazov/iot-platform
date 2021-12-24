import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { makeStyles } from "@mui/styles";

//Styles
const useStyles = makeStyles({
  title: {
    margin: 20,
    fontWeight: "bold",
  },
});

function Flows() {
  const classes = useStyles();
  const { isTokenReady } = useContext(AuthContext);

  // will run only on first render
  useEffect(() => {
    if (isTokenReady) {
      //take flows
    }
  }, [isTokenReady]);

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Flows
      </Typography>
    </div>
  );
}

export default Flows;
