#!/bin/bash
IMAGE_NAME="frontend"
CONTAINER_NAME="frontend"

# Construir la imagen
docker build -t $IMAGE_NAME .

# Ejecutar el contenedor
docker run -p 80:3000 --name $FRONTEND_CONTAINER --network="network" --rm -d $FRONTEND_IMAGE