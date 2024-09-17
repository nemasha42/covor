// Initialize the map
const map = L.map('carpetMap', {
    crs: L.CRS.Simple,    // Use a simple coordinate reference system
    minZoom: -2,          // Allow zooming out further to see the full image
    maxZoom: 2,           // Define how far users can zoom in
    zoomControl: true     // Enable zoom controls
});

// Dimensions of the image (based on your actual PNG dimensions)
const imageWidth = 5585;   // Width of the PNG file
const imageHeight = 3514;  // Height of the PNG file

// Define the bounds of the image
const imageBounds = [[0, 0], [imageHeight, imageWidth]];

// Add the low-resolution version of the mosaic image initially
const mosaicLayer = L.imageOverlay('images/mosaic_low_res.png', imageBounds).addTo(map);

// Add the original version of the image with low opacity to start
const originalLayer = L.imageOverlay('images/original_low_res.png', imageBounds, {
  opacity: 0 // Initially fully transparent
}).addTo(map);

// Fit the image into the view by default (show the entire carpet when the page loads)
map.fitBounds(imageBounds);

// Variable to track whether high-resolution images have been loaded
let highResLoaded = false;

// Event listener for zoom to trigger lazy loading and opacity changes
map.on('zoomend', function() {
  const zoomLevel = map.getZoom();
  updateImageOpacity(zoomLevel);
  
  // Load the high-resolution images only when zooming in past a certain level
  if (zoomLevel >= 0 && !highResLoaded) {
    loadHighResImages();
    highResLoaded = true; // Ensure this only happens once
  }
});

// Function to update the opacity of the original image based on zoom level
function updateImageOpacity(zoomLevel) {
  // Calculate the opacity based on zoom level (range from 0 to 1)
  let opacityLevel = (zoomLevel + 2) / 4;  // Adjust this range to fit your zoom
  originalLayer.setOpacity(opacityLevel);
}

// Function to load high-resolution images when zooming in
function loadHighResImages() {
  // Swap to high-resolution mosaic image from Dropbox
  mosaicLayer.setUrl('https://www.dropbox.com/scl/fi/shzc6hl9qi76nvgcr58ei/mosaic.png?rlkey=93jxa5x2tj1g0xkfrx3q9kpbv&st=sl0epiif&raw=1');

  // Swap to high-resolution original image from Dropbox (updated link)
  originalLayer.setUrl('https://www.dropbox.com/scl/fi/eikhd2wofowhknvq1ws7e/original.png?rlkey=9m44yltel2me8ke56l59e7mhw&st=6jhqnbk0&raw=1');
}
