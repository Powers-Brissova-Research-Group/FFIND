#! /bin/bash

touch "tmpfile.txt"

while IFS=$'\t' read -r -a vals
do
    # Essentially we are going to build a new file line by line
	newline=""
	loc=${vals[0]}

    # Copy over existing lines
	for val in "${vals[@]}"
	do
        # Remove newlines if they exist
		echo $val | tr -d '\n'
		newline+=$val$'\t'
	done

    # Search for relevant files and store in a temporary file
	grep "/$loc.*" "files_Images"*.txt > tmp.txt
	while read -r line
	do
        # Append file locations to the new line
		newline+=$line$'\t'
	done < tmp.txt

    # Remove our temporary file
	rm tmp.txt

    # Append the line to our return file
	echo "$newline" >> tmpfile.txt
done < image_progress_list.txt

