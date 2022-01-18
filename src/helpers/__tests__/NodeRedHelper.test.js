import NodeRedHelper from "../NodeRedHelper";

const getBogusIds = (id, length) => {
    return [...Array(length).keys()].map(n => `${n}`)
}

const bogusDevice = {
    name: 'bogusDevice',
    services: [{
        interfaceType: 'unused',
        metadata: [{
            metadataType: 'metadata1',
            value: 'first metadata'
        },
        {
            metadataType: 'metadata2',
            value: 'second metadata'
        }]
    }]
};
const bogusHttpInDevice = {
    name: 'bogusHttpInDevice',
    services: [{
        interfaceType: 'http in',
        metadata: [{
            metadataType: 'url',
            value: 'http in url'
        },
        {
            metadataType: 'method',
            value: 'GET'
        }]
    }]
};
const bogusHttpOutDevice = {
    name: 'bogusHttpOutDevice',
    services: [{
        interfaceType: 'http out',
        metadata: [{
            metadataType: 'status',
            value: '200'
        }]
    }]
};
const bogusTcpInServerDevice = {
    name: 'bogusTcpInServerDevice',
    services: [{
        interfaceType: 'tcp in',
        metadata: [{
            metadataType: 'typeIn',
            value: 'server'
        },{
            metadataType: 'port',
            value: '123'
        }]
    }]
};
const bogusTcpInClientDevice = {
    name: 'bogusTcpInClientDevice',
    services: [{
        interfaceType: 'tcp in',
        metadata: [{
            metadataType: 'typeIn',
            value: 'client'
        },{
            metadataType: 'port',
            value: '123'
        },{
            metadataType: 'host',
            value: 'host'
        }]
    }]
};
const bogusTcpOutServerDevice = {
    name: 'bogusTcpOutServerDevice',
    services: [{
        interfaceType: 'tcp out',
        metadata: [{
            metadataType: 'typeOut',
            value: 'server'
        },{
            metadataType: 'port',
            value: '123'
        }]
    }]
};
const bogusTcpOutClientDevice = {
    name: 'bogusTcpOutClientDevice',
    services: [{
        interfaceType: 'tcp out',
        metadata: [{
            metadataType: 'typeOut',
            value: 'client'
        },{
            metadataType: 'port',
            value: '123'
        },{
            metadataType: 'host',
            value: 'host'
        }]
    }]
};
const bogusTcpOutReplyDevice = {
    name: 'bogusTcpOutClientDevice',
    services: [{
        interfaceType: 'tcp out',
        metadata: [{
            metadataType: "typeOut",
            value: "reply",
        }]
    }]
};
const bogusUdpOutDevice = {
    name: 'bogusUdpOutDevice',
    services: [{
        interfaceType: 'udp out',
        metadata: [{
            metadataType: "address",
            value: "address"
        },
        {
            metadataType: "port",
            value: "123"
        },
        {
            metadataType: "ipv",
            value: "udp4"
        }]
    }]
};
const bogusUdpInDevice = {
    name: 'bogusUdpInDevice',
    services: [{
        interfaceType: 'udp in',
        metadata: [{
            metadataType: "port",
            value: "123"
        },
        {
            metadataType: "ipv",
            value: "udp4"
        }]
    }]
};
const bogusMQTTOutDevice = {
    name: 'bogusMQTTOutDevice',
    services: [{
        interfaceType: "mqtt out",
        metadata: [{
        metadataType: "broker",
        value: "brokerout",
    },
    {
        metadataType: "port",
        value: "123",
    },
    {
        metadataType: "topic",
        value: "topic",
    },
    {
        metadataType: "qos",
        value: "2",
    },
    {
        metadataType: "protocolVersion",
        value: "5",
    }]
}]
};
const bogusMQTTInDevice = {
    name: 'bogusMQTTInDevice',
    services: [{
        interfaceType: "mqtt in",
        metadata: [{
        metadataType: "broker",
        value: "brokerin",
    },
    {
        metadataType: "port",
        value: "123",
    },
    {
        metadataType: "topic",
        value: "topic",
    },
    {
        metadataType: "qos",
        value: "2",
    },
    {
        metadataType: "protocolVersion",
        value: "5",
    }]
}]
};
const bogusWebsocketInServerDevice = {
    name: 'bogusWebsocketInDevice',
    services: [{
        interfaceType: "websocket in",
        metadata: [{
            metadataType: "type",
            value: "websocket-listener" 
        },
        {
            metadataType: "path",
            value: "inserverpath"
        }]
}]
};
const bogusWebsocketInClientDevice = {
    name: 'bogusWebsocketInDevice',
    services: [{
        interfaceType: "websocket in",
        metadata: [{
            metadataType: "type",
            value: "websocket-client" 
        },
        {
            metadataType: "url",
            value: "inclienturl"
        }]
}]
};
const bogusWebsocketOutServerDevice = {
    name: 'bogusWebsocketInDevice',
    services: [{
        interfaceType: "websocket out",
        metadata: [{
            metadataType: "type",
            value: "websocket-listener" 
        },
        {
            metadataType: "path",
            value: "outserverpath"
        }]
}]
};
const bogusWebsocketOutClientDevice = {
    name: 'bogusWebsocketInDevice',
    services: [{
        interfaceType: "websocket out",
        metadata: [{
            metadataType: "type",
            value: "websocket-client" 
        },
        {
            metadataType: "url",
            value: "outclienturl"
        }]
}]
};

describe("NodeRedHelper", () => {
  test("http in device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusHttpInDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('http in');
    expect(flow.nodes[0].url).toBeDefined();
    expect(flow.nodes[0].url).toBe('http in url');
    expect(flow.nodes[0].method).toBeDefined();
    expect(flow.nodes[0].method).toBe('GET');
    
    expect(flow.configs).toBeDefined();    expect(flow.nodes.length).toBeGreaterThanOrEqual(1);

    expect(flow.configs.length).toBe(0);
  });
  test("http out (response) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusHttpOutDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('http response');
    expect(flow.nodes[0].statusCode).toBeDefined();
    expect(flow.nodes[0].statusCode).toBe('200');
    
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("tcp in (server) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusTcpInServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('tcp in');
    expect(flow.nodes[0].server).toBeDefined();
    expect(flow.nodes[0].server).toBe('server');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("tcp in (client) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusTcpInClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('tcp in');
    expect(flow.nodes[0].server).toBeDefined();
    expect(flow.nodes[0].server).toBe('client');
    expect(flow.nodes[0].host).toBeDefined();
    expect(flow.nodes[0].host).toBe('host');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("tcp out (server) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusTcpOutServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('tcp out');
    expect(flow.nodes[0].beserver).toBeDefined();
    expect(flow.nodes[0].beserver).toBe('server');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("tcp out (client) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusTcpOutClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('tcp out');
    expect(flow.nodes[0].beserver).toBeDefined();
    expect(flow.nodes[0].beserver).toBe('client');
    expect(flow.nodes[0].host).toBeDefined();
    expect(flow.nodes[0].host).toBe('host');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("tcp out (reply) device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusTcpOutReplyDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('tcp out');
    expect(flow.nodes[0].beserver).toBeDefined();
    expect(flow.nodes[0].beserver).toBe('reply');

    expect(flow.configs.length).toBe(0);
  });
  test("udp out device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusUdpOutDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('udp out');
    expect(flow.nodes[0].addr).toBeDefined();
    expect(flow.nodes[0].addr).toBe('address');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');
    expect(flow.nodes[0].ipv).toBeDefined();
    expect(flow.nodes[0].ipv).toBe('udp4');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("udp in device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusUdpInDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('udp in');
    expect(flow.nodes[0].port).toBeDefined();
    expect(flow.nodes[0].port).toBe('123');
    expect(flow.nodes[0].ipv).toBeDefined();
    expect(flow.nodes[0].ipv).toBe('udp4');

    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(0);
  });
  test("mqtt in device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTInDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('mqtt in');
    expect(flow.nodes[0].topic).toBeDefined();
    expect(flow.nodes[0].topic).toBe('topic');
    expect(flow.nodes[0].qos).toBeDefined();
    expect(flow.nodes[0].qos).toBe('2');
  });
  test("mqtt in broker should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTInDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('mqtt-broker');
    expect(flow.configs[0].broker).toBeDefined();
    expect(flow.configs[0].broker).toBe('brokerin');
    expect(flow.configs[0].port).toBeDefined();
    expect(flow.configs[0].port).toBe('123');
    expect(flow.configs[0].protocolVersion).toBeDefined();
    expect(flow.configs[0].protocolVersion).toBe('5');
  });
  test("mqtt in device and broker should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTInDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.length).toBeGreaterThanOrEqual(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].broker).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].broker)
  });
  test("mqtt out device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTOutDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('mqtt out');
    expect(flow.nodes[0].topic).toBeDefined();
    expect(flow.nodes[0].topic).toBe('topic');
    expect(flow.nodes[0].qos).toBeDefined();
    expect(flow.nodes[0].qos).toBe('2');
  });
  test("mqtt out broker should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTOutDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('mqtt-broker');
    expect(flow.configs[0].broker).toBeDefined();
    expect(flow.configs[0].broker).toBe('brokerout');
    expect(flow.configs[0].port).toBeDefined();
    expect(flow.configs[0].port).toBe('123');
    expect(flow.configs[0].protocolVersion).toBeDefined();
    expect(flow.configs[0].protocolVersion).toBe('5');
  });
  test("mqtt out device and broker should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusMQTTOutDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].broker).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].broker)
  });
  test("websocket server in device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('websocket in');
    expect(flow.nodes[0].server).toBeDefined();
  });
  test("websocket server in listener should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInServerDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('websocket-listener');
    expect(flow.configs[0].path).toBeDefined();
    expect(flow.configs[0].path).toBe('inserverpath');
  });
  test("websocket server in device and listener should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].server).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].server)
  });
  test("websocket client in device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('websocket in');
    expect(flow.nodes[0].client).toBeDefined();
  });
  test("websocket client in client should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInClientDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('websocket-client');
    expect(flow.configs[0].path).toBeDefined();
    expect(flow.configs[0].path).toBe('inclienturl');
  });
  test("websocket client in device and client should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketInClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].client).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].client)
  });
  test("websocket server out device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('websocket out');
    expect(flow.nodes[0].server).toBeDefined();
  });
  test("websocket server out listener should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutServerDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('websocket-listener');
    expect(flow.configs[0].path).toBeDefined();
    expect(flow.configs[0].path).toBe('outserverpath');
  });
  test("websocket server out device and listener should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutServerDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].server).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].server)
  });
  test("websocket client out device should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].type).toBeDefined();
    expect(flow.nodes[0].type).toBe('websocket out');
    expect(flow.nodes[0].client).toBeDefined();
  });
  test("websocket client out client should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutClientDevice, getBogusIds);
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBe(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.configs[0].type).toBeDefined();
    expect(flow.configs[0].type).toBe('websocket-client');
    expect(flow.configs[0].path).toBeDefined();
    expect(flow.configs[0].path).toBe('outclienturl');
  });
  test("websocket client out device and client should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusWebsocketOutClientDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    expect(flow.nodes.filter((node) => node.type !== 'group').length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.configs).toBeDefined();
    expect(flow.configs.length).toBeGreaterThanOrEqual(1);
    expect(flow.configs[0]).toBeDefined();
    expect(flow.nodes[0].client).toBeDefined();
    expect(flow.configs[0].id).toBe(flow.nodes[0].client)
  });
  test("group node should be defined", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    const nodes = flow.nodes.filter((node) => node.type === 'group');
    expect(nodes.length).toBe(1);
    expect(nodes[0]).toBeDefined();
  });
  test("group node should have correct parameters", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    const nodes = flow.nodes.filter((node) => node.type === 'group');
    expect(nodes.length).toBe(1);
    expect(nodes[0]).toBeDefined();
    expect(nodes[0].type).toBeDefined();
    expect(nodes[0].type).toBe('group');
    expect(nodes[0].name).toBeDefined();
    expect(nodes[0].name).toBe(bogusDevice.name);
  });
  test("group node and service nodes should be bound", () => {
    const flow = NodeRedHelper.getNodesFromDevice(bogusDevice, getBogusIds);
    expect(flow.nodes).toBeDefined();
    const nodes = flow.nodes.filter((node) => node.type === 'group');
    expect(nodes.length).toBe(1);
    expect(nodes[0]).toBeDefined();
    expect(nodes[0].nodes).toBeDefined();
    expect(nodes[0].nodes.length).toBe(1);
    expect(flow.nodes[0]).toBeDefined();
    expect(flow.nodes[0].g).toBeDefined();
    expect(flow.nodes[0].g).toBe(nodes[0].id);
  });
});
