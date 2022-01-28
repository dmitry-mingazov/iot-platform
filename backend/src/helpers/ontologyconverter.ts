const prefixes =
  '@base <http://unicam.tld.spm20212022.it/> .\n\
@prefix ssn: <http://www.w3.org/2005/Incubator/ssn/ssnx/ssn#> .\n\
@prefix iot-lite: <http://purl.oclc.org/NET/UNIS/fiware/iot-lite#> .\n\
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n\
@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n\
@prefix dc: <http://purl.org/dc/elements/1.1/> .\n\n';

const buildResult = (deviceTurtle, serviceTurtles, metadataTurtles) => {
  let res = prefixes;
  res += deviceTurtle;
  for (const serviceTurtle of serviceTurtles) res += serviceTurtle;
  for (const metadataTurtle of metadataTurtles) res += metadataTurtle;
  return res;
};
const buildMetadataTurtle = (metadataName, metadata) => {
  return `\
<${metadataName}> rdf:type iot-lite:Metadata ;\n\
iot-lite:metadataType "${metadata.metadataType}" ;\n\
iot-lite:metadataValue "${metadata.value}" .\n\n`;
};

const addMetadataReferences = (
  index,
  metadataTotal,
  serviceTurtle,
  metadataName,
) => {
  if (index != metadataTotal - 1) {
    serviceTurtle += `iot-lite:hasMetadata <${metadataName}> ;\n`;
  } else {
    serviceTurtle += `iot-lite:hasMetadata <${metadataName}> .\n\n`;
  }
  return serviceTurtle;
};

const addServiceReferences = (
  index,
  serviceTotal,
  deviceTurtle,
  serviceName,
) => {
  if (index != serviceTotal - 1) {
    deviceTurtle += `iot-lite:exposedBy <${serviceName}> ;\n`;
  } else {
    deviceTurtle += `iot-lite:exposedBy <${serviceName}> .\n\n`;
  }
  return deviceTurtle;
};

const buildServiceTurtle = (serviceName, service) => {
  return `\
<${serviceName}> rdf:type iot-lite:Service ;\n\
iot-lite:interfaceType "${service.interfaceType}" ;\n\
${service.endpoint ? `iot-lite:endpoint "${service.endpoint}" ;\n` : ''}`;
};

const buildDeviceTurtle = (device) => {
  const deviceName = `Device${device._id}`;
  const deviceType = `${
    device.devtype === 'SensingDevice' ? 'ssn' : 'iot-lite'
  }:${device.devtype}`;
  return `\
<${deviceName}> rdf:type  ${deviceType} ;\n\
iot-lite:id "${device._id}" ;\n\
foaf:name "${device.name}" ;\n\
dc:description "${device.description}" ;\n`;
};

class OntologyConverter {
  static deviceToOntology(device) {
    let deviceTurtle = buildDeviceTurtle(device);
    const serviceTurtles = [];
    const metadataTurtles = [];
    for (let i = 0; i < device.services.length; i++) {
      const serviceName = `Service${device._id}-${i}`;
      deviceTurtle = addServiceReferences(
        i,
        device.services.length,
        deviceTurtle,
        serviceName,
      );
      let serviceTurtle = buildServiceTurtle(serviceName, device.services[i]);
      const serviceMetadatas = device.services[i].metadata;
      for (let j = 0; j < serviceMetadatas.length; j++) {
        const metadataName = `Metadata${device._id}-${i}-${j}`;
        serviceTurtle = addMetadataReferences(
          j,
          serviceMetadatas.length,
          serviceTurtle,
          metadataName,
        );
        metadataTurtles.push(
          buildMetadataTurtle(metadataName, serviceMetadatas[j]),
        );
      }
      serviceTurtles.push(serviceTurtle);
    }
    return buildResult(deviceTurtle, serviceTurtles, metadataTurtles);
  }
}

export default OntologyConverter;
