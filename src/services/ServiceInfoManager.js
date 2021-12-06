import qosTypes from "../components/data/mqttQos.json";
import protocolVersions from "../components/data/mqttProtocolVersions.json";
import httpMethods from "../components/data/httpMethods.json";
import webSocketTypes from "../components/data/webSocketTypes.json";
import tcpServerTypes from "../components/data/tcpServerTypes.json";
import tcpBeserverTypes from "../components/data/tcpBeserverTypes.json";
import udpIPVersions from "../components/data/udpIPVersions.json";
import MQTTForm from "../components/MQTTForm";
import HTTPForm from "../components/HTTPForm";
import WebSocketForm from "../components/WebSocketForm";
import TCPForm from "../components/TCPForm";
import UDPForm from "../components/UDPForm";
import React from "react";

class ServiceInfoManager {
  static generateServiceInfo(interfaceType) {
    switch (interfaceType) {
      case "mqtt":
        return {
          broker: "",
          port: "",
          topic: "",
          qos: qosTypes[2].value,
          protocolVersion: protocolVersions[2].value,
          brokerError: false,
          topicError: false,
        };
      case "http":
        return {
          url: "",
          method: httpMethods[0].value,
          status: "",
          urlError: false,
        };
      case "websocket":
        return {
          type: webSocketTypes[0].value,
          path: "",
          url: "",
          pathError: false,
          urlError: false,
        };
      case "tcp":
        return {
          typeIn: tcpServerTypes[0].value,
          typeOut: tcpBeserverTypes[0].value,
          host: "",
          port: "",
          hostError: false,
          portError: false,
        };
      case "udp":
        return {
          address: "",
          port: "",
          ipv: udpIPVersions[0].value,
          portError: false,
        };
      default:
        return {};
    }
  }

  static displayServiceInfo({
    interfaceType,
    serviceInfo,
    onServiceInfoChange,
    isIn
  }) {
    const interfaceTypes = {
      'mqtt': MQTTForm,
      'http': HTTPForm,
      'websocket': WebSocketForm,
      'tcp': TCPForm,
      'udp': UDPForm,
    }
    const form = interfaceTypes[interfaceType];
    return React.createElement(form, {serviceInfo, onServiceInfoChange, isIn});
  }

  static resetServiceInfoErrors(interfaceType, serviceInfo) {
    switch (interfaceType) {
      case "mqtt":
        serviceInfo.brokerError = false;
        serviceInfo.topicError = false;
        return serviceInfo;
      case "http":
        serviceInfo.urlError = false;
        return serviceInfo;
      case "websocket":
        serviceInfo.pathError = false;
        serviceInfo.urlError = false;
        return serviceInfo;
      case "tcp":
        serviceInfo.hostError = false;
        serviceInfo.portError = false;
        return serviceInfo;
      case "udp":
        serviceInfo.portError = false;
        return serviceInfo;
      default:
        return;
    }
  }

  static checkServiceInfoErrors(interfaceType, isIn, serviceInfo, error) {
    switch (interfaceType) {
      case "mqtt":
        if (!serviceInfo.broker) {
          serviceInfo.brokerError = true;
          error = true;
        }
        if (!serviceInfo.topic) {
          serviceInfo.topicError = true;
          error = true;
        }
        return error;
      case "http":
        if (isIn && !serviceInfo.url) {
          serviceInfo.urlError = true;
          error = true;
        }
        return error;
      case "websocket":
        if (serviceInfo.type === "websocket-listener") {
          if (!serviceInfo.path) {
            serviceInfo.pathError = true;
            error = true;
          }
        } else {
          if (!serviceInfo.url) {
            serviceInfo.urlError = true;
            error = true;
          }
        }
        return error;
      case "tcp":
        if (isIn) {
          if (serviceInfo.typeIn === "client" && !serviceInfo.host) {
            serviceInfo.hostError = true;
            error = true;
          }
          if (!serviceInfo.port) {
            serviceInfo.portError = true;
            error = true;
          }
        } else {
          if (serviceInfo.typeOut === "client" && !serviceInfo.host) {
            serviceInfo.hostError = true;
            error = true;
          }
          if (
            (serviceInfo.typeOut === "server" ||
              serviceInfo.typeOut === "client") &&
            !serviceInfo.port
          ) {
            serviceInfo.portError = true;
            error = true;
          }
        }
        return error;
      case "udp":
        if (!serviceInfo.port) {
          serviceInfo.portError = true;
          error = true;
        }
        return error;
      default:
        return error;
    }
  }

  static getServiceEndpoint(interfaceType, isIn, serviceInfo) {
    switch (interfaceType) {
      case "mqtt":
        return serviceInfo.broker;
      case "http":
        return serviceInfo.url;
      case "websocket":
        if (serviceInfo.type === "websocket-listener") {
          return serviceInfo.path;
        } else {
          return serviceInfo.url;
        }
      case "tcp":
        if (
          serviceInfo.typeIn === "client" ||
          serviceInfo.typeOut === "client"
        ) {
          return serviceInfo.host;
        } else {
          return "";
        }
      case "udp":
        if (isIn) {
          return "";
        } else {
          return serviceInfo.address;
        }
      default:
        return "";
    }
  }

  static getServiceMetadata(serviceInfo) {
    const metadata = [];
    // get only actual metadata excluding Error booleans
    const entries = Object
                      .entries(serviceInfo)
                      .filter(([key, value]) => !key.endsWith('Error') && value);
    for (const [metadataType, value] of entries) {
      metadata.push({metadataType, value});
    }
    return metadata;
  }
}

export default ServiceInfoManager;
