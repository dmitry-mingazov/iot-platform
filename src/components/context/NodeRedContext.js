import { useContext, useState, createContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import NodeRedService from "../../services/NodeRedService";

const getInstanceInterval = 10*1000;

const NodeRedContext = createContext();
const NodeRedStateContext = props => {
    const { token } = useContext(AuthContext);
    const [ nodeRedUrl, setNodeRedUrl ] = useState(null);
    const [ flows, setFlows ] = useState([]);
    const [ isNodeRedReady, setNodeRedReady ] = useState(false);

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
            NodeRedService.getFlows(nodeRedUrl).then(_flows => {
                setFlows(_flows);
                setNodeRedReady(true);
            });
        }
    }, [nodeRedUrl])

    return (
        <NodeRedContext.Provider
            value={{ nodeRedUrl }}
        >
            {props.children}
        </NodeRedContext.Provider>
    )
}
export { NodeRedContext, NodeRedStateContext };