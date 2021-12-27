#! /bin/bash
while getopts u:p: flag
do
    case "${flag}" in 
        u) user=${OPTARG};;
        p) port=${OPTARG};;
    esac
done

CONT_NAME=nodered-${user}
USER_DIR=$(pwd)/users/${user}

if [ ! -d "${USER_DIR}" ]; then
	mkdir ${USER_DIR}
	chown 1000:1000 ${USER_DIR}
fi

docker rm -f ${CONT_NAME}
docker run -d --rm -p ${port}:1880 \
    -v ${USER_DIR}:/data \
    --name ${CONT_NAME} \
    nodered/node-red
