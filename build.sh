#!/usr/bin/env bash
ng build --prod .
docker build -t nitrogopher
