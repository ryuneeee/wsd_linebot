#!/bin/sh

mkdir -p log
mkdir -p data
mongod --fork --dbpath ./data --logpath log/mongodb.log --logappend
