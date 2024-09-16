#!/bin/bash

# Define source folders
source_folders=("MR" "AR" "IR" "MP" "MG")

# Define destination folder
destination_folder="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all"

# Iterate over each folder
for folder in "${source_folders[@]}"; do
    # Get the path of the current folder
    folder_path="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/$folder"
    
    # Check if the folder exists
    if [ -d "$folder_path" ]; then
        # Loop through each photo in the current folder
        for file in "$folder_path"/*; do
            # Get the file name
            filename=$(basename "$file")
            # Rename and move the file to the destination folder
            mv "$file" "$destination_folder/${folder}_$filename"
        done
    else
        echo "Folder $folder_path does not exist."
    fi
done

echo "All files have been renamed and moved to $destination_folder."

