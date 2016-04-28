var mymap = L.map('mapcanvas').setView([-25.290800, -57.559465], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rodrivaldez5.pncm6kio',
    accessToken: 'pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
}).addTo(mymap);


L.marker([-25.295936, -57.609821]).addTo(mymap)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


var marker = L.marker([-25.298526, -57.602194]).addTo(mymap);



var circle = L.circle([-25.296772, -57.591099], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap);


var polygon = L.polygon([
    [-25.295936, -57.609821],
    [-25.298526, -57.602194],
    [-25.296772, -57.591099]
]).addTo(mymap);


$.getJSON( "/static/js/luque.json", function( data ) {
  console.log(data);

  L.geoJson(data).addTo(mymap);
});