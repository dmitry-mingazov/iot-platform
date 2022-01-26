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

const createUiGroup = (device, uiTabId, id) => {
    const type = 'ui_group';
    const name = device.name;
    const tab = uiTabId;
    const width = '5'
    return {
        type,
        name,
        tab,
        width,
        id
    }
}

const canBeLinkedToUI = (interfaceType) => {
    return interfaceType.match(/in$/) || interfaceType.match(/listener$/);
}

const createUINode = (uiGroupId) => {
    const type = "ui_text";
    const group = uiGroupId;
    const format = "{{msg.payload}}"
    const name = 'text';

    return {
        type,
        name,
        format,
        group,
    }

}

const createHttpResponseNode = (id, {x, y}) => {
    const name = 'response';
    const type = 'http response';
    return {
        id,
        type,
        name,
        x,
        y
    }
}

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
             break;
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

const createGroupNode = (deviceName, serviceNodes, groupId) => {
    const id = groupId;
    const type = 'group';
    const nodes = [];
    const name = deviceName;
    const style = {label: true}
    serviceNodes.forEach((node) => {
        node['g'] = id;
        nodes.push(node['id']);
    })

    return {
        id,
        name,
        type,
        style,
        nodes
    }
}

const DEFAULT_X = 120;
const X_OFFSET = 170;
const Y_OFFSET = 45;


class NodeRedHelper {
    static getNodesFromDevice(device, getUniqueIds, _y, uiTabId) {
        const nodes = [];
        const configs = [];
        // i.e. ui nodes or http response for http in 
        const extraNodes = [];
        var x = DEFAULT_X;
        var y = _y; 

        let uiGroup;

        device.services.forEach(s => {
            const node = {x, y};
            const wires = [];
            y += Y_OFFSET;

            let configNode = createConfigNode(s.interfaceType);
            if (configNode) {
                configNode.id = getUniqueIds(device._id, 1)[0];
            }

            if (canBeLinkedToUI(s.interfaceType)) {
                if (!uiGroup) {
                    const idUiGroup = getUniqueIds(device._id, 1)[0];
                    uiGroup = createUiGroup(device, uiTabId, idUiGroup);
                    configs.push(uiGroup);
                }
                let id = getUniqueIds(device._id, 1)[0];
                let label = s.interfaceType;
                let uiNode = {
                    id,
                    label,
                    x: node.x + X_OFFSET * 2,
                    y: node.y,
                    ...createUINode(uiGroup.id)
                }
                wires.push([id]);
                extraNodes.push(uiNode);
            }

            node.type = s.interfaceType === 'http out' ? 'http response' : s.interfaceType;
            node.name = node.type;

            if (node.type == 'http in') {
                const id = getUniqueIds(device._id, 1)[0];
                const httpResponse = createHttpResponseNode(id, {x: x + X_OFFSET, y: node.y});
                wires.push([id]);
                extraNodes.push(httpResponse);
            }

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
            if(configNode) {
                configs.push(configNode)
            }
            node.wires = [
                [...wires]
            ]
            nodes.push(node);
        });
        // add id to each node
        const ids = getUniqueIds(device._id, nodes.length);
        for(let i = 0; i < nodes.length; i++) {
            nodes[i].id = ids[i];
        }

        const groupNode = createGroupNode(device.name, nodes, getUniqueIds(device._id, 1)[0])
        nodes.push(groupNode);

        nodes.push(...extraNodes);

        return {
            nodes,
            configs,
            y
        }
    }

    // static updateFlow(flowId, )

    static createEmptyFlow() {
        return {
            nodes: []
        }
    }

    static createUiTab(id) {
        const type = 'ui_tab';
        const name = 'Home';
        const icon = 'dashboard';
        return {
            id,
            type,
            name,
            icon
        }
    }

    static createCommentNode(flowId, comment, {x, y}) {
        const id = `${flowId}|DESC`;
        const type = 'comment';
        const name = 'Flow Description';
        return {
            id,
            x,
            y,
            type,
            name,
            info: comment
        }
    }

    static createFlowFromDevices(flowId, devices,label, comment, getUniqueIds, uiTabId) {
        const _nodes = [];
        const _configs = [];
        var _y = 100;
        var x = DEFAULT_X;

        const commentNode = this.createCommentNode(flowId, comment, {x, y: _y});
        _y += Y_OFFSET * 2;
        _nodes.push(commentNode);

        devices.forEach(device => {
            const  { nodes, configs, y } = this.getNodesFromDevice(device, getUniqueIds, _y, uiTabId);
            // to space more each group
            _y = y + Y_OFFSET;
            _nodes.push(...nodes);
            _configs.push(...configs);
        });
        return {
            label,
            nodes: _nodes,
            configs: _configs
        }
    }

}    

export default NodeRedHelper;