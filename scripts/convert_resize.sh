#!/bin/bash

# Folder containing the photos
photo_folder="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all"

# Convert all images (tif, jpg, jpeg, png) to PNG format
echo "Converting all images to PNG..."
for file in "$photo_folder"/*.{tif,tiff,jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert "$file" "${file%.*}.png"
        echo "Converted $file to PNG."
    fi
done

# Find the minimum height among all the PNG files
echo "Finding minimum height of the PNG files..."
min_height=$(identify -format "%h\n" "$photo_folder"/*.png | sort -n | head -n 1)

# Check if the min_height was retrieved
if [ -z "$min_height" ]; then
    echo "Failed to determine the minimum height. Please check the folder path and image formats."
    exit 1
fi

echo "The minimum height found is $min_height."

# Resize all PNG files to the minimum height, maintaining aspect ratio
echo "Resizing all PNG files to the minimum height..."
for file in "$photo_folder"/*.png; do
    mogrify -resize x${min_height} "$file"
    echo "Resized $file to height $min_height."
done

echo "All PNG images have been resized to the minimum height of $min_height."

