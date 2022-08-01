/**
 * Asynchronous function returning a promise
 * @param {string}   url          url to Call.
 */
async function callApi(url) {
    let response = await fetch(url);
    return await response.json();
}

/**
 * Call Api with the url and output the result to a card
 * @param {string}   url          url to Call.
 */
function writeToDocument(url) {
    let tableRows = [];
    let el = document.getElementById("data");
    callApi(url).then(function (response) {
        data = response.drinks;
        data.forEach(function (item) {
            let dataRow = [];
            dataRow.push('<div class="col-sm-12 col-md-6 col-lg-3 d-flex flex-row justify-content-center">');
            dataRow.push('<div class="card shadow-lg p-2 mb-3 bg-white rounded mt-3">');
            dataRow.push('<div class="image">');
            dataRow.push(`<img src=${item.strDrinkThumb} class="img-fluid" onclick="openGalleryModal(${item.idDrink})">`);
            dataRow.push('</div>');
            dataRow.push('<div class="card-body">');
            dataRow.push(`<h5 class="card-title">${item.strDrink}</h5>`);
            dataRow.push('</div>');
            dataRow.push('</div>');
            dataRow.push('</div>');
            tableRows.push(`${dataRow}`);
        });

        el.innerHTML = `${tableRows}`.replace(/,/g, "");
    }).catch(function (err) {
        $('#modalMissing').modal('show');
    });
}

function searchSubmit() {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    let inputVal = document.getElementById("searchBar").value;
    writeToDocument(url + inputVal);
    document.getElementById("wrapper").classList.remove('wrap');
}
