@echo off

@set CHANNEL_SECRET=[YOUR_CHANNEL_SECRET]
@set CHANNEL_ACCESS_TOKEN=[YOUR_CHANNEL_ACCESS_TOKEN]
@set PORT=5000

@mkdir data
@START "" "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath data
@START ng build --watch
@START node bin/www
