@echo off

@set CHANNEL_SECRET=636b6bdd1cd3cedd7a43b34faaca12a7
@set CHANNEL_ACCESS_TOKEN=R6Lbgz10yQw+bO3YDsvu69W3A57JM0uRo1XWyKcUStT/k1uNkJRQaZHkmEg6o/9tYTi/kk5toU49op8XltY0akYQQ82Z64bfkhzSpV51YPGicOSZ9l2mlSV+2gsWcBuW1GhaLzXdmg/6VuB8SJjWqAdB04t89/1O/w1cDnyilFU=
@set PORT=5000

@mkdir data
@START "" "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath data
@START ng build --watch
@START node bin/www
