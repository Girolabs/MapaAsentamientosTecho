var calles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '' ,// 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rodrivaldez5.pncm6kio',
    accessToken: 'pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
})

var satelite = L.tileLayer('https://api.mapbox.com/styles/v1/rodrivaldez5/cipa7pkm3001ebrnrp38w08qu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
)


var mymap = L.map('mapcanvas',{ layers: [satelite, calles]}).setView([-25.290800, -57.559465], 13);


var baseMaps = {
    "satelite": satelite,
    "calles": calles
};


L.control.layers( baseMaps,null,{position:'bottomright'}).addTo(mymap);

/* CUADRO DE INFORMACION PERSONALIZADO */
/* source:http://leafletjs.com/examples/choropleth.html*/

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._divFull = L.DomUtil.create('div', 'infoFull');
   // this.update();
    return this._div;
};

/* Funcion para buscar dentro de un array de objetos */
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
            return objects;
        }
    }
    return objects;
}



info.updateFull = function (props) {    
  //  console.log("estoy en update")
    //console.log(props.id);
   // console.log("Datos encuesta");
  //  console.log(datos_encuesta[1]);
  console.log("UPDATEFULL")
  if (props) {
    console.log(props);
    
      info_asentamiento = getObjects(datos_encuesta,'identificador',String(props.id));
    console.log(info_asentamiento[0]);

    this._div.innerHTML =   '<h4> '+  props.nombre +'</h4>' +    

    '<b>Cantidad de Familias</b><p>'     + info_asentamiento[0].numero_familias + '</p>' +
     '<b>Cantidad aprox. de viviendas</b><p>'     + info_asentamiento[0].numero_aprox_viviendas + '</p>' +
     '<b><i class="fa fa-tint" aria-hidden="true"style="font-size: 35px;"></i>Tipo de provision de Agua </b><p>'     + info_asentamiento[0].agua_tipo_provision + '</p> '  +

    '<b><i class="fa fa-bolt" aria-hidden="true" style="font-size: 35px;"></i>Conexion Electrica</b><p>'     + info_asentamiento[0].energia_tipo_provision + ' </p>' 


    


    ;
        


  }
  else{

     this._div.innerHTML =  '<h4>'+ "Mapa"+'</h4>' + 'Posicionate sobre un departamento';



  };
  

   
};






// FUNCION PARA ACCION EN ON HOVER3


function highlightFeature(e) {


    var layer = e.target;

    layer.setStyle({
        /*weight: 2,
        color: '#666',*/
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
 //   console.log(layer.feature.properties);
   info.updateFull(layer.feature.properties);  //controla la info de la caja

}


function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// FUNCION PARA ACCION EN ON HOVER3


function highlightFeatureFull(e) {


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
   info.updateFull(layer.feature.properties);  //controla la info de la caja
   zoomToFeature(e);




}



// FUNCION PARA RESETEAR ESTILO LUEGO DEL ON HOVER
function resetHighlight(e) {
    console.log("resetHighlight");
    CapaAsentamientos.resetStyle(e.target);
   // info.update(); //controla la info de la caja
}





// FUNCION PARA LOS EVENT LISTENERS DE CADA CAPA
function onEachFeature(feature, layer) {   
    feature.properties.algo = "no";
  //   layer.bindPopup(feature.properties.nombre);    
     layer.on({
        mouseover: highlightFeature,
       mouseout: resetHighlight,
        click: highlightFeatureFull 
    });
  //    layer.bindPopup(feature.properties.nombre);       
}


/* Estilos de los poligonos */

function style(feature) {
    return {
        fillColor: "#DD4395",
        weight: 2,
        opacity: 1,
        color: '#DD4395',
       // dashArray: '3',
        fillOpacity: 0.8
    };
}

/* Traigo los datos de la encuesta*/

var datos_encuesta;

$.getJSON( "http://localhost:8000/asentamiento/", function( encuesta ) { 
  datos_encuesta = encuesta;
  console.log(encuesta);


/* Traigo los poligonos */

$.getJSON( "/static/js/pais.json", function( data ) {

  console.log("geojson");
  console.log(data);

  asentamientos = data;

  /* Si tiene Hash */



    hash = window.location.hash.substr(1);

    if (hash) {

      //  console.log(asentamientos.features);
      jjj =  jQuery.map(asentamientos.features, function(obj ) {
                                              //console.log(obj.properties.id_central + "-" + hash)
                                                  if(obj.properties.id == hash)
                                                //    console.log (obj);
                                                     return obj; // or return obj.name, whatever.
                                                  });
                  //console.log(datoAsentamiento);
      targetAsentamiento = jjj[0];
      console.log(jjj)
      xxx = L.geoJson(targetAsentamiento);
      console.log(xxx);

      mymap.fitBounds(xxx.getBounds());
    //  info.updateFull(targetAsentamiento.properties);

                //  console.log(datoAsentamiento);
   // alert(hash);
}


  CapaAsentamientos = L.geoJson(data,{
            style: style ,
            onEachFeature: onEachFeature,
           
            }).addTo(mymap);

  var fuse = new Fuse(data.features, {
        keys: ['properties.nombre', ]
    });




    /* Search un MultiLayers */

   

    var poiLayers = L.layerGroup([
        L.geoJson(data,{ 
            style: style ,
            onEachFeature: onEachFeature,
           
            }),
     
    ])
   


/* Configuration of Search box*/
  new L.Control.Search({layer: CapaAsentamientos,
    autoType: true,
    propertyName: 'nombre', // nombre de la propiedad a buscar
    filterData: function(text, records) { // filtro fuzzy
            var jsons = fuse.search(text),
                ret = {}, key;
            
            for(var i in jsons) {
                key = jsons[i].properties.nombre;
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
            console.log(val.layer.feature.properties);
            var type = val.layer.feature.properties.nombre_distrito;
            return '<a href="#" class="'+type+'">'+text+' - <b>'+type+'</b></a>';
        }


  }).addTo(mymap);
/* Fin de Search */

      info.addTo(mymap);
      console.log(targetAsentamiento.properties);
       info.updateFull(targetAsentamiento.properties);
      


});

})

/* Fin de Get de Asentamientos */


/* SideBar IZquierda */

var sidebar = L.control.sidebar('sidebar', {
   
    position: 'left'
}).addTo(mymap);


/* LIMPIAR TODO EL MAPA */

$('#limpiar').on('click',function(){
  CapaAsentamientos.clearLayers()
})



/* FILTRO CONEXION REGULAR*/ 
function Agua (tipo){
 
 /* var cl = new CanvasLoader('canvasloader-container');
cl.setColor('#649fbf'); // default is '#000000'
cl.setShape('spiral'); // default is 'oval'
cl.setDiameter(142); // default is 40
cl.setDensity(13); // default is 40
cl.setRange(1.1); // default is 1.3
cl.setFPS(13); // default is 24
cl.show(); // Hidden by default*/

Filtrado = CapaAsentamientos.toGeoJSON();
    CapaAsentamientos.clearLayers();
    CapaAsentamientos = L.geoJson(asentamientos,{
            style: style ,
            onEachFeature: onEachFeature,
            filter: function(feature, layer) {                  
                  id_poligono = feature.properties.id;
                  if (id_poligono != null){
                    id_poligono = id_poligono.toString();
                  }
                  else{
                    id_poligono= '';
                  }
                  datoAsentamiento =  jQuery.map(datos_encuesta, function(obj ) {
                                                //console.log(algo)
                                                  if(obj.identificador == id_poligono)
                                                     return obj; // or return obj.name, whatever.
                                                  });
                  //console.log(datoAsentamiento);
                  datoAsentamiento = datoAsentamiento[0];
                  //console.log(datoAsentamiento);
                  if (datoAsentamiento) {             

                      if (datoAsentamiento.agua_tipo_provision == tipo ){
                          return true;
                      }else {
                          return false;
                      }

                  }
                  return false;
          }            
            }).addTo(mymap);
/*cl.hide();*/


};


$( "#sel1" ).change(function() {


  ciudad_selecionada =  $('#sel1 option:selected').text();


  if (ciudad_selecionada!=''){
 Filtrado = CapaAsentamientos.toGeoJSON();
  CapaAsentamientos.clearLayers();
  CapaAsentamientos = L.geoJson(asentamientos,{
            style: style ,
            onEachFeature: onEachFeature,

    filter: function(feature, layer) {


          
         

          if (feature.properties.nombre_distrito == ciudad_selecionada){
              return true;
          }else {
              return false;
          }

          
         
  } 



           
            }).addTo(mymap);

  }

});



$( ".agua" ).click(function(){
  //alert(this.value);
  if (this.value == 'regular') {
    console.log(this.value)
        Agua("conexión regular");

  }else{
     console.log(this.value)
    Agua("conexion irregular");
  }

 
})

$( ".energia" ).click(function(){
  alert(this.value);
})


$( document ).ready(function() {





   
});
