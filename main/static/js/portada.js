var mymap = L.map('mapcanvas2', { zoomControl:true , scrollWheelZoom:false, dragging:false}).setView([-23.608576, -57.793437], 6);


/* CUADRO DE INFORMACION PERSONALIZADO */
/* El cuadro aparece en la esquina superior derecha */
/* source:http://leafletjs.com/examples/choropleth.html*/

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
      
    this._div.innerHTML =   (props ?
        '<h4>'+ props.NAME_2+'</h4>' +    '<b>Cantidad de Asentamiento</b><br />' + props.NAME_1 + ' personas'
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
        layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
     // click: zoomToFeature
    });
}


function getColor(d) {
    return d == "Asunción" ? 'white' :
           d == "Central"  ? 'White' :
         
                      'transparent'; //default
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



//Traigo el json de PY
$.getJSON( "/static/py.json", function( data ) {  
        console.log(data.features);
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
            },
            filter: function(feature, layer) {
                return feature.properties.NAME_1 != "Central";
            }
            })
          .addTo(mymap);

        info.addTo(mymap);
        

     $.getJSON ( "/static/py_ciudad.json", function( data ) { 


           var returnedData = $.grep(data.features, function (element, index) {
                    return element.properties.NAME_1 == 'Central';
                });

           L.geoJson(returnedData,{
             style: style ,
              onEachFeature: onEachFeature,
           }).addTo(mymap);   
           poligonos = L.geoJson(returnedData);

           mymap.fitBounds(poligonos.getBounds());   



        })




});/* fin de getJSON*/






