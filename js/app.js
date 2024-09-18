// Initialize the map
const map = L.map('carpetMap', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2,
    zoomControl: true
});

// Dimensions of the entire image (low-resolution mosaic)
const imageWidth = 5585;   // Width of the PNG file
const imageHeight = 3514;  // Height of the PNG file

// Define the bounds of the image
const imageBounds = [[0, 0], [imageHeight, imageWidth]];

// Add the low-resolution version of the mosaic image initially
const mosaicLayer = L.imageOverlay('/images/mosaic.png', imageBounds).addTo(map);

// Fit the image into the view by default (show the entire carpet when the page loads)
map.fitBounds(imageBounds);

// List of Cloudinary high-resolution tile URLs
const cloudinaryTileUrls = [
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665090/original_0_r9wmnd.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665289/original_1_zt1som.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665290/original_2_y9vya3.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665292/original_3_pbgcdr.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665292/original_4_t0jze2.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665293/original_5_oo9slk.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665294/original_6_jnf7tw.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665295/original_7_axv40i.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665296/original_8_euygny.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665298/original_9_mvo0wb.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665300/original_10_znmoz6.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665301/original_11_lzzkod.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665302/original_12_ofuyqp.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665305/original_13_mz0ozk.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665327/original_14_rmfazd.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665346/original_15_yd1vyp.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665347/original_16_i4w1k2.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665348/original_17_r8bp11.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665350/original_18_iavouw.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665351/original_19_kkxphz.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665353/original_20_beueun.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665360/original_21_pf6r4l.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665361/original_22_jvsogd.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665362/original_23_q3gami.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665430/original_24_mbg1pk.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665431/original_25_tjhcx9.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665432/original_26_vqzh2l.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665433/original_27_xm6crt.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665435/original_28_awu4av.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665634/original_29_hyd1xa.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665635/original_30_j9ebve.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665635/original_31_wqklvn.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665637/original_32_phl5gb.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665639/original_33_to5oht.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665639/original_34_bew5aw.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665641/original_35_hkeg7x.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665642/original_36_a0ug2w.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665643/original_37_hgbhkp.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665644/original_38_pwscyl.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665645/original_39_owwpge.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665646/original_40_gotcez.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665648/original_41_mtm6te.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668801/original_42_lbdqpd.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668801/original_43_z9dyoq.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668801/original_44_h4sjvn.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668801/original_45_zlizmo.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668805/original_46_qvqyju.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668801/original_47_prpii2.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668810/original_48_os4a7w.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668809/original_49_fj5esj.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668810/original_50_zrykpg.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668809/original_51_vy5taw.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668807/original_52_bratqa.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668805/original_53_rdathg.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668805/original_54_sgpubo.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668804/original_55_al4q9a.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668804/original_56_ilacuh.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668803/original_57_acmv4t.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668809/original_58_rl8ozr.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668811/original_59_l4wo7z.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668807/original_60_rzok3v.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668808/original_61_bnxnrr.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726668806/original_62_l4gosw.png",
    "https://res.cloudinary.com/dy7vk4k8d/image/upload/v1726665287/original_63_ogy2wq.png"
];

// Define tile positions based on the 8x8 grid of images
const numTilesX = 8;
const numTilesY = 8;
const tileWidth = imageWidth / numTilesX;
const tileHeight = imageHeight / numTilesY;

// Create a LayerGroup to hold the high-resolution tiles
let tileLayerGroup = L.layerGroup().addTo(map);

// Add event listener for zoom to trigger loading of high-resolution images and adjust opacity
map.on('zoomend', function () {
    const zoomLevel = map.getZoom();
    const maxZoom = map.getMaxZoom();
    const minZoom = map.getMinZoom();

    // Calculate opacity based on zoom level (normalized between 0 and 1)
    const opacity = (zoomLevel - minZoom) / (maxZoom - minZoom);

    // Update the opacity of the mosaic layer and high-res tiles
    mosaicLayer.setOpacity(1 - opacity); // Mosaic becomes transparent as you zoom in
    updateHighResTiles(opacity); // High-res tiles become opaque as you zoom in
});

// Function to update high-resolution tiles
function updateHighResTiles(opacity) {
    // If opacity is near zero, remove high-res tiles
    if (opacity <= 0) {
        tileLayerGroup.clearLayers();
        return;
    }

    // If tiles are already loaded, just update their opacity
    if (tileLayerGroup.getLayers().length > 0) {
        tileLayerGroup.eachLayer(function (layer) {
            layer.setOpacity(opacity);
        });
        return;
    }

    // Load and add high-resolution tiles
    for (let i = 0; i < numTilesY; i++) {
        for (let j = 0; j < numTilesX; j++) {
            const tileIndex = (numTilesY - 1 - i) * numTilesX + j;
            const tileUrl = cloudinaryTileUrls[tileIndex];

            if (tileUrl) {
                const x1 = j * tileWidth;
                const x2 = (j + 1) * tileWidth;
                const y1 = i * tileHeight;
                const y2 = (i + 1) * tileHeight;

                const tileBounds = [
                    [y1, x1],
                    [y2, x2]
                ];

                // Debugging log
                console.log(`Placing tileIndex ${tileIndex} (Tile URL: ${tileUrl}) at position i=${i}, j=${j}, Bounds: ${tileBounds}`);

                const tileLayer = L.imageOverlay(tileUrl, tileBounds, {
                    opacity: opacity
                });

                tileLayerGroup.addLayer(tileLayer);
            } else {
                console.error(`No URL found for tile index ${tileIndex}`);
            }
        }
    }
}






