#!/bin/bash

# Directories
source_dir="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all2/_all"
resH_dir="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all2/_resH"

# Step 3: Resize photos to the minimum height

# Create the _resH directory if it doesn't exist
mkdir -p "$resH_dir"

echo "Finding the minimum height among the images in _all..."

# Find the minimum height of the images in the _all folder
min_height=$(magick identify -format "%h\n" "$source_dir"/*.png | sort -n | head -n 1)

if [ -z "$min_height" ]; then
    echo "Error: Could not determine the minimum height. Make sure there are images in the source directory."
    exit 1
fi

echo "Minimum height found: $min_height. Resizing all images..."

# Resize all images to the minimum height and save them in _resH folder
for file in "$source_dir"/*.png; do
    magick "$file" -resize x${min_height} "$resH_dir/$(basename "$file")"
done

echo "All images resized to height $min_height and saved in _resH folder."

# Step 5: Duplicate photos in _resH to have exactly 693 photos with random prefixes

# Count the current number of images in _resH
num_images=$(ls "$resH_dir" | wc -l)

# Calculate how many times we need to duplicate
duplication_factor=$((693 / num_images + 1))

# Ensure we avoid the "Illegal byte sequence" error by restricting to A-Z, a-z, and 0-9
export LC_CTYPE=C

# Function to generate a random 3-character alphanumeric string
generate_random_prefix() {
    tr -dc 'A-Za-z0-9' </dev/urandom | head -c 3
}

echo "Duplicating photos in _resH to have exactly 693 photos with random prefixes..."

# Duplicate images until we reach or exceed 693 files
for ((i=1; i<=duplication_factor; i++)); do
    for file in "$resH_dir"/*.png; do
        random_prefix=$(generate_random_prefix)
        cp "$file" "$resH_dir/${random_prefix}_$(basename "$file")"
    done
done

# Check that we have exactly 693 photos, and remove any excess
num_files=$(ls "$resH_dir" | wc -l)
if [ "$num_files" -gt 693 ]; then
    echo "Trimming the number of photos to exactly 693..."
    ls "$resH_dir"/*.png | head -n 693 | xargs -I {} mv {} "$resH_dir/"
fi

# Final check to ensure exactly 693 photos exist
final_count=$(ls "$resH_dir" | wc -l)
if [ "$final_count" -eq 693 ]; then
    echo "Success: There are exactly 693 photos in the _resH folder."
else
    echo "Error: There are $final_count photos in the _resH folder. Please check the process."
fi

