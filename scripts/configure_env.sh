#! /bin/bash

npm config set "//npm.ops.vertexvis.io/:_authToken" "${internal_npm_access_token}"
npm config set "//registry.npmjs.org/:_authToken=${public_npm_access_token}"
