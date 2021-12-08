import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/context/AuthContext";
import { NodeRedContext } from "../components/context/NodeRedContext";
import Box from "@mui/material/Box";


function NodeRed() {
  const { nodeRedUrl } = useContext(NodeRedContext);

  return (
        <Box title="Node-RED" style={{display: "flex", minWidth: "100vw", height: "100%", flexDirection: "column", margin: -24}} >
        <iframe title="Node-Red" src={nodeRedUrl} style={{flexGrow: 1, overflow: "hidden", border: "none", marginBottom: -48, padding: 0}} />
        </Box>
  );
}

export default NodeRed;
