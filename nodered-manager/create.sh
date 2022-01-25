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

IMAGE_NAME=iot-platform-nodered:1.0

if [ -d "${NODE_DIR}" ]; then
    echo "${NODE_DIR} exists"
else
    mkdir ${NODE_DIR}
    chown 1000:1000 ${NODE_DIR}
fi

if [ docker-inspect --type=image ${IMAGE_NAME} ]; then 
    echo "${IMAGE_NAME} already existing"
else
    docker build -t ${IMAGE_NAME} .
fi

docker rm -f ${CONT_NAME}
docker run -d --rm -p ${port}:1880 \
    -v ${NODE_DIR}:/data \
    --name ${CONT_NAME} \
    ${IMAGE_NAME}