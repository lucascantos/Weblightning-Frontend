
// Função de Atualização

function serialize (params) {
    var str = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return str
}

function updateLightning(){
    var param = {
        "source": "starnet"
    };
    var path = url + '/points/raios?' + serialize(param);
    grabApi(path, lighningsMrk, addLightnings);
}

function updateStruck(){
    var param = {
        "source": "starnet",
        "struck": "hit"
    };
    var path = url + '/shapes/sp?' + serialize(param);
    grabApi(path, struckShp, addStruck);
}

function updateRain(){
    var param = {
        "source": "redemet",
        "location": "sr"
    };
    var path = url + '/radar?' + serialize(param);
    grabApi(path, rainImg, addRain);
}


function updateAll() {
    updateLightning()
    updateStruck()
    updateRain()
}