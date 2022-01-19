import { useContext, useState, createContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import NodeRedService from "../../services/NodeRedService";
import NodeRedHelper from "../../helpers/NodeRedHelper";


const getInstanceInterval = 10*1000;
const NR_TIMEOUT = 3000;


const NodeRedContext = createContext();
const NodeRedStateContext = (props) => {
  const { token } = useContext(AuthContext);
  const [nodeRedUrl, setNodeRedUrl] = useState(null);
  const [flows, setFlows] = useState([]);
  const [isNodeRedReady, setNodeRedReady] = useState(false);
  const [isNodeRedLoading, setNodeRedLoading] = useState(true);
  const [pushedIds, setPushedIds] = useState({});

  const getInstance = () => {
      NodeRedService.getInstance().then(instance => {
          if (instance.url !== nodeRedUrl) {
              setNodeRedUrl(instance.url);
          }
      }).catch(_ => {
          setNodeRedReady(false);
          setNodeRedLoading(false);
          setNodeRedUrl(undefined);
      });
  }

  useEffect(() => {
      if (token) {
          getInstance();
          setInterval(() => {
              getInstance();
          }, getInstanceInterval);
      }
  }, [token]);

  useEffect(() => {
      if (nodeRedUrl) {
          setTimeout(() => {
              getFlows(nodeRedUrl);
          }, NR_TIMEOUT);
      }
  }, [nodeRedUrl])

  const getFlows = (nodeRedUrl) => {
      NodeRedService.getFlows(nodeRedUrl).then(_flows => {
          setFlows(_flows);
          setNodeRedReady(true);
          setNodeRedLoading(false);
      }).catch(_ => {
          setTimeout(() => {
              getFlows(nodeRedUrl);
          }, NR_TIMEOUT);
      });
  }

  const updatePushedIds = (deviceId, ids) => {
      const newDeviceIds = pushedIds[deviceId] || {};
      ids.forEach(id => {
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
    const flowToUpdate = await NodeRedService.getFlow(nodeRedUrl, flowId);
    let commentNode = flowToUpdate.nodes.find(({id}) => {
      if (id.match(/[^\|]*\|DESC/)) {
        return id.split('|')[0] === flowId;
      }
    });
    if (commentNode) {
      commentNode.info = newComment;
    } else {
      // if commentNode doesn't exist, create a new one
      commentNode = NodeRedHelper.createCommentNode(flowId, newComment, {x: 120, y: 100});
      flowToUpdate.nodes.push(commentNode);
    }
    // groups aren't fetched by getFlow call, so is needed to retrieve them
    // separately
    const _flows = await NodeRedService.getFlows(nodeRedUrl);
    const groups = _flows.filter(flowObj => {
      const {z, type} = flowObj;
      if (type === 'group' && z === flowId) {
        return true;
      }
    });
    if(groups) {
      flowToUpdate.nodes.push(...groups);
    }

    return NodeRedService.updateFlow(nodeRedUrl, flowId, flowToUpdate).then((_) => {
      updateFlows();
    });
  };

  const createNewFlow = (label, comment, devices) => {
    const emptyFlow = NodeRedHelper.createEmptyFlow();
    // let flowId = 'TEST';

    // const flow = NodeRedHelper.createFlowFromDevices(flowId, devices, comment, getUniqueNodeIds);
    // console.log(JSON.stringify(flow));
    // console.log((flow));
    // return;
    return NodeRedService.createFlow(nodeRedUrl, emptyFlow)
      .then(({id}) => {
        const flowId = id;
        const flow = NodeRedHelper.createFlowFromDevices(flowId, devices, label, comment, getUniqueNodeIds);
        console.log(JSON.stringify(flow));
        return NodeRedService.updateFlow(nodeRedUrl, flowId, flow)
        .then(_ => {
          return flowId;
        });
      })
      .catch(error => {
        console.error('Error in creating the flow');
      });
  }

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
    createNewFlow,
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
