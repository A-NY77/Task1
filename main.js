// Initialize the map
var map = L.map('map').setView([0.5, 37], 6); // Center Kenya

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define locations
var locations = [
    { name: "Samburu", coords: [0.6693, 37.0055] },
    { name: "Vanga", coords: [-4.6561, 39.1807] },
    { name: "Mandera", coords: [3.9407, 41.8670] }
];

// Add markers and popups
var markers = [];
locations.forEach(function (location) {
    var marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(location.name);
    markers.push(marker);
});

// Add a line connecting the locations
var latlngs = locations.map(function (location) {
    return location.coords;
});
var travelPath = L.polyline(latlngs, { color: 'blue' }).addTo(map);

// Fit map to bounds of the travel path
map.fitBounds(travelPath.getBounds());

// Add a legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h4>Legend</h4>';
    div.innerHTML += '<p><span style="color:blue">&#x25A0;</span> Travel Path</p>';
    div.innerHTML += '<p>&#x1f4cd; Markers: Samburu, Vanga, Mandera</p>';
    return div;
};

legend.addTo(map);

