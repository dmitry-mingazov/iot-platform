const createConfigNode = (interfaceType) => {
    const configNode = {};
    switch(interfaceType){
        case interfaceType.match(/^mqtt/)?.input:
            configNode['type'] = 'mqtt-broker'
            return configNode;
        case interfaceType.match(/^websocket/)?.input:
            return configNode;
        default:
            return;
    }
};

const mappedMetadata = {
    'status': 'statusCode',
    'typeIn': 'server',
    'typeOut': 'beserver',
    'address': 'addr',
}

const mapMetadataTypeToKey = (metadataType, value) => {
    let key  = mappedMetadata[metadataType] || metadataType;
    if(metadataType === 'type') {
        if (value === 'websocket-listener') {
            key = 'server';
        } else if (value === 'websocket-client') {
            key = 'client';
        }
    }
    return key;
};

const mapConfigValue = (metadataType, value, configNode) => {
    const _configNode = {...configNode};
    let _value = value;
    switch(metadataType) {
        case 'port':
        case 'protocolVersion':
        case 'path':
            _configNode[metadataType] = value;
            _value = undefined;
        case 'url':
            _configNode['path'] = value;
            _value = undefined;
            break;
        case 'broker':
        case 'type':
            _configNode[metadataType] = value;
            _value = _configNode.id;
    }
    return [_value, _configNode];
};

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
            let configNode = createConfigNode(s.interfaceType);
            if(configNode) {
                configNode.id = getUniqueIds(device._id, 1)[0];
            }
            // by far http out is the only not matching type
            node.type = s.interfaceType === 'http out' ? 'http response' : s.interfaceType;
            node.name = device.name;
            s.metadata.forEach(m => {
                let key = mapMetadataTypeToKey(m.metadataType, m.value);
                let value = m.value;
                if (configNode) {
                    [value, configNode] = mapConfigValue(m.metadataType, m.value, configNode)
                } 
                if (value) {
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