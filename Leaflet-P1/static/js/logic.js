// Store our API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(earthquakeData) {
    // Send data.features object to the createFeatures functionconsole.log(earthquakeData);
    console.log(earthquakeData);
    createFeatures(earthquakeData.features);
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

function createFeatures(earthquakeData) {
    // Define function to run for each feature in the features array.
    // Give each feature a popup that describes the time and place of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(
            `<h3>Location:</h3> ${feature.properties.place}
             <h3>Magnitude:</h3> ${feature.properties.mag}
             <h3>Depth:</h3> ${feature.geometry.coordinates[2]}`
        );
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    });

    // Send earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {
    // Create the base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Define baseMaps and overlayMaps for the control
    let baseMaps = {
        "Street Map": street
    };

    let overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create map
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, earthquakes]
    });

    // Create a control for base and overlay layers
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

     // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend'),
        depthRanges = [-10, 10, 30, 50, 70, 90],
        colors = ['#98ee00', '#d4ee00', '#eecc00', '#ee9c00', '#ea822c', '#ea2c2c'];

    // loop through depth intervals and generate a label with a color for each range
    for (let i = 0; i < depthRanges.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
    }
    return div;
};

// Adding the legend to the map
legend.addTo(myMap);

};

// Define marker size based on magnitude
function markerSize(magnitude) {
     return magnitude * 5;
}
    
function markerColor(depth) {
    return depth > 90 ? '#ea2c2c' :
           depth > 70 ? '#ea822c' :
           depth > 50 ? '#ee9c00' :
           depth > 30 ? '#eecc00' :
           depth > 10 ? '#d4ee00' :
                        '#98ee00';
}

   