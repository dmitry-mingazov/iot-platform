# :bulb: IoT Platform
## Project description
The project consists of a platform that allows the user to interface with the pre-existing *Node-RED** software in a more immediate and simpler way. <br>
Through the platform it is possible to store and manage information related to *IoT* devices. A device can be added in the platform by inserting manually all the required information using the *add device* form or can be added through the *import devices* button using a pre-exported json file. After that a user can import one or more devices into *Node-RED*, creating a flow automatically with nodes related to their services information. Furthermore the user can directly access to the *Node-RED* dashboard to visualize in a widget like fashion the *IoT* devices data.<br>
All the devices information are stored following the *IoT-lite* ontology standard and the user has the possibility to download a turtle file clicking on the *export to TTL* button.
<br>

**Node-RED* is a flow-based development tool for visual programming developed for wiring together hardware devices, APIs and online services as part of the *Internet of Things*.

# :computer: Frontend - React JS

## Pages

- Login 
- Devices
- Add device
- Flows
- Node-RED editor
- Node-RED dashboard

## Prerequisites
- **Docker** <br/>
Downloadable here: https://docs.docker.com/get-docker/. <br/> <br/>

## Usage

- Create a *.env* file using the structure defined in the *.env.sample* file.

- Run this command to build the docker image and to run the docker container: <br/>
```docker-compose up```

## Tests

Run this command to perform all the unit tests: 
```npm run test:all```

# :computer: Backend - Nest JS

## Prerequisites
To write...

## Usage
To write...

## Tests
To write...

# :computer: Node-RED manager

## Prerequisites
To write...

## Usage
To write...

# :busts_in_silhouette: Authors
- *Dmitry Mingazov* 
- *Luca Cervioni*
- *Tommaso Carletti*

