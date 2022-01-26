import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNodeRed } from "../components/context/NodeRedContext";
import Box from "@mui/material/Box";
import { Backdrop, CircularProgress } from "@mui/material";


const NodeRed = () => {
  const { nodeRedUrl, isNodeRedReady } = useNodeRed();
  const { flowId } = useParams();
  const [ isReady, setReady ] = useState(false);

  useEffect(() => {
    if (!nodeRedUrl) {return;}
    if (isNodeRedReady) {
      setReady(true);
    }
  }, [isNodeRedReady])

  return (
      isReady ? (
      <Box title="Node-RED" style={{display: "flex", minWidth: "100vw", height: "100%", flexDirection: "column", margin: -24}} >
        <iframe 
          title="Node-Red" 
          src={flowId ? `${nodeRedUrl}/#flow/${flowId}` : nodeRedUrl} 
          style={{flexGrow: 1, overflow: "hidden", border: "none", marginBottom: -48, padding: 0}} 
        />
      </Box>
      )
      :
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={!isReady}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}

export default NodeRed;
