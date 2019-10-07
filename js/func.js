//API de raios e Trovões
function grabApi(url, mapLayer, func) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {            
            
            console.log(data)
            // mymap.removeLayer(mapLayer)
            func(data, mapLayer)

        } else {
            console.log('error');
        }
    }
}

function addLightnings(data, mapLayer) {
    data['lightnings'].forEach(singleLightning => {
        var y = singleLightning.latitude;
        var x = singleLightning.longitude;        
        singleLightning = L.marker([y, x], mapLayer);
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
    mapLayer.setUrl(radarImage);
    mapLayer.setBounds(x).addTo(mymap);
}



function serialize (params) {
    var str = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return str
}

var url = 'http://127.0.0.1:5000';
var param = {
    "source": "redemet",
    "location": "sr"
}
path = url + '/radar?' + serialize(param);
grabApi(path, 'rainImg', addRain);