import { useContext, useState, createContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import NodeRedService from "../../services/NodeRedService";

const getInstanceInterval = 10 * 1000;

const NodeRedContext = createContext();
const NodeRedStateContext = (props) => {
  const { token } = useContext(AuthContext);
  const [nodeRedUrl, setNodeRedUrl] = useState(null);
  const [flows, setFlows] = useState([]);
  const [isNodeRedReady, setNodeRedReady] = useState(false);
  const [isNodeRedLoading, setNodeRedLoading] = useState(true);
  const [pushedIds, setPushedIds] = useState({});

  useEffect(() => {
    if (token) {
      NodeRedService.getInstance().then((instance) => {
        setNodeRedUrl(instance.url);
      });
      setInterval(() => {
        NodeRedService.getInstance();
      }, getInstanceInterval);
    }
  }, [token]);

  useEffect(() => {
    if (nodeRedUrl) {
      NodeRedService.getFlows(nodeRedUrl).then((_flows) => {
        setFlows(_flows);
        setNodeRedReady(true);
        setNodeRedLoading(false);
      });
    }
  }, [nodeRedUrl]);

  const updatePushedIds = (deviceId, ids) => {
    const newDeviceIds = pushedIds[deviceId] || {};
    ids.forEach((id) => {
      newDeviceIds[id] = true;
    });
    const newPushedIds = pushedIds;
    newPushedIds[deviceId] = newDeviceIds;
    setPushedIds(newPushedIds);
  };

  const updateFlows = () => {
    NodeRedService.getFlows(nodeRedUrl).then((_flows) => {
      setFlows(_flows);
    });
  };

  const updateComment = async (flowId, newComment) => {
    const flowsToPost = await NodeRedService.getFlows(nodeRedUrl);
    const commentNodeIndex = flowsToPost.findIndex((element) => {
      if (element.z && element.type) {
        return element.z === flowId && element.type === "comment";
      } else return false;
    });

    if (commentNodeIndex !== -1) {
      flowsToPost[commentNodeIndex].info = newComment;
    } else {
      updateFlows();
      throw Error();
    }

    return NodeRedService.postFlows(nodeRedUrl, flowsToPost).then((_) => {
      updateFlows();
    });
  };

  const getUniqueNodeIds = (deviceId, requiredIds) => {
    const _ids = [];
    const usedIds = {};
    /* a node id is structured as `deviceId|counter`
         the following code gets all the ids matching the
         given deviceId, then saves their counter in the
         usedIds map <id, bool> */
    flows
      ?.map((flow) => flow.id)
      .filter((id) => id.split("|")[0] === deviceId)
      ?.map((id) => parseInt(id.split("|")[1]))
      ?.forEach((id) => {
        usedIds[id] = true;
      });
    let k = 0;
    const devicePushedIds = pushedIds[deviceId] || [];
    while (_ids.length < requiredIds) {
      const curr = k++;
      if (!usedIds[curr] && !devicePushedIds[curr]) {
        _ids.push(curr);
      }
    }
    updatePushedIds(deviceId, _ids);
    return _ids.map((id) => `${deviceId}|${id}`);
  };

  const value = {
    nodeRedUrl,
    getUniqueNodeIds,
    isNodeRedReady,
    isNodeRedLoading,
    flows,
    updateComment,
    updateFlows,
  };

  return (
    <NodeRedContext.Provider value={value}>
      {props.children}
    </NodeRedContext.Provider>
  );
};

function useNodeRed() {
  const context = React.useContext(NodeRedContext);
  if (context === undefined) {
    throw new Error("useNodeRed must be used within a NodeRedStateContext");
  }
  return context;
}

export { NodeRedContext, useNodeRed, NodeRedStateContext };
