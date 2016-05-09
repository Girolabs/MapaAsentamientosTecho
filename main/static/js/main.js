var mymap = L.map('mapcanvas').setView([-25.290800, -57.559465], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rodrivaldez5.pncm6kio',
    accessToken: 'pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
}).addTo(mymap);



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
    console.log("estoy en update")
    console.log(props);
    this._div.innerHTML =   (props ?
        '<h4>'+ props.name+'</h4>' +    '<b>Cantidad de Asentamiento</b><br />' + props.name + ' personas'
        : '<h4>'+ "Mapa"+'</h4>' + 'Posicionate sobre un departamento');
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
 //   console.log(layer.feature.properties);
   info.update(layer.feature.properties);  //controla la info de la caja

}
// FUNCION PARA RESETEAR ESTILO LUEGO DEL ON HOVER
function resetHighlight(e) {

    console.log("resetHighlight");
    geojson.resetStyle(e.target);

    info.update(); //controla la info de la caja
}



// FUNCION PARA LOS EVENT LISTENERS DE CADA CAPA
function onEachFeature(feature, layer) {



    layer.on('click', function() {  
    $(".estadisticas").html(feature.properties.NAME_1);
    console.log("hola")});
    console.log("hola");
     layer.bindPopup(feature.properties.name);
    
     layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
     //]   click: zoomToFeature
    });
}


function style(feature) {
    return {
        fillColor: "#0092DD",
        weight: 2,
        opacity: 1,
        color: '#0092DD',
       // dashArray: '3',
        fillOpacity: 0.8
    };
}



$.getJSON( "/static/js/luque.json", function( data ) {
  console.log(data);

  geojson = L.geoJson(data,{
            style: style ,
            onEachFeature: onEachFeature,
           
            }).addTo(mymap);

    var fuse = new Fuse(data.features, {
        keys: ['properties.name', 'properties.cuisine']
    });

    /* Search un MultiLayers */

   

    var poiLayers = L.layerGroup([
        L.geoJson(data,{ 
            style: style ,
            onEachFeature: onEachFeature,
           
            }),
        //L.geoJson(pharmacy, geojsonOpts),
        //L.geoJson(restaurant, geojsonOpts)
    ])
   

    /* Configuration of Search box*/



  new L.Control.Search({layer: geojson,
    autoType: true,
    propertyName: 'name', // nombre de la propiedad a buscar
    filterData: function(text, records) { // filtro fuzzy
            var jsons = fuse.search(text),
                ret = {}, key;
            
            for(var i in jsons) {
                key = jsons[i].properties.name;
                ret[ key ]= records[key];
            }

            console.log(jsons,ret);
            return ret;
        },
    moveToLocation: function(latlng, title, map) { // zoom al punto buscado
            //map.fitBounds( latlng.layer.getBounds() );
            var zoom = map.getBoundsZoom(latlng.layer.getBounds());
            map.setView(latlng, zoom); // access the zoom
        },
    buildTip: function(text, val) { // tag alado del nombre
            var type = val.layer.feature.properties.name;
            return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
        }


  }).addTo(mymap);

      info.addTo(mymap);
});


var sidebar = L.control.sidebar('sidebar', {
   
    position: 'left'
}).addTo(mymap);



