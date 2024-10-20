// // Store our API endpoints as queryUrl and plateUrl
// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// let plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// // Perform a GET request to the query URL
// d3.json(queryUrl).then(function(earthquakeData) {
//     d3.json(plateUrl).then(function(plateData) {
//         console.log(earthquakeData);
//         console.log(plateData);
//         createFeatures(earthquakeData.features, plateData.features);
//     });
// });

// // Create markers whose size increases with magnitude and color with depth
// function createMarker(feature, latlng) {
//     return L.circleMarker(latlng, {
//         radius: markerSize(feature.properties.mag),
//         fillColor: markerColor(feature.geometry.coordinates[2]),
//         color:"#000",
//         weight: 0.5,
//         opacity: 0.5,
//         fillOpacity: 1
//     });
// }

// function createFeatures(earthquakeData, plateData) {
//     //Define function to run for each feature in the features array.
//     // Give each feature a popup that describes the time and place of the earthquake.
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>Location:</h3> ${feature.properties.place}<h3> Magnitude:</h3> ${feature.properties.mag}<h3> Depth:</h3> ${feature.geometry.coordinates[2]}`);
//     }

//     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//     // Run the onEachFeature function for each piece of data in the array.
//     let earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature,
//         pointToLayer: createMarker
//     });
//     // Create a GeoJSON layer that contains the features array on the plateData object.
//     let plates = L.geoJSON(plateData, {
//         style: function() {
//             return {
//                 color: "orange",
//                 weight: 2.5
//             }
//         }
//     });

//     // Send earthquakes layer to the createMap function
//     createMap(earthquakes, plates);
// }

// function createMap(earthquakes, plates) {
//     // Create the base layers
//     let darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
//         maxZoom: 19
//     });

//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });

    
//     // Create a baseMaps object
//     let baseMaps = {
//         "Grayscale": darkMap,
//         "Outdoor": street,
//         "Satellite": topo
//     };

//     // Create an overlay object to hold our overlay.
//     let overlayMaps = {
//         "Earthquakes": earthquakes,
//         "Tectonic Plates": plates
//     };

//     // Create map
//     let myMap = L.map("map", {
//         center: [37.09, -95.71],
//         zoom: 5,
//         layers: [darkMap, earthquakes, plates] // Start with darkMap
//     });

//     // Create a control
//     // Pass in baseMaps and overlayMaps
//     // Add the control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap); 
//     // Add a legend to the map
//     let legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//         let div = L.DomUtil.create('div', 'info legend'),
//             depthRanges = [-10, 10, 30, 50, 70, 90],
//             colors = ['#98ee00', '#d4ee00', '#eecc00', '#ee9c00', '#ea822c', '#ea2c2c'];

//         // loop through depth intervals and generate a label with a color for each range
//         for (let i = 0; i < depthRanges.length; i++) {
//             div.innerHTML +=
//                 '<i style="background:' + colors[i] + '"></i> ' +
//                 depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
//         }
//         return div;
//     };

//     // Adding the legend to the map
//     legend.addTo(myMap);
// }
// // Define marker size based on magnitude
// function markerSize(magnitude) {
//     return magnitude * 5; // Adjust scale as necessary
// }

// // Define marker color based on earthquake depth
// function markerColor(depth) {
//     return depth > 90 ? '#ea2c2c' :
//            depth > 70 ? '#ea822c' :
//            depth > 50 ? '#ee9c00' :
//            depth > 30 ? '#eecc00' :
//            depth > 10 ? '#d4ee00' :
//                         '#98ee00';
// }
// Store our API endpoints as queryUrl and plateUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(earthquakeData) {
    d3.json(plateUrl).then(function(plateData) {
        console.log(earthquakeData);
        console.log(plateData);
        createFeatures(earthquakeData.features, plateData.features);
    });
});

// Create markers whose size increases with magnitude and color with depth
function createMarker(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 1
    });
}

function createFeatures(earthquakeData, plateData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`
            <h3>Location: ${feature.properties.place}</h3>
            <h3>Magnitude: ${feature.properties.mag}</h3>
            <h3>Depth: ${feature.geometry.coordinates[2]}</h3>
        `);
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    });

    let plates = L.geoJSON(plateData, {
        style: function() {
            return { color: "orange", weight: 2.5 };
        }
    });

    createMap(earthquakes, plates);
}

function createMap(earthquakes, plates) {
    // Create the base layers
    let darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
    });

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Satellite layer using ESRI
    let satellite = L.tileLayer('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> | Source: Esri, USGS, NOAA',
        subdomains: ['server', 'services']
    });

    // Base maps object
    let baseMaps = {
        "Grayscale": darkMap,
        "Outdoor": street,
        "Topographic": topo,
        "Satellite": satellite
    };

    // Overlay maps
    let overlayMaps = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": plates
    };

    // Create the map
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [satellite, earthquakes, plates] // Default: Satellite
    });

    // Add layer control
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

    // Add a legend
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend'),
            depthRanges = [-10, 10, 30, 50, 70, 90],
            colors = ['#98ee00', '#d4ee00', '#eecc00', '#ee9c00', '#ea822c', '#ea2c2c'];

        // Generate a label with a color for each range
        for (let i = 0; i < depthRanges.length; i++) {
            div.innerHTML +=
                `<i style="background:${colors[i]}"></i> ${depthRanges[i]}${depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+'}`;
        }
        return div;
    };

    legend.addTo(myMap);
}

// Define marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 5; // Adjust as needed
}

// Define marker color based on earthquake depth
function markerColor(depth) {
    return depth > 90 ? '#ea2c2c' :
           depth > 70 ? '#ea822c' :
           depth > 50 ? '#ee9c00' :
           depth > 30 ? '#eecc00' :
           depth > 10 ? '#d4ee00' :
                        '#98ee00';
}
