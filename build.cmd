@ECHO OFF
ng build --prod .
docker build -t nitrogopher
PAUSE
