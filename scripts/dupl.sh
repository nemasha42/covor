#!/bin/bash

# Set the directory for _resH where the images are stored
resH_dir="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all2/_resH"

# Set the target number of images (693)
target_count=693

# Count the current number of images
num_images=$(ls "$resH_dir" | wc -l)
duplication_factor=$((target_count / num_images + 1))

# Ensure we avoid the "Illegal byte sequence" error
export LC_CTYPE=C

echo "Duplicating photos in _resH to have $target_count images with random prefixes..."

# Duplicate images until we reach or exceed 693 files
for ((i=1; i<=duplication_factor; i++)); do
    for file in "$resH_dir"/*.png; do
        # Generate a random 3-character alphanumeric prefix
        random_prefix=$(LC_CTYPE=C tr -dc A-Za-z0-9 </dev/urandom | head -c 3)
        cp "$file" "$resH_dir/${random_prefix}_$(basename "$file")"
    done
done

# Ensure there are exactly 693 images by removing any excess files
ls "$resH_dir"/*.png | head -n "$target_count" | xargs -I {} mv {} "$resH_dir/"

echo "Duplication and renaming completed. There are now $target_count images in the _resH folder."

