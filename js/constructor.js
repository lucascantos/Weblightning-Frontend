
// Função de Atualização

function serialize (params) {
    var str = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return str
}

function updateLightning(){
    var param = {
        "source": "starnet"
    };
    var path = url + '/raios?' + serialize(param);
    grabApi(path, lighningsMrk, addMrks);
}

function updateLightningStruck(){
    var param = {
        "source": "starnet",
    };
    var path = url + '/raios/struck?' + serialize(param);
    grabApi(path, lighningStruckShp, addShp);
}

function updateRain(){
    var param = {
        "source": "redemet",
        "location": "sr"
    };
    var path = url + '/chuva?' + serialize(param);
    grabApi(path, rainImg, addImg);
}

function updateRainStruck(){
    var param = {
        "source": "redemet",
        "location": "sr"
    };
    var path = url + '/chuva/struck?' + serialize(param);
    grabApi(path, rainStruckShp, MultipleShp);
}


function updateAll() {
    updateLightningStruck()
    updateRainStruck()
    updateLightning()
    updateRain()    
}