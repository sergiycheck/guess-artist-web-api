#!/bin/sh

env

set -e
echo $PWD
echo $(ls -a)

command pnpm run start:debug
