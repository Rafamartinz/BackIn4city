 FROM mongo:6.0

COPY ./mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js

EXPOSE 27017