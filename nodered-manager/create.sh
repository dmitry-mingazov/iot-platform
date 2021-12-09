#! /bin/bash
while getopts u:p: flag
do
    case "${flag}" in 
        u) user=${OPTARG};;
        p) port=${OPTARG};;
    esac
done
CONT_NAME=nodered-

docker rm -f ${CONT_NAME}${user}
docker run -d --rm -p ${port}:1880 \
    -v $(pwd)/users/${user}:/data \
    --name ${CONT_NAME}${user} \
    nodered/node-red