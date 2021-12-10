import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../components/context/AuthContext";
import { NodeRedContext } from "../components/context/NodeRedContext";
import Box from "@mui/material/Box";
import DeviceService from "../services/DeviceService";
import NodeRedService from "../services/NodeRedService";
import NodeRedHelper from "../helpers/NodeRedHelper";
import { Backdrop, CircularProgress } from "@mui/material";


const NodeRed = () => {
  const { nodeRedUrl } = useContext(NodeRedContext);
  const { action, deviceId } = useParams();
  const [ isReady, setReady ] = useState(false);

  useEffect(() => {
    if (!nodeRedUrl) {return;}
    if (action === 'export') {
      DeviceService.getDevice(deviceId).then(device => {
        const flow = NodeRedHelper.createFlowFromDevice(device);
        NodeRedService.createFlow(nodeRedUrl, flow).then(() => {
          setReady(true);
        });
      });
    } else {
      setReady(true);
    }
  }, [nodeRedUrl])

  return (
      isReady ? (
      <Box title="Node-RED" style={{display: "flex", minWidth: "100vw", height: "100%", flexDirection: "column", margin: -24}} >
        <iframe title="Node-Red" src={nodeRedUrl} style={{flexGrow: 1, overflow: "hidden", border: "none", marginBottom: -48, padding: 0}} />
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
