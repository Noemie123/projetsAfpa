let dbt = 0;
let fin = 9;

// function displayIndex() {
// //     let tempResp;
// //     let f;
// //     $.getJSON('src/js/storage.json', function (data) {
// //         $.ajax({
// //             url: 'templates/templateindex.html',
// //             success: (response) => {
// //
// //                 //$.each(data.immo, function (i, f) {
// //                 for (let i = dbt; i < fin; i++ ) {
// //                     f = data.immo[i];
// //                     tempResp = response;
// //                     tempResp = new DOMParser().parseFromString(tempResp, "text/xml");
// //                     $(tempResp).find('[data-card]').each((ind, val) => {
// //                         $(val).html(f[$(val)[0].attributes[0].value]);
// //                     });
// //                     $(tempResp).find("#imgCard").attr("alt", "bien " + f.id);
// //                     $(tempResp).find("#imgCard").attr("src", "src/img/" + f.photo + ".jpg");
// //                     tempResp = tempResp.children;
// //                     //$('.rang').append(tempResp[0]);
// //
// //
// //                     $('.rang').append(tempResp[0].outerHTML)
// //
// //
// //                 }
// //             }
// //         })
// //     })
// // }

//data.immo = undefined;

function displayIndex(dt) {
    let tempResp;
    let f;
    dbt = 0;

    $.getJSON('src/js/storage.json', function (data) {
        $.ajax({
            url: 'templates/templateindex.html',
            success: (response) => {
                let tempData = data.immo;
                let nbElt = tempData.length;
                if (displayArray[0] != "null") {
                    dbt = 0;
                    for (let j = 0; j < tempData.length; j++) {
                        if (displayArray[0] != null && tempData[j] != null) {
                            if (displayArray[0] !== tempData[j].type) {
                                tempData[j] = null;
                            }
                        }
                        if (displayArray[1] != null && tempData[j] != null) {
                            if (displayArray[1] !== tempData[j].achat) {
                                tempData[j] = null;
                            }
                        }
                        if (displayArray[2] != null && tempData[j] != null) {
                            if (displayArray[2] >= tempData[j].piece) {
                                tempData[j] = null;
                            }
                        }
                        if (displayArray[3] != null && tempData[j] != null) {
                            if (displayArray[3] >= tempData[j].surface) {
                                tempData[j] = null;
                            }
                        }
                        if (displayArray[4] != null && tempData[j] != null) {
                            if (displayArray[4] <= tempData[j].prix) {
                                tempData[j] = null;
                            }
                        }
                    }

                    nbElt = 0;
                    let indlast;
                    for (let j = 0; j < tempData.length; j++) {
                        if (tempData[j] != null) {
                            nbElt++;
                            indlast = j;
                        }
                    }


                    if (nbElt < 9) {
                        fin = indlast + 1;
                    } else {
                        fin = 9;
                    }




                    $('.rang').html("");

                }

                if (dt > fin ) {
                    fin = dt;
                }

                if (fin > tempData.length) {
                    fin = tempData.length;
                }


                $('.rang').html("");

                let nbDisplay = 0;
                for (let i = dbt; i < fin; i++) {
                    if (tempData[i] != null) {

                        f = tempData[i];
                        tempResp = response;
                        tempResp = new DOMParser().parseFromString(tempResp, "text/xml");
                        $(tempResp).find('[data-card]').each((ind, val) => {
                            $(val).html(f[$(val)[0].attributes[0].value]);
                        });
                        $(tempResp).find("#imgCard").attr("alt", "bien " + f.id);
                        $(tempResp).find("#imgCard").attr("src", "src/img/" + f.photo + ".jpg");
                        tempResp = tempResp.children;


                        $('.rang').append(tempResp[0].outerHTML)
                        nbDisplay++;
                    }
                }


                if (nbDisplay == nbElt) {
                    $('#chargerBtn').css('display', "none");
                } else {
                    $('#chargerBtn').css('display', "inline-block");
                }

                console.log(fin);

            }
        })
    })
}

displayIndex();

$("#chargerBtn").on('click', () => {
    fin += 9;

    displayIndex(fin);
})


function storeClicked(elt) {
    let idCard = $(elt)[0].parentElement.parentElement.children[1].innerHTML;
    idCard = parseInt(idCard);

    localStorage.setItem('storedId', idCard);

    $(location).attr('href', 'view/product.html');
}

let displayArray = ["null"];

$('#formButton').on('click', () => {
    displayArray = [];
    let searchArray = [$("#selectType")[0].value, $("#selectAchat")[0].value, $("#pieceInput")[0].value, $("#surfaceInput")[0].value, $("#prixInput")[0].value];
    for (let i = 0; i < searchArray.length; i++) {
        if (searchArray[i] !== "") {
            displayArray.push(searchArray[i]);
        } else {
            displayArray.push(null);
        }
    }

    displayIndex();
})

