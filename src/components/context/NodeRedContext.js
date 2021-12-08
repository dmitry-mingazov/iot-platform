import { useContext, useState, createContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import NodeRedService from "../../services/NodeRedService";

const NodeRedContext = createContext();
const NodeRedStateContext = props => {
    const { token, isTokenReady } = useContext(AuthContext);
    const [ nodeRedUrl, setNodeRedUrl ] = useState(null);

    useEffect(() => {
        if (token) {
            NodeRedService.getInstance().then((instance) => {
                setNodeRedUrl(process.env.REACT_APP_MANAGER_URL+':'+instance.port+'?access_token='+token);
            });
        }
    }, [token]);

    return (
        <NodeRedContext.Provider
            value={{ nodeRedUrl }}
        >
            {props.children}
        </NodeRedContext.Provider>
    )
}
export { NodeRedContext, NodeRedStateContext };