//API de raios e Trovões
function grabApi(url, mapLayer, func) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {            
            
            mapLayer.clearLayers();
            func(data, mapLayer);                

        } else {
            console.log('error');
        }
    }
}

function addMrks(data, mapLayer) {
    
    data['lightnings'].forEach(singleLightning => {
        var y = singleLightning.latitude;
        var x = singleLightning.longitude;        
        singleLightning = L.marker([y, x], marker15);
        mapLayer.addLayer(singleLightning).addTo(mymap);
    });
}

// Precisa ser convertido em REACT. Solução temporaria com createElement
function addShp(data, mapLayer){ 
    struck = L.geoJSON(data, {style: highlightPolys, onEachFeature: cityname});
    mapLayer.addLayer(struck).addTo(mymap);
}
function MultipleShp(data, mapLayer){ 
    data['levels'].forEach(singleLevel => {
        geojson = singleLevel['cities']
        struck = L.geoJSON(JSON.parse(geojson), {style: highlightPolys, onEachFeature: cityname});
        mapLayer.addLayer(struck).addTo(mymap);        
        StyleUpdate(radar_level.value);  
    });   
}

function addImg(data, mapLayer){
    var bbox = data['imagebox']
    var x = [[bbox.south, bbox.west], [bbox.north, bbox.east]];

    data['properties']['levels'].forEach(singleLevel => {
        var radarImage = singleLevel['image'];  
        rain = L.imageOverlay('data:image/png;base64,'+radarImage, x, rainStyle);
        mapLayer.addLayer(rain).addTo(mymap);
    });     
            
    StyleUpdate(radar_level.value);  
}


// API de Poligonos de cidades (poligonos) destacadas
function cityname(feature, layer) {
    layer.bindPopup(feature.properties.NM_MUNICIP);
}

