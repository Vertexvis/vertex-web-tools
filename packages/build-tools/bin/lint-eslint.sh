#!/bin/bash

eslint --ext .ts,.tsx,.js,.jsx --ignore-path ../../.gitignore . "$@"
