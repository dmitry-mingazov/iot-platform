# :bulb: IoT Platform

## Overview

The project consists of a platform that allows the user to interface with the pre-existing *Node-RED** software in a more immediate and simpler way. 

## Table of Content

- [Project description](#project-description)
- [Installation](#installation)
    - [Authentication](#authentication)
    - [Backend](#backend)
    - [NodeRED Manager](#nodered-manager)
    - [Frontend](#frontend)
- [Authors](#authors)

**Node-RED* is a flow-based development tool for visual programming developed for wiring together hardware devices, APIs and online services as part of the *Internet of Things*.

## Project description

Through the platform it is possible to store and manage information related to *IoT* devices.
 A device can be added in the platform by inserting manually all the required information using the *add device* form or can be added through the *import devices* button using a pre-exported json file. After that a user can import one or more devices into *Node-RED*, creating a flow automatically with nodes related to their service information. 
 Furthermore the user can directly access to the *Node-RED* dashboard to visualize in a widget like fashion the *IoT* devices data.

All the devices information are stored following the *IoT-lite* ontology standard and the user has the possibility to download a turtle file clicking on the *export to TTL* button.

## Installation

*Note: more detailed instructions can be found inside each module folder*

#### Authentication

Since [Auth0]() is used for the authentication of the users, an active account with an Auth0 Application and an Auth0 API is needed.
Please follow the following two guides for their configuration: 
- https://auth0.com/docs/quickstart/spa/react
- https://auth0.com/docs/quickstart/backend/nodejs

*During the environment configuration, the following information will be needed:
- ISSUER_URL
- AUDIENCE
- DOMAIN
- CLIENT_ID

#### Backend


1. Move inside `backend` folder

1. Create a `.env` file following the `.env.sample` and fill it: 
    - `AUTH0_ISSUER_URL` & `AUTH0_AUDIENCE`: check [Authentication]()
    - `TEST_TOKEN`: a valid JWT token to perform e2e tests
    - *`MONGO_URL`: MongoDB url, can be omitted since docker-compose will handle it

1. Download and install [Docker]() and [docker-compose]()

1. Start the application:

    ```bash
    $ docker-compose up -d
    ```

    **Note that this command will also create and start a MongoDB instance*


#### NodeRED Manager

*The NodeRED manager must be run in a Linux environment*

1. Move inside the `nodered-manager` folder

1. Download your Auth0 public key at `ISSUER_URL`/pem 

1. Create a `.env` file following the `.env.sample` and fill it: 

    - `AUTH0_ISSUER_URL` & `AUTH0_AUDIENCE`: check [Authentication]()
    - `PATH_TO_PUBLIC_KEY`: path to the previously downloaded public key

1. Download and install [Docker]() and [NodeJS]() (preferably version 14)

1. Install the required dependencies:

    ```bash
    $ npm install
    ```

1. Create the `users` folder:

    ```bash
    $ mkdir users
    ```

1. Allow the `node` user to write inside the created folder: 

    ```bash
    $ sudo chown 1000:1000 users
    ```

1. Add execution permissions to the project scripts:

    ```bash
    $ chmod +x ./*.sh
    ```

1. Start the application:

    ```bash
    $ npm start
    ```
    

#### Frontend


1. Move inside the `frontend` folder

1. Create a `.env` file following the `.env.sample` and fill it: 

    - `*AUTH0*`: check [Authentication]()
    - `REACT_APP_API_URL`: backend url + /api (e.g. `http://localhost:3000/api`)
    - `REACT_APP_MANAGER_URL`: nodered-manager url + /api/nodered (e.g. `http://localhost:8000/api/nodered`)

1. Download and install [Docker]() and [docker-compose]()

2. Start the application:

    ```bash
    docker-compose up -d
    ```


## Authors
- *Dmitry Mingazov*
- *Luca Cervioni*
- *Tommaso Carletti*

