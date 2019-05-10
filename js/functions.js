
//API de raios e Trovões
function grabApi(url, minipath, layer) {
    var request = new XMLHttpRequest();
    request.open('GET', url + minipath);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            layer.clearLayers();
            if (minipath == '/raios') {
                addMarker(data, layer);
            } else {
                layer.addData(data).addTo(mymap);
            }
        } else {
            console.log('error');
        }
    }
}
function addMarker(data, layer) {
    data.forEach(singleLightning => {
        var y = singleLightning.latitude;
        var x = singleLightning.longitude;
        singleLightning = L.marker([y, x], marker15);
        layer.addLayer(singleLightning).addTo(mymap);
    });
}


// API de Poligonos de cidades (poligonos) destacadas
function cityname(feature, layer) {
    layer.bindPopup(feature.properties.NM_MUNICIP);
}



// API de radares e chuvas
function ChangeRain() {
    nivel = document.getElementById("customRange2").value
    grabRain(url, '/chuva', rainImg, nivel);
}
function grabRain(url, minipath, nivel=1) {
    var request = new XMLHttpRequest();
    request.open('GET', url + minipath);
    request.send('nivel='+nivel);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            mymap.removeLayer(rainImg)
            var x = [[data.south, data.west], [data.north, data.east]];
            rainImg.setUrl(data.url);
            rainImg.setStyle(rainStyle);
            rainImg.setBounds(x).addTo(mymap);
        } else {
            console.log('error');
        }
    }
}


// API de redemet list
function grabRedec(url, minipath) {
    var request = new XMLHttpRequest();
    request.open('GET', url + minipath);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            atingidosList(data);
        }else{
            console.log('error');
        }
    }
}

function atingidosList(data){
    var lista = document.getElementById('redecs');
    data.forEach(redec =>{
        lista.innerHTML = (redec['redec']);
        //console.log(redec['municipios']);
    });
}

function update() {
    grabApi(url, '/sp/whatever', struckShp);
    ChangeRain();
    grabApi(url, '/raios', lighningsMrk);
    grabRedec(url, '/sp/redecs');
}