var mymap = L.map('mapcanvas2', { zoomControl:true , scrollWheelZoom:false, dragging:false}).setView([-23.608576, -57.793437], 6);


/* CUADRO DE INFORMACION PERSONALIZADO */
/* El cuadro aparece en la esquina superior derecha */
/* source:http://leafletjs.com/examples/choropleth.html*/

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
     this._div.innerHTML =  '<h4>'+ "Mapa"+'</h4>' + 'Posicionate sobre un asentamiento para ver los datos';
    return this._div;
};

/* Busca en un array de objetos el valor deseado*/

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}




// method that we will use to update the control based on feature properties passed
info.update = function (props) {
   if(props){
    str = props.NAME_2.toLowerCase();     
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[èéêë]/g,"e");
    str = str.replace(/[íìîïí]/g,"i");
    str = str.replace(/[òóôö]/g,"o");
    str = str.replace(/[ùúûü]/g,"u");

  
    

    if (str == 'fernando de la mora') {
        str = 'fdo de la mora';

    }

    console.log(str);
    

    datos_asentamiento = getObjects(asentamientos, 'ciudad',str)[0];


   
 

if (!datos_asentamiento){
this._div.innerHTML =   (props ?
        '<h4>'+ props.NAME_2+'</h4>' +    '<b>Ciudad no relevada</b><br />' + ''+ ''
        : '<h4>'+ "Mapa"+'</h4>' + 'Posisionate sobre un departamento');

        
    }
else {

    this._div.innerHTML =   (props ?
        '<h4>'+ props.NAME_2+'</h4>' +    '<span class="numero-grande">' + datos_asentamiento.total + '</span> Asentamientos</br> <span class="numero-grande">' +  datos_asentamiento.familias + '</span> Familias </br>'  
        : '<h4>'+ "Mapa"+'</h4>' + 'Posisionate sobre un departamento');

}

    } // end if props


   

};




// FUNCION PARA ACCION EN ON HOVER


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });


// Para traer el poligono al frente
  /*  if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }*/
    //console.log(layer.feature.properties);
    info.update(layer.feature.properties);  //controla la info de la caja

}
// FUNCION PARA RESETEAR ESTILO LUEGO DEL ON HOVER
function resetHighlight(e) {
    var layer = e.target;
    //geojson.resetStyle(e.target);
     layer.setStyle({
        weight: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 1
    });

    info.update(); //controla la info de la caja
}


// Al hacer click hago zoom al la capa
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function goToMap (e){
    var layer = e.target;
    if(layer.feature.properties.NAME_2){
        //alert(layer.feature.properties.NAME_2);
        window.location.href = 'http://'+dominio+'/mapa/#ciudad-'+ layer.feature.properties.NAME_2;
     
    }

    
}



// FUNCION PARA LOS EVENT LISTENERS DE CADA CAPA
function onEachFeature(feature, layer) {
        layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: goToMap
    });
}


function getColor(d) {

     str = d.toLowerCase();     
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[èéêë]/g,"e");
    str = str.replace(/[íìîïí]/g,"i");
    str = str.replace(/[òóôö]/g,"o");
    str = str.replace(/[ùúûü]/g,"u");

  
    

    if (str == 'fernando de la mora') {
        str = 'fdo de la mora';

    }
    console.log(str);

    datos_asentamiento = getObjects(asentamientos, 'ciudad',str)[0];
    console.log(datos_asentamiento);
    if (datos_asentamiento){
        console.log("hay" + datos_asentamiento.ciudad);
        return '#DD4395'; // Color de las ciudades marcadas
    }
else{
    return d == "Asunción" ? '#ED7A0D' :
           d == "Central"  ? 'White' :
         
                      'transparent'; //default
    }
}


function style(feature) {
    return {
        fillColor: 'transparent',
        weight: 0.2,
        opacity: 1,
        color: '#888',
       // dashArray: '3',
        fillOpacity: 1
    };
}

function styleCiudad(feature) {
    return {
        fillColor: getColor(feature.properties.NAME_2),
        weight: 1,
        opacity: 1,
        color: 'white',
       // dashArray: '3',
        fillOpacity: 1
    };
}



//Traigo el json de PY
$.getJSON( "/static/py.json", function( data ) {  
        console.log(data.features);
        var EstiloDepartamento = {
            "color": "white",
            "weight": 1,
           // "opacity": 0.65
            fillColor: 'transparent',
        };

        geojson = L.geoJson(data,{
            style: EstiloDepartamento ,
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
             style: styleCiudad ,
              onEachFeature: onEachFeature,
           }).addTo(mymap);   
           poligonos = L.geoJson(returnedData);

           mymap.fitBounds(poligonos.getBounds()); 

           console.log(asentamientos);  



        })




});/* fin de getJSON*/






