FROM mongo

COPY script.js /docker-entrypoint-initdb.d

VOLUME ["/data/db"]

WORKDIR /data

CMD ["mongod"]

EXPOSE 27017
EXPOSE 28017
