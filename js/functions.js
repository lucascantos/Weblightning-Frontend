//API de raios e Trovões
function grabApi(url, mapLayer, func) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {            
            
            mymap.removeLayer(mapLayer);
            func(data, mapLayer);

        } else {
            console.log('error');
        }
    }
}

function addLightnings(data, mapLayer) {
    data['lightnings'].forEach(singleLightning => {
        var y = singleLightning.latitude;
        var x = singleLightning.longitude;        
        singleLightning = L.marker([y, x], marker15);
        mapLayer.addLayer(singleLightning).addTo(mymap);

    });
}

function addStruck(data, mapLayer){ // Precisa ser convertido em REACT. Solução temporaria com createElement
    mapLayer.addData(data).addTo(mymap);
}

function addRain(data, mapLayer){
    var radarImage = data['properties']['levels'][0]['image']
    var bbox = data['imagebox']
    var x = [[bbox.south, bbox.west], [bbox.north, bbox.east]];
    mapLayer.setUrl('data:image/png;base64,'+radarImage);    
    mapLayer.setStyle(rainStyle);
    mapLayer.setBounds(x).addTo(mymap);
}


// API de Poligonos de cidades (poligonos) destacadas
function cityname(feature, layer) {
    layer.bindPopup(feature.properties.NM_MUNICIP);
}



// // API de radares e chuvas
// function ChangeRain() {
//     nivel = document.getElementById("customRange2").value
//     grabRain(url, '/chuva', rainImg, nivel);
// }
// function grabRain(url, minipath, nivel=1) {
//     var request = new XMLHttpRequest();
//     request.open('GET', url + minipath);
//     request.send('nivel='+nivel);
//     request.onload = function () {
//         var data = JSON.parse(this.response);
//         if (request.status >= 200 && request.status < 400) {
//             mymap.removeLayer(rainImg)
//             var x = [[data.south, data.west], [data.north, data.east]];
//             rainImg.setUrl(data.url);
//             rainImg.setStyle(rainStyle);
//             rainImg.setBounds(x).addTo(mymap);
//         } else {
//             console.log('error');
//         }
//     }
// }


// // API de redemet list
// function grabRedec(url, minipath) {
//     var request = new XMLHttpRequest();
//     request.open('GET', url + minipath);
//     request.send();
//     request.onload = function () {
//         var data = JSON.parse(this.response);
//         if (request.status >= 200 && request.status < 400) {
//             atingidosList(data.sort(sortingJsonString('redec'))
//             );
//         }else{
//             console.log('error');
//         }
//     }
// }

// function atingidosList(data){ // Precisa ser convertido em REACT. Solução temporaria com createElement
//     var lista = document.getElementById('redecs');
//     data.forEach(redec =>{
//        var newRedec = document.createElement('ul');
//         redec['municipios'].sort().forEach(municipio=>{
//             var newCity = document.createElement('li');
//             console.log(newCity);
//             newCity.innerHTML = (municipio);
//             newRedec.appendChild(newCity);
//         });
//         lista.appendChild(newRedec);
//     });
// }

// function sortingJsonString(key){ // Função que ordena strings no Json
//     return function(obj1, obj2){
//         if (obj1[key]==obj2[key])
//             return 0
//         if (obj1[key]>obj2[key])
//             return 1
//         if (obj1[key]<obj2[key])
//             return -1
//     }
// }

// Função de Atualização
// function update() {
//     grabRedec(url, '/shapes/sp?source=starnet&struck=redecs');
//     grabApi(url, '/shapes/sp?source=starnet&struck=hit', struckShp);
//     grabApi(url, '/points/raios?source=starnet', lighningsMrk);
//     ChangeRain();
// }