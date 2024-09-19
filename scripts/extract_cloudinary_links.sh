#!/bin/bash

# Set your Cloudinary credentials
CLOUD_NAME="dy7vk4k8d"
API_KEY="814614169783343"
API_SECRET="uPZM4YLkDfumGTFvevcCZ90331Y"
FOLDER_NAME=""  # Leave blank to fetch from the root

# Initialize variables
next_cursor=""
base_url="https://api.cloudinary.com/v1_1/$CLOUD_NAME/resources/image"

# Function to fetch image URLs, with pagination support
fetch_urls() {
  local cursor=$1
  if [ -z "$cursor" ]; then
    response=$(curl -s -u "$API_KEY:$API_SECRET" "$base_url?prefix=$FOLDER_NAME")
  else
    response=$(curl -s -u "$API_KEY:$API_SECRET" "$base_url?prefix=$FOLDER_NAME&next_cursor=$cursor")
  fi

  # Extract and display the URLs using jq
  echo "$response" | jq -r '.resources[].secure_url'

  # Check if there's a next cursor for pagination
  next_cursor=$(echo "$response" | jq -r '.next_cursor')
}

# Loop through all pages
while true; do
  fetch_urls "$next_cursor"
  if [ -z "$next_cursor" ]; then
    break
  fi
done

