#!/bin/bash

# Set the base directory
base_dir="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all2"
target_dir="$base_dir/_all"

# 1. Collect all TIFF files in one folder "_all" and append folder name to each file
echo "Collecting all TIFF files into one folder and renaming them..."
mkdir -p "$target_dir"
for folder in "$base_dir"/*; do
    if [ -d "$folder" ]; then
        folder_name=$(basename "$folder")
        for file in "$folder"/*.tif; do
            if [ -f "$file" ]; then
                # Add folder name at the end of the file name
                cp "$file" "$target_dir/$(basename "${file%.*}")_$folder_name.tif"
            fi
        done
    fi
done

# 2. Convert all TIFF files to PNG in the "_all" folder
echo "Converting all TIFF files to PNG..."
for file in "$target_dir"/*.tif; do
    if [ -f "$file" ]; then
        magick "$file" "${file%.*}.png"
        rm "$file"  # Optionally delete the original TIFF file after conversion
    fi
done

# 3. Resize all PNG files to the minimum height and save them to "_resH" folder
resH_dir="$base_dir/_resH"
mkdir -p "$resH_dir"

echo "Finding the minimum height among PNG images..."
min_height=$(magick identify -format "%h\n" "$target_dir"/*.png | sort -n | head -n 1)

echo "Resizing all images to the minimum height ($min_height)..."
for file in "$target_dir"/*.png; do
    magick "$file" -resize x${min_height} "$resH_dir/$(basename "$file")"
done

# 4. Crop all PNG files to square, centered, and save to "_resSQ" folder
resSQ_dir="$base_dir/_resSQ"
mkdir -p "$resSQ_dir"

echo "Finding the minimum width among PNG images..."
min_width=$(magick identify -format "%w\n" "$target_dir"/*.png | sort -n | head -n 1)

echo "Cropping all images to $min_width x $min_width square, centered..."
for file in "$target_dir"/*.png; do
    magick "$file" -gravity center -crop ${min_width}x${min_width}+0+0 "$resSQ_dir/$(basename "$file")"
done

# 5. Duplicate the photos in "_resH" to have 693 files and add random prefix
echo "Duplicating photos in _resH to have 693 images with random prefixes..."
num_images=$(ls "$resH_dir" | wc -l)
duplication_factor=$((693 / num_images + 1))

for ((i=1; i<=duplication_factor; i++)); do
    for file in "$resH_dir"/*.png; do
        random_prefix=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 3)
        cp "$file" "$resH_dir/${random_prefix}_$(basename "$file")"
    done
done

# Remove extra files if necessary (in case we have more than 693)
ls "$resH_dir"/*.png | head -n 693 | xargs -I {} mv {} "$resH_dir/"
echo "All steps completed successfully."

