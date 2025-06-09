#!/bin/bash
cd /home/pi/local-server
git pull
docker compose down
docker compose up -d --build
