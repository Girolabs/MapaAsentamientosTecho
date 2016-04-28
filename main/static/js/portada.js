var mymap = L.map('mapcanvas2', { zoomControl:false , scrollWheelZoom:false}).setView([-23.608576, -57.793437], 6);


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.NAME_1) {
        layer.bindPopup(feature.properties.NAME_1);
      /*  layer.bindPopup(feature.properties.NAME_1, {closeButton: false, offset: L.point(0, 0)});
        layer.on('mouseover', function() { layer.openPopup(); });
        layer.on('mouseout', function() { layer.closePopup(); });
        layer.on('click', function() { console.log("hola")});*/
    }
}


$.getJSON( "/static/py.json", function( data ) {
          console.log(data);

          var myStyle = {
            "color": "white",
            "weight": 1,
            "opacity": 0.65
            };

          L.geoJson(data,{
            style:  function(feature) {
                      //  console.log(feature.properties.NAME_1);
                        switch (feature.properties.NAME_1) {
                            case 'Central': return {color: "#575756",fillColor: "white", fillOpacity: 1, "weight": 1,"opacity": 1};
                            case 'Asunción':   return {color: "#575756", fillColor: "white",fillOpacity: 1,"weight": 1,"opacity": 0.65};
                            default: return {color:"#575756", "weight": 1,"opacity": 0.65 };
                        }
                    },
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        }
            })
          .addTo(mymap);


});/* fin de getJSON*/