class NodeRedHelper {
    static createFlowFromDevice(device, getUniqueIds) {
        const label = `${device.name} flow`;
        const type = 'tab';
        const nodes = [];
        var y = 120;
        var x = 120;
        device.services.forEach(s => {
            const node = {x, y};
            y += 40;
            node.type = s.interfaceType;
            node.name = device.name;
            s.metadata.forEach(m => {
                const key = m.metadataType;
                const value = m.value;
                node[key] = value;
            });
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
            nodes
        }
    }

}
export default NodeRedHelper;