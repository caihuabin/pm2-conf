#!/usr/bin/env bash

set -e
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

cpunum=$(python $basedir/../@mtfe/pm2-conf/bin/cpunum.py)

argv=$@

commandstr=$(node $basedir/../@mtfe/pm2-conf/bin/gen.js -argv "$argv" -cpunum $cpunum)

$commandstr
