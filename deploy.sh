#!/bin/bash
echo "DEPLOYING"
pm2 stop all && cd /home/jazy/node-api && git pull && yarn tsc && yarn migrate && pm2 start all
