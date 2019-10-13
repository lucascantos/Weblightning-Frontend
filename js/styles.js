    // Mapa Principal de Background
    var backgroundMap = {
        maxZoom: 18,
        attribution: 'Map data &copy;' +
            ' <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    };

    // Subdivisão de poligonos
    var backgroundStates = {
        interactive: false,
        color: '#000',
        fillOpacity: 0.0,
        weight: 0.2
    };

    var backgroundPolys = {
        color: '#204',
        fillOpacity: 0.01,
        weight: 0.2
    };

    // Regiões destacadas atingidas
    var highlightPolys = {
        color: '#800',
        fillOpacity: 0.2,
        weight: 0.2,
    };

    // Radares meteorologicos
    var rainStyle = {
        opacity: 0.5,
    };


    // Icones de raio
    var myicon = L.icon({
        iconUrl: 'img/Licon.png',
        iconSize: [15, 35],

    });
    var marker15 = {
        icon: myicon,
        opacity: 0.9,
        interactive: false,
    };

function ChangeOpacity(value){
    for (var i=0; i<=5;i++){
        if (i<levelValue){            
            out_value = 0;
            weight = 0
            fillOpacity = 0
        }
        else{
            weight = 0.2
            out_value = value;
        }
        rainImg.getLayers()[i].setOpacity(out_value);        
        console.log(rainStruckShp.getLayers())
        rainStruckShp.getLayers()[i].setStyle({'fillOpacity': weight, 'weight': weight});
    }    
}
    
function StyleUpdate(value){
    radar_level.style.background = lavel_values[value];
    levelValue = value;
    ChangeOpacity(radar_opacity.value)
}