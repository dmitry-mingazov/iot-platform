import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { makeStyles } from "@mui/styles";
import FlowsTable from "../components/FlowsTable";

//Styles
const useStyles = makeStyles({
  title: {
    marginTop: 20,
    marginLeft: 60,
    fontWeight: "bold",
  },
  content: {
    height: "580px",
    marginRight: "60px",
    marginLeft: "60px",
    marginTop: "45px",
  },
});

function Flows() {
  const classes = useStyles();
  const { isTokenReady } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (isTokenReady) {
      //GET FLOWS AND SET ROWS
      setRows([
        { id: 1, col1: "Hello", col2: "World", col3: "Device1, Device2" },
        { id: 2, col1: "DataGrid", col2: "is Awesome", col3: "Device1" },
        { id: 3, col1: "MUI", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 4, col1: "Ciao", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 5, col1: "Daje", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 6, col1: "Aloyaa", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 7, col1: "Aloyb", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 8, col1: "Aloyc", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 9, col1: "Aloyd", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 10, col1: "Aloyf", col2: "is Amazing", col3: "Device1, Device2" },
        { id: 11, col1: "Aloytr", col2: "is Amazing", col3: "Device1" },
      ]);
    }
  }, [isTokenReady]);

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Flows
      </Typography>
      <div className={classes.content}>
        <FlowsTable rows={rows} />
      </div>
    </div>
  );
}

export default Flows;
