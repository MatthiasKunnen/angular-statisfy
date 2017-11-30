#!/usr/bin/env bash

err=0
trap "err=1" ERR

npm run ts-lint

test ${err} = 0
