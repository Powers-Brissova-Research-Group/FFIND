#!/bin/bash

cat imgs.txt | while read line
do
grep "/$line.*" "files_Images"*.txt > img_locs/$line.txt;
done