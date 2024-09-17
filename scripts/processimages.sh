#!/bin/bash

# Set the directory containing the PNG files
all_dir="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all2/_all"

# Step 4: Copy each file in the _all folder 3 times, adding a random 2-digit prefix
for img_file in "$all_dir"/*.png; do
    for i in {1..3}; do
        random_prefix=$(shuf -i 10-99 -n 1)  # Generate random 2-digit number
        cp "$img_file" "$all_dir/${random_prefix}_$(basename "$img_file")"
    done
done

echo "Copies created successfully!"

