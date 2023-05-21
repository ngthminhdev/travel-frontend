#!/bin/zsh

VERSION="0.0.6"

docker build -t ngthminhdev/b-info-frontend:${VERSION} .
docker push ngthminhdev/b-info-frontend:${VERSION}
