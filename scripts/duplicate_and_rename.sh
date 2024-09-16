#!/bin/bash

# Define the source folder (where your original 99 photos are)
source_folder="/Users/nemasha/MyProjects/covor_naslavcea/photos_arch/all"

# Number of times to duplicate the photos (6 in this case to reach ~600 files)
duplication_factor=6

# Function to generate a random two-digit number
generate_random_number() {
    echo $((RANDOM % 90 + 10)) # Generates a number between 10 and 99
}

# Duplicate and rename photos
for ((i=1; i<=duplication_factor; i++)); do
    for file in "$source_folder"/*; do
        # Get the original file name and extension
        filename=$(basename "$file")
        extension="${filename##*.}"

        # Generate a random two-digit number
        random_prefix=$(generate_random_number)

        # Create the new file name with the random prefix
        new_filename="${random_prefix}_$filename"

        # Copy and rename the file in the same destination folder
        cp "$file" "$source_folder/$new_filename"
    done
done

echo "Files duplicated and renamed with random two-digit prefixes."

