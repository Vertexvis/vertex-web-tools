#!/bin/bash

# This build script is a duplication from @vertexvis/build-tools as
# usage of that package introduced a cyclic dev dependency, which introduced
# a build issue while using lerna.
# TODO (jeff): move back to using build-tools when available on NPM

rollup --config ./rollup.config.js --silent
