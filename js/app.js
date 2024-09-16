// Initialize the map
const map = L.map('carpetMap', {
    crs: L.CRS.Simple,    // Use a simple coordinate reference system
    minZoom: -2,          // Allow zooming out further to see the full image
    maxZoom: 4,           // Define how far users can zoom in
    zoomControl: true     // Enable zoom controls
  });
  
  // Dimensions of the image (based on your actual PNG dimensions)
  const imageWidth = 5585;   // Width of the PNG file
  const imageHeight = 3514;  // Height of the PNG file
  
  // Define the bounds of the image
  const imageBounds = [[0, 0], [imageHeight, imageWidth]];
  
  // Add the mosaic version of the image
  const mosaicLayer = L.imageOverlay('images/mosaic.png', imageBounds).addTo(map);
  
  // Add the original version of the image with low opacity to start
  const originalLayer = L.imageOverlay('images/original.png', imageBounds, {
    opacity: 0 // Initially fully transparent
  }).addTo(map);
  
  // Fit the image into the view by default (show the entire carpet when the page loads)
  map.fitBounds(imageBounds);
  
  // Add event listener for zoom to trigger color transitions based on zoom level
  map.on('zoomend', function() {
    const zoomLevel = map.getZoom();
    updateImageOpacity(zoomLevel);
  });
  
  // Function to update the opacity of the original image based on zoom level
  function updateImageOpacity(zoomLevel) {
    // Calculate the opacity based on zoom, assuming max zoom of 4 and min of -2
    let opacityLevel = (zoomLevel + 2) / 6;  // Adjust this range to fit your zoom
  
    // Apply the opacity level dynamically
    originalLayer.setOpacity(opacityLevel);
  }
  