#! /bin/bash
while getopts u:p: flag
do
    case "${flag}" in 
        u) user=${OPTARG};;
        p) port=${OPTARG};;
    esac
done
CONT_NAME=nodered-${user}
NODE_DIR=$(pwd)/users/${user}

if [ -d "${NODE_DIR}" ]; then
    echo "${NODE_DIR} exists"
else
    mkdir ${NODE_DIR}
    chown 1000:1000 ${NODE_DIR}
fi

docker rm -f ${CONT_NAME}
docker run -d --rm -p ${port}:1880 \
    -v ${NODE_DIR}:/data \
    --name ${CONT_NAME} \
    nodered/node-red