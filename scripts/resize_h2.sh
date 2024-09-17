#!/bin/bash

# Folder containing the photos
photo_folder="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all"

# Check if ImageMagick is installed
if ! command -v identify &> /dev/null; then
    echo "ImageMagick (identify and mogrify) is not installed. Install it and try again."
    exit 1
fi

# Find the minimum height among supported image files
min_height=$(find "$photo_folder" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.tif" -o -iname "*.tiff" \) -exec identify -format "%h\n" {} + | sort -n | head -n 1)

# Check if the min_height was retrieved
if [ -z "$min_height" ]; then
    echo "Failed to determine the minimum height. Please check the folder path and ensure it contains valid image files."
    exit 1
fi

echo "The minimum height found is $min_height."

# Resize all valid image files to the minimum height, maintaining aspect ratio
find "$photo_folder" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.tif" -o -iname "*.tiff" \) -exec mogrify -resize x${min_height} {} +

echo "All photos have been resized to the minimum height of $min_height."

