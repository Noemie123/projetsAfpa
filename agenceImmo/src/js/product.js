function dataDisplay() {
    let fin = "";
    let storedId = localStorage.getItem("storedId");
    let monId = storedId - 1;

    $.getJSON('../src/js/storage.json', function (data) {
        let objJson = data.immo[monId];
        console.log(objJson);

        $.ajax({
            url: 'templateproduct.html', success: (response) => {
                response = new DOMParser().parseFromString(response, "text/xml");
                $(response).find('[data-prod]').each((ind, val) => {
                    $(val).html(objJson[$(val)[0].attributes[0].value]);
                });
                $(response).find("#prodImg").attr("alt", "bien " + objJson.id);
                $(response).find("#prodImg").attr("src", "../src/img/" + objJson.photo + ".jpg");
                response = response.children;
                fin += response[0].outerHTML;
                $('.productContent').html(fin);


                function initMapProd(listener) {
                    var iconBase =
                        'http://maps.google.com/mapfiles/kml/pal3/';

                    let agence = {
                        lat: 50.63222,
                        lng: 3.0694065000000137
                    };

                    let maison = {
                        lat: objJson.lati,
                        lng: objJson.long
                    };

                    let content = "<h4>Casa Di Giuletta</h4> <p>62 Avenue du Président John F. Kennedy</p><p>59800 Lille</p>";

                    let affichePlace = document.querySelector("#mapDiv");

                    let map = new google.maps.Map(affichePlace, {
                        center: maison
                    });


                    let marker = new google.maps.Marker({
                        position: maison,
                        icon: iconBase + 'icon48.png',
                        map: map
                    });

                    let marker2 = new google.maps.Marker({
                        position: agence,
                        icon: iconBase + 'icon35.png',
                        map: map
                    });

                    let infos = new google.maps.InfoWindow({
                        content: content,
                        position: maison,
                    });


                    let directionsService = new google.maps.DirectionsService();
                    let directionsDisplay = new google.maps.DirectionsRenderer({'map': map});
                    let request = {
                        origin: agence,
                        destination: maison,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING,
                        unitSystem: google.maps.DirectionsUnitSystem.METRIC
                    };
                    directionsService.route(request, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            directionsDisplay.setOptions({
                                polylineOptions: {
                                    strokeColor: "brown"
                                }, suppressMarkers: true
                            });
                        }
                    });

                    marker.addListener("click", () => {
                        infos.open(map);
                    });
                }


                $(function () {
                    initMapProd();
                });
            }


        });


        /*
        let img = `<img src="../src/img/${f.photo}.jpg" alt="maison">`;
        $("#sliderDiv").html(img);
        let info = `<h1>${f.nom}</h1><h2>${f.ville}</h2><p>Surface : ${f.surface}</p><p>Nb de pièces : ${f.piece}</p><p>Description</p><p>${f.desc}</p><p>Prix : ${f.prix}</p><p class="petitPlus">Petit plus : ${f.autre}</p>`;
        $("#infoImmo").html(info);
        let addr = `<p>${f.adresse}</p>`;
        $("#addrDiv").html(addr);

         */

    })


    /*$(".idCard").each(function () {
        console.log($(this).html())
    });
    console.log("bye bye");*/

}

dataDisplay();






