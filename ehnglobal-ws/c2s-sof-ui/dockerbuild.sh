#!/usr/bin/env bash
export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
npm run build && docker build --build-arg PACKAGE_VERSION=$PACKAGE_VERSION -t bhits/c2s-sof-ui:$PACKAGE_VERSION .
