#!/bin/bash

# Folder containing the photos
photo_folder="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all"

# Check if ImageMagick is installed
if ! command -v identify &> /dev/null; then
    echo "ImageMagick (identify and mogrify) is not installed. Install it and try again."
    exit 1
fi

# Find the minimum height among only image files
min_height=$(identify -format "%h\n" "$photo_folder"/*.{jpg,png,tif} 2>/dev/null | sort -n | head -n 1)

# Check if the min_height was retrieved
if [ -z "$min_height" ]; then
    echo "Failed to determine the minimum height. Please check the folder path and image formats."
    exit 1
fi

echo "The minimum height found is $min_height."

# Resize all valid image files to the minimum height, maintaining aspect ratio
for file in "$photo_folder"/*.{jpg,png,tif}; do
    # Check if the file exists
    if [ -f "$file" ]; then
        mogrify -resize x${min_height} "$file"
        echo "Resized $file to height $min_height."
    fi
done

echo "All photos have been resized to the minimum height of $min_height."



