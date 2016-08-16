var calles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Desarrollado por  <a href="http://girolabs.com/">Girolabs</a>' ,// 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rodrivaldez5.pncm6kio',
    accessToken: 'pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
})

var satelite = L.tileLayer('https://api.mapbox.com/styles/v1/rodrivaldez5/cipa7pkm3001ebrnrp38w08qu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9kcml2YWxkZXo1IiwiYSI6ImNpbjZpcnJkNzAwajB0bWtzMzRsZm1oMHMifQ._pV5bBqoRbMk9fgFKQNHYQ'
)


var mymap = L.map('mapcanvas',{ layers: [ calles]}).setView([-25.290800, -57.559465], 11);


var baseMaps = {
    "Satelite": satelite,
    "Mapa": calles
};

  LayerIntervenido = new L.LayerGroup();
    LayerIntervenido.addTo(mymap);

    var overlayMaps = {
    "Asentamientos Internvenidos por techo": LayerIntervenido
};




L.control.layers( baseMaps,overlayMaps,{position:'bottomleft'}).addTo(mymap);

/* CUADRO DE INFORMACION PERSONALIZADO */
/* source:http://leafletjs.com/examples/choropleth.html*/

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this._divFull = L.DomUtil.create('div', 'infoFull');
   // this.update();
 //   this._div.innerHTML =  '<h4>'+ "Mapa"+'</h4>' + 'Posicionate sobre un asentamiento para ver los datos';


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


function cerrarInfo(){
  $(".cerrar-info").click(function(event){

  event.preventDefault();
 
$(".leaflet-control.info").css("display", "none");

})


}




info.updateFull = function (props) {    
  //  console.log("estoy en update")
    //console.log(props.id);
   // console.log("Datos encuesta");
  //  console.log(datos_encuesta[1]);
  console.log("UPDATEFULL");

  $(".leaflet-control.info").css("display", "none");
  $(".leaflet-control.info").css("display", "block");

    $(".leaflet-control.info").removeClass("animated fadeInRight")
  $(".leaflet-control.info").addClass("animated fadeInRight")

  
  
  

  if (props) {
    console.log(props);

    var centro = L.polygon(props.geometry.coordinates[0]).getBounds().getCenter();
    
    info_asentamiento = getObjects(datos_encuesta,'identificador',String(props.properties.id));
    console.log(info_asentamiento[0]);

    this._div.innerHTML = 

    '<div class="col-md-12 animated fadeInRight"><div class="row"><a ><i class="fa fa-times cerrar-info" aria-hidden="true"></i></a> '  +
    '<h4> '+  props.properties.nombre + '</h4>' + 
    '<h5> '+  info_asentamiento[0].ciudad + '<a class="btn  btn-raised btn-primary btn-sm" style="float: ;    background: #85B9D3;" target="_blank" href="https://www.google.com.py/maps/dir//'+centro.lng+','+centro.lat+'/"> Cómo llegar</a></h5>' + ''+
    '<div class="col-md-6"><div> <b><i class="flaticon-tiles info-icon"></i> Superficie</b><p>'     + info_asentamiento[0].superficie + ' metros <sup>2</sup></p></div></div>' +   
    '<div class="col-md-6"><div><b><i class="flaticon-user-black-close-up-shape info-icon"></i> Poblador mas antiguo</b><p>'     + info_asentamiento[0].poblador_mas_antiguo + '</p></div></div>' +  
        '<div class="col-md-6"><div><b><i class="flaticon-multiple-users-silhouette info-icon"></i>Cantidad de Familias</b><p>'     + info_asentamiento[0].numero_familias + '</p></div></div>' +
     '<div class="col-md-6"><div><b><i class="flaticon-neighborhood info-icon "></i>Cantidad aprox. de viviendas</b><p>'     + info_asentamiento[0].numero_aprox_viviendas + '</p></div></div>' +
    

     '<div class="col-md-6"><div><b><i class="fa fa-tint info-icon" aria-hidden="true"></i>Provisión de Agua </b><p>'     + info_asentamiento[0].agua_tipo_provision + '</p> </div></div>'  +

    '<div class="col-md-6"><div><b><i class="fa fa-bolt info-icon" aria-hidden="true" ></i>Conexion Electrica</b><p>'     + info_asentamiento[0].energia_tipo_provision + ' </p></div></div>' +
    '<div class="col-md-6"><div><b><i class="flaticon-bathroom info-icon" aria-hidden="true" ></i>Tipo de Desague</b><p>'     + info_asentamiento[0].excretas + ' </p></div></div>' +
    '<div class="col-md-6"><div><b><i class="flaticon-lamp-post info-icon" aria-hidden="true"></i>Alumbrado Publico</b><p>'     + info_asentamiento[0].alumbrado_publico + ' <br>' +  info_asentamiento[0].alumbrado_publico_otro+ ' </p></div></div>' +
   /* '<div class="col-md-6"><b><i class="flaticon-signs info-icon" aria-hidden="true" ></i>Combustible para cocinar</b><p>'     + info_asentamiento[0].cocina_metodo + ' <br>' +info_asentamiento[0].cocina_metodo_otro + ' </p></div>' +
    '<div class="col-md-6"><b><i class="flaticon-garbage info-icon" aria-hidden="true"></i>Recolección de basura</b><p>'     + info_asentamiento[0].problema_eliminacion_basura + '<br> ' +info_asentamiento[0].eliminacion_basura_tipo + ' </p></div>' +*/
    '<div class="col-md-6"><div><b><i class="flaticon-people info-icon" aria-hidden="true" ></i>Comisión Vecinal</b><p>'     + info_asentamiento[0].comision_vecinal + ' </p></div></div>' +
    '<div class="col-md-6 text-center"><div><b><img src="/static/img/favicon.png"><br>Asentamiento Int. por TECHO?</b><p>'     + info_asentamiento[0].asentamiento_intervenido_techo + ' </p></div> </div></div></div>'


    


    ;
        


  }
  else{

     this._div.innerHTML =  '<h4>'+ "Mapa"+'</h4>' + 'Posicionate sobre un asentamiento para ver los datos';



  };

  cerrarInfo();
  

   
};






// FUNCION PARA ACCION EN ON HOVER3
function highlightFeature(e) {

    var layer = e.target;
    layer.openPopup();


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
   info.updateFull(layer.feature);  //controla la info de la caja

}






//Hacer zoom hasta donde esta el poligono
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
   
}

// FUNCION PARA ACCION EN ON HOVER3
function highlightFeatureFull(e) {
    var layer = e.target;
    //layer.closePopup();
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
   info.updateFull(layer.feature);  //controla la info de la caja
   zoomToFeature(e);
}





// FUNCION PARA RESETEAR ESTILO LUEGO DEL ON HOVER
function resetHighlight(e) {
  //  console.log("resetHighlight");
    CapaAsentamientos.resetStyle(e.target);
     var layer = e.target;
    //layer.closePopup();
   // info.update(); //controla la info de la caja
}



var greenIcon = L.icon({
    iconUrl: '/static/img/favicon.png',
  
});





// FUNCION PARA LOS EVENT LISTENERS DE CADA CAPA
function onEachFeature(feature, layer) {   
    feature.properties.algo = "no";

    info_asentamiento = getObjects(datos_encuesta,'identificador',String(feature.properties.id));
    if(info_asentamiento[0]){
          if (info_asentamiento[0].asentamiento_intervenido_techo != "no"){

              //  console.log(layer.getBounds().getCenter());

               asentamiento_intervenido =  L.marker(layer.getBounds().getCenter(),{}).on('click', function(e){mymap.setView([e.latlng.lat, e.latlng.lng], 20);})
                LayerIntervenido.addLayer(asentamiento_intervenido);

                
          }
      }


  //   layer.bindPopup(feature.properties.nombre);    
     layer.on({
      // mouseover: highlightFeature,
      
       mouseout: resetHighlight,
        click: highlightFeature,
        dblclick: highlightFeatureFull 
    });
     //layer.bindPopup(feature.properties.nombre);       
}


/* Estilos de los poligonos */

function style(feature) {
  info_asentamiento = getObjects(datos_encuesta,'identificador',String(feature.properties.id));

  //console.log(info_asentamiento[0]);


if(info_asentamiento[0]){


  if (info_asentamiento[0].asentamiento_intervenido_techo != "no"){
    return    {
        fillColor: "#DA4A28",
        weight: 2,
        opacity: 1,
        color: '#DA4A28',
       // dashArray: '3',
        fillOpacity: 0.8
    };
  }

  }
    return {
        fillColor: "#DD4395",
        weight: 2,
        opacity: 1,
        color: '#DD4395',
       // dashArray: '3',
        fillOpacity: 0.8
    };
}

function styleCiudades(feature) {
    return {
        fillColor: "transparent",
        weight: 1,
        opacity: 1,
        color: '#A29E9A',
       // dashArray: '3',
        fillOpacity: 0.8
    };
}

/* Traigo los datos de la encuesta*/



controlLoader = L.control.loader().addTo(mymap);


controlLoader.show();





/* Traigo los poligonos */



$.getJSON( "/static/py_ciudad.json", function( data ) {  

    ciudades = data;
    ciudadesAsuncion = $.grep(ciudades.features, function (element, index) {
                    return element.properties.NAME_1 == 'Central';
                });
    CapaCiudades = L.geoJson(ciudadesAsuncion,{
            style: styleCiudades ,
           // onEachFeature: onEachFeature,
           
            }).addTo(mymap); //Agrego limites de los municipios

  

    $.getJSON( "/static/js/pais.json", function( data ) {

     // console.log("geojson");
      //console.log(data);
      asentamientos = data;        


      /* Traigo los datos del RAP*/
      $.getJSON(dominio+"/asentamiento/", function( encuesta ) { 
          controlLoader.hide(); /* Saco el loader*/
          datos_encuesta = encuesta;
          CapaAsentamientos = L.geoJson(data,{
                    style: style ,
                    onEachFeature: onEachFeature,
                   
                    }).addTo(mymap);//.addTo(mymap);      
          CapaAsentamientosBase = CapaAsentamientos;
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
                    console.log(latlng.layer.feature.properties);
                    
                    info.updateFull(latlng.layer.feature)
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

          /* Deshabilito funcion de scroll para que el cuadro de info */
          var container = document.getElementsByClassName("info")[0];
          L.DomEvent.disableClickPropagation(container)
          L.DomEvent.disableScrollPropagation(container);
          $(".leaflet-control.info").css("display", "none");

                /* Si tiene Hash */
      hash = window.location.hash.substr(1);
      if (hash) {

          console.log(hash.split("-")[0]);
          if (hash.split("-")[0]== "ciudad"){ // si estoy buscando una ciudad especifica

          console.log(hash.split("-")[0])
          console.log(ciudadesAsuncion);
          var returnedData = $.grep(ciudadesAsuncion, function (element, index) {
                                   return element.properties.NAME_2.toLowerCase() == hash.split("-")[1].toLowerCase();
                    });

          ciudadFocus =  L.geoJson(returnedData);
          console.log(returnedData);
          mymap.fitBounds(ciudadFocus.getBounds());               

          }
          else if (hash.split("-")[0]== "asentamiento"){ // si estoy buscando un asentamiento espeficifo
             //  console.log(asentamientos.features);
          jjj =  jQuery.map(asentamientos.features, function(obj ) {
                                                  //console.log(obj.properties.id_central + "-" + hash)
                                                      if(obj.properties.id == hash.split("-")[1])
                                                    //    console.log (obj);
                                                         return obj; // or return obj.name, whatever.
                                                      });
                      //console.log(datoAsentamiento);
          targetAsentamiento = jjj[0];
          console.log(jjj)

          asentamientoFocus = L.geoJson(targetAsentamiento);  
          info.updateFull(targetAsentamiento); 

          mymap.fitBounds(asentamientoFocus.getBounds());
          }  // fin elseif      
        
      } /* Fin del HASH*/

       
              


        }); /* Fin Get RAP*/

    })/* fIN Get CIUDADES*/

}) /* Fin de Get POLIGONOS RAP*/


var techeroIcon = L.icon({
    iconUrl: '/static/images/marker-icon.png',
    shadowUrl: '/static/images/marker-shadow.png',

   // iconSize:     [38, 95], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});




/* DONDE ESTOY */


mymap.locate();

function onLocationFound(e) {
    var radius =  e.accuracy / 2  ;

   radiusStyle = {
   
    fillColor: "rgba(0, 146, 221, 0.4)",
    color: "rgba(0, 146, 221, 0.95)",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

    L.marker(e.latlng, {icon: techeroIcon}).addTo(mymap)
        .bindPopup("Estas en radio de " + radius + " metros de este lugar");

    L.circle(e.latlng, radius, radiusStyle).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert('No hemos podido encontrar tu ubicación :(');
}

mymap.on('locationerror', onLocationError);

/* FIN DONDE ESTOY */





/* SideBar IZquierda */

var sidebar = L.control.sidebar('sidebar', {   
    position: 'left'
}).addTo(mymap);




/* LIMPIAR TODO EL MAPA */
$('#limpiar').on('click',function(){
  CapaAsentamientos.clearLayers()
  LayerIntervenido.clearLayers()
})



/* FILTRO CONEXION REGULAR*/ 
function Agua (){
   
    tipo = $('input[name=agua]:checked').val()
    console.log(tipo);
    if (tipo){
    Filtrado = CapaAsentamientos.toGeoJSON();
    CapaAsentamientos.clearLayers();
     LayerIntervenido.clearLayers()

    CapaAsentamientos = L.geoJson(Filtrado,{
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
}else{
  console.log("agua no marcado")
}
};


function Energia(){ 

  tipo = $('input[name=energia]:checked').val();
  console.log(tipo);
   if (tipo){
    Filtrado = CapaAsentamientos.toGeoJSON();
    CapaAsentamientos.clearLayers();
     LayerIntervenido.clearLayers()

    CapaAsentamientos = L.geoJson(Filtrado,{
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

                      if (datoAsentamiento.energia_tipo_provision.toLowerCase() == tipo.toLowerCase()  ){
                          return true;
                      }else {
                          return false;
                      }

                  }
                  return false;
          }            
            }).addTo(mymap);
}else{console.log("energia no marcada")}
}


function FiltroCiudad() {

  ciudad_selecionada =  $('#sel1 option:selected').text();
  console.log(ciudad_selecionada);
  if (ciudad_selecionada!=''){
        console.log("Tiene filtro de ciudad")
        console.log(CapaCiudades);       
        CapaAsentamientos.clearLayers();
         LayerIntervenido.clearLayers()
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
  else{
      console.log("Sin filtro Ciudades")
      CapaAsentamientos.clearLayers();
       LayerIntervenido.clearLayers()
      CapaAsentamientos = L.geoJson(asentamientos,{
                              style: style ,
                              onEachFeature: onEachFeature,
                          }).addTo(mymap);
      }//END ELSE

}// END FILTRO CIUDAD


function FiltroTecho(){ 

  tipo = $('input[name=techo]:checked').val();

   if (tipo){
    Filtrado = CapaAsentamientos.toGeoJSON();
    CapaAsentamientos.clearLayers();
     LayerIntervenido.clearLayers()
    CapaAsentamientos = L.geoJson(Filtrado,{
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

                  if (tipo == 'si') {
                      if (datoAsentamiento.asentamiento_intervenido_techo != tipo  ){
                                                return true;
                                            }
                      }else if (tipo == 'no')  {
                                return false;
                            }        

                      

                  }
                  return false;
          }            
            }).addTo(mymap);
}else{console.log("energia no marcada")}
}




/* lISTENERS DE EVENTOS */

$( "#sel1" ).change(function(){
   FiltroCiudad();   
  Agua();
   Energia();
    FiltroTecho();
});

$( ".agua" ).click(function(){
  //alert(this.value);
    FiltroCiudad();   
    Agua();
    Energia();
     FiltroTecho();
})

$( ".energia" ).click(function(){
//alert(this.value);
 FiltroCiudad();
 Agua(); 
 Energia();
  FiltroTecho();
})
/*

$( ".techo" ).click(function(){
//alert(this.value);

 FiltroCiudad();
 Agua(); 
 Energia();
 FiltroTecho();
})
*/






  
