class NodeRedHelper {
    
    static createFlowFromDevice(device, getUniqueIds) {
        const label = `${device.name} flow`;
        const type = 'tab';
        const nodes = [];
        const configs = [];
        var y = 120;
        var x = 120;
        device.services.forEach(s => {
            const node = {x, y};
            y += 40;
            let configNode = undefined
            switch(s.interfaceType){
                case 'http out':
                    node.type = 'http response'
                    break;
                case s.interfaceType.match(/^mqtt/)?.input:
                    configNode = { // ugly, hopefully not everything is needed to avoid configuration errors in Node-RED
                    clientid: "",
                    autoConnect: true,
                    usetls: false,
                    keepalive: "15",
                    cleansession: true,
                    birthTopic: "",
                    birthQos: "0",
                    birthPayload: "",
                    birthMsg: {},
                    closeTopic: "",
                    closePayload: "",
                    closeMsg: {},
                    willTopic: "",
                    willQos: "0",
                    willPayload: "",
                    willMsg: {},
                    sessionExpiry: "",
                    credentials: {
                        user: "",
                        password: ""
                    }}
                    configNode['id'] = getUniqueIds(device._id, 1)[0];
                    configNode['type'] = 'mqtt-broker'
                    node.type = s.interfaceType;
                    break;
                case s.interfaceType.match(/^websocket/)?.input:
                    configNode = {}
                    configNode['id'] = getUniqueIds(device._id, 1)[0];
                    node.type = s.interfaceType;
                    break;
                default:
                    node.type = s.interfaceType;

            }
            node.name = device.name;
            s.metadata.forEach(m => {
                let key = undefined
                let value = undefined
                switch(m.metadataType){
                    case 'status':
                        key = 'statusCode'
                        break;
                    case 'typeIn':
                        key = 'server'
                        break;
                    case 'typeOut':
                        key = 'beserver'
                        break;
                    case 'address':
                        key = 'addr'
                        break;
                    case 'type':
                        if(m.value === 'websocket-listener'){
                            key = 'server'
                        } else if(m.value === 'websocket-client'){
                            key = 'client'
                        }
                        break;
                    default:
                        key = m.metadataType;

                }
                switch(m.metadataType){
                    case 'broker':
                        configNode['broker'] = m.value
                        value = configNode['id']
                        break;
                    case 'port':
                        if(s.interfaceType.match(/^mqtt/)){
                            configNode['port'] = m.value
                        } else {
                            value = m.value;
                        }
                        break;
                    case 'protocolVersion':
                        configNode['protocolVersion'] = m.value
                        break;
                    case 'type':
                        value = configNode['id']
                        configNode['type'] = m.value
                        break;
                    case 'path':
                        configNode['path'] = m.value
                        break;
                    case 'url':
                        if(s.interfaceType.match(/^websocket/)){
                            configNode['path'] = m.value
                        } else {
                            value = m.value
                        }
                        break;
                    default:
                        value = m.value;
                }
                if(key && value){
                    node[key] = value;
                }
            });
            if(configNode)
                configs.push(configNode)
            nodes.push(node);
        });
        // add id to each node
        const ids = getUniqueIds(device._id, nodes.length);
        for(let i = 0; i < nodes.length; i++) {
            nodes[i].id = ids[i];
        }

        return {
            label,
            type,
            nodes,
            configs
        }
    }

}
export default NodeRedHelper;