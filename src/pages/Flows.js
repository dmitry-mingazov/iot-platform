import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import FlowsTable from "../components/FlowsTable";
import { CircularProgress, Box } from "@mui/material";
import { useNodeRed } from "../components/context/NodeRedContext";

//Styles
const useStyles = makeStyles({
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  title: {
    marginTop: 20,
    marginLeft: 60,
    fontWeight: "bold",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
    marginRight: "90px",
    marginLeft: "90px",
    marginTop: "45px",
    marginBottom: "65px",
  },
});

function Flows() {
  const classes = useStyles();
  const { flows } = useNodeRed();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapFlowsToRows = (flows) => {
    const flowsTemp = flows.slice();
    const rows = new Map();

    flowsTemp.forEach((flow) => {
      if (flow.type === "tab") {
        let rowTemp = rows.get(flow.id);
        if (!rowTemp) {
          rowTemp = {};
          rowTemp.id = flow.id;
        }
        rowTemp.col1 = flow.label;
        rows.set(flow.id, rowTemp);
      } else if (flow.type === "comment") {
        let rowTemp = rows.get(flow.z);
        if (!rowTemp) {
          rowTemp = {};
          rowTemp.id = flow.z;
        }
        rowTemp.col2 = flow.info;
        rows.set(flow.z, rowTemp);
      } else if (!flow.z) {
      } else {
        let rowTemp = rows.get(flow.z);
        if (!rowTemp) {
          rowTemp = {};
          rowTemp.id = flow.z;
        }
        rowTemp.col3 = rowTemp.col3
          ? rowTemp.col3 + ", " + flow.name
          : flow.name;
        rows.set(flow.z, rowTemp);
      }
    });

    return Array.from(rows.values());
  };

  useEffect(() => {
    if (flows.length > 0) {
      setLoading(true);
      const rows = mapFlowsToRows(flows);
      console.log(rows);
      setRows(rows);
      setLoading(false);
    }
  }, [flows]);

  return (
    <Box className={classes.containerColumn}>
      <Typography className={classes.title} variant="h4">
        Flows
      </Typography>
      <Box className={classes.grid}>
        {loading ? (
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            minHeight="100%"
          >
            <CircularProgress size={35} />
          </Box>
        ) : (
          <FlowsTable rows={rows} />
        )}
      </Box>
    </Box>
  );
}

export default Flows;
