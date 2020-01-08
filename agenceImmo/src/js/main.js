function displayIndex() {
    let fin = "";
    $.getJSON('src/js/storage.json', function (data) {
        $.each(data.immo, function (i, f) {
            $.ajax({
                url: 'view/templateindex.html', success: (response) => {
                    response = new DOMParser().parseFromString(response, "text/xml");
                    $(response).find('[data-card]').each((ind, val) => {
                        $(val).html(f[$(val)[0].attributes[0].value]);
                    });
                    $(response).find("#imgCard").attr("alt", "bien " + f.id);
                    $(response).find("#imgCard").attr("src", "src/img/" + f.photo + ".jpg");
                    response = response.children;
                    fin += response[0].outerHTML;
                    $('.rang').html(fin);
                }
            });
        })
    })
}

displayIndex();


function storeClicked(elt) {
    let idCard = $(elt)[0].parentElement.parentElement.children[1].innerHTML;
    idCard = parseInt(idCard);

    localStorage.setItem('storedId', idCard);

    $(location).attr('href','view/product.html');
}





