var mymap = L.map('mapcanvas2', { zoomControl:false , scrollWheelZoom:false, dragging:false}).setView([-23.608576, -57.793437], 6);


/* CUADRO DE INFORMACION PERSONALIZADO */
/* source:http://leafletjs.com/examples/choropleth.html*/

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    console.log("estoy eb update")
    console.log(props);
    this._div.innerHTML =   (props ?
        '<h4>'+ props.NAME_1+'</h4>' +    '<b>Cantidad de Asentamiento</b><br />' + props.NAME_1 + ' personas'
        : '<h4>'+ "Mapa"+'</h4>' + 'Posisionate sobre un departamento');
};




// FUNCION PARA ACCION EN ON HOVER


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    //console.log(layer.feature.properties);
    info.update(layer.feature.properties);  //controla la info de la caja

}
// FUNCION PARA RESETEAR ESTILO LUEGO DEL ON HOVER
function resetHighlight(e) {
    geojson.resetStyle(e.target);

    info.update(); //controla la info de la caja
}


// Al hacer click hago zoom al la capa
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}



// FUNCION PARA LOS EVENT LISTENERS DE CADA CAPA
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.NAME_1=="Central" || feature.properties.NAME_1=="Asunción" ) {
      

      /*  layer.on('click', function() {  
                                        $(".estadisticas").html(feature.properties.NAME_1);
                                        console.log("hola")

                                        });*/
    }
     layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
     //]   click: zoomToFeature
    });
}


function getColor(d) {
    return d == "Asunción" ? 'white' :
           d == "Central"  ? 'White' :
         
                      'transparent';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.NAME_1),
        weight: 2,
        opacity: 1,
        color: '#888',
       // dashArray: '3',
        fillOpacity: 1
    };
}



//Traigo el json
$.getJSON( "/static/py.json", function( data ) {
          console.log(data);

          var myStyle = {
            "color": "white",
            "weight": 1,
            "opacity": 0.65
            };

        geojson = L.geoJson(data,{
            style: style ,
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        }
            })
          .addTo(mymap);

        info.addTo(mymap);


});/* fin de getJSON*/


