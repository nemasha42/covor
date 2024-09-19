This project involves processing 640 photos into a high-resolution contact sheet (1200 DPI) and tiling the final output for efficient use of free Cloudinary storage. Below are the steps for preparing the contact sheet, editing in Photoshop, tiling the image, and uploading to Cloudinary.

## Steps:

### 1. Copy Photos with Origin Folder Suffix (Bash Script)

### 2. Clone Photos with Random Prefix (Bash Script)
Clone each photo X times and add a random 3-digit prefix, depending on how many clones are needed:

### 3. Steps in Photoshop

1. **Create Contact Sheet**:
   - Go to **File > Automate > Contact Sheet II**.
   - Set resolution to **1200 DPI**, columns to **32**, and rows to **20**.
   
2. **Remove White Spaces**:
   - Use the **Magic Wand Tool** to select the white areas between the photos and delete them.
   
3. **Overlay Contact Sheet**:
   - Open your covor layer, then go to **File > Place Embedded** to add the contact sheet.
   - Set **Blending Mode** to **Soft Light** and adjust **Opacity** to **38%**.

### 4. Tile the Contact Sheet for Smaller File Size
Use ImageMagick to tile the contact sheet into smaller pieces under 10MB for Cloudinary’s free tier:
```bash
magick original.png -crop 8x8@ +repage +adjoin original_%d.png
```
### 5. Upload Files to Cloudinary
Upload the tiled contact sheet files to Cloudinary using the Cloudinary dashboard or the API.

### 6. Extract Cloudinary Links
Use the following script `extract_cloudinary_links.sh` to extract the URLs of uploaded images:

### 7. Run the Project Locally (Visual Studio)
To run the project locally:
1. Double-click on `index.html`.
2. Select **Open with Live Server** in Visual Studio.
