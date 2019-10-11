
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
            atingidosList(data.sort(sortingJsonString('redec'))
            );
        }else{
            console.log('error');
        }
    }
}

function atingidosList(data){ // Precisa ser convertido em REACT. Solução temporaria com createElement
    var lista = document.getElementById('redecs');
    data.forEach(redec =>{
       var newRedec = document.createElement('ul');
        redec['municipios'].sort().forEach(municipio=>{
            var newCity = document.createElement('li');
            newCity.innerHTML = (municipio);
            newRedec.appendChild(newCity);
        });
        lista.appendChild(newRedec);
    });
}

function sortingJsonString(key){ // Função que ordena strings no Json
    return function(obj1, obj2){
        if (obj1[key]==obj2[key])
            return 0
        if (obj1[key]>obj2[key])
            return 1
        if (obj1[key]<obj2[key])
            return -1
    }
}

// Função de Atualização
function update() {
    grabApi(url, '/sp/whatever', struckShp);
    ChangeRain();
    grabApi(url, '/raios', lighningsMrk);
    grabRedec(url, '/sp/redecs');
}