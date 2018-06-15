#! /bin/bash

while IFS=$'\t' read -r -a vals
do
loc=${vals[0]}
grep "/$loc.*" "files_Images"*.txt > img_locs/$loc.txt
done < image_progress_list.txt