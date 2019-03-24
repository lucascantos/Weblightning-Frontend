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
    data.forEach(lightning => {
        var y = lightning.latitude;
        var x = lightning.longitude;
        lightning = L.marker([y, x], marker15);
        layer.addLayer(lightning).addTo(mymap);
    });
}

function cityname(feature, layer) {
    layer.bindPopup(feature.properties.NM_ESTADO);
}

function grabRain(url, minipath) {
    var request = new XMLHttpRequest();
    request.open('GET', url + minipath);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            mymap.removeLayer(rainImg)
            var x = [[data.south, data.west], [data.north, data.east]];
            rainImg.setUrl(data.url);
            rainImg.setOpacity(0.6);
            rainImg.setBounds(x).addTo(mymap);
        } else {
            console.log('error');
        }
    }
}