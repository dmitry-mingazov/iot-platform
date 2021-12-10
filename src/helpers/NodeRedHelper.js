
var uuid = require('uuid');

class NodeRedHelper {
    static createFlowFromDevice(device) {
        const id = uuid.v4();
        const label = `${device.name} flow`;
        const type = 'tab';
        const nodes = [];
        var y = 120;
        var x = 120;
        device.services.forEach(s => {
            const node = {x, y};
            node['id'] = uuid.v4();
            y += 20;
            node.type = s.interfaceType;
            node.name = device.name;
            s.metadata.forEach(m => {
                const key = m.metadataType;
                const value = m.value;
                node[key] = value;
            });
            nodes.push(node);
        });
        return {
            id,
            label,
            type,
            nodes
        }
    }
}
export default NodeRedHelper;