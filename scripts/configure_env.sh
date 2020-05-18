#! /bin/bash

npm config set "//registry.npmjs.org/:_authToken=${npm_access_token}"
git config --global user.email "ops@vertexvis.com"
git config --global user.name "Jenkins CI"
git config credential.https://github.com.username ${git_user_credentials}