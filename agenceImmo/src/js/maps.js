function initMap(listener) {
    var iconBase =
        'https://maps.google.com/mapfiles/kml/shapes/';
    var iconBase2 =
        'https://maps.google.com/mapfiles/kml/pushpin/';
    let colorArray = ['brown', 'blue', 'red', 'pink', 'green', 'purple'];

    let agence = {
        lat: 50.63222,
        lng: 3.0694065000000137
    };

    let gare = {
        lat: 50.6365045,
        lng: 3.0699617000000217
    };

    let content = "<h4>Casa Di Giuletta</h4> <p>62 Avenue du Président John F. Kennedy</p><p>59800 Lille</p>";

    let affichePlace = document.querySelector("#mapAgence");

    let map = new google.maps.Map(affichePlace, {
        center: agence
    });


    let marker = new google.maps.Marker({
        position: agence,
        icon: iconBase2 + 'red-pushpin.png',
        map: map
    });

    let marker2 = new google.maps.Marker({
        position: gare,
        icon: iconBase + 'rail_maps.png',
        map: map
    });

    let infos = new google.maps.InfoWindow({
        content: content,
        position: agence,
        zIndex: 999999999,
        pixelOffset: new google.maps.Size(0, -60)
    });


    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({'map': map});
    let request = {
        origin: gare,
        destination:  agence,
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC
    };
    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions({
                polylineOptions: {
                    strokeColor: colorArray[Math.floor(Math.random() * colorArray.length)]
                },
                suppressMarkers: true
            });
        }
    });

    marker.addListener("mouseover", () => {
        infos.open(map);
    });
    marker.addListener("mouseout", () => {
        infos.close(map);
    });
}


$(function () {
    initMap();
});




