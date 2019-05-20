var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {
    document.getElementById('zoek').addEventListener('click', function (e) {
        var url = rooturl + '/profiel/search.php?';
        //VALIDATIE GEGEVENS
        if (validatie() == true) {
            if (document.getElementById('nickname').value != "") {
                url += 'nickname=' + document.getElementById('nickname').value + '&';
            }
            if (document.getElementById('beroep').value != "") {
                url += 'beroep=' + document.getElementById('beroep').value + '&';
            }
            if (document.getElementById('geslacht').value != "") {
                url += 'sexe=' + document.getElementById('geslacht').value + '&';
            }
            if (document.getElementById('haarkleur').value != "") {
                let haar = '%' + document.getElementById('haarkleur').value + '%';
                url += 'haarkleur=' + haar + '&';
            }
            if (document.getElementById('oogkleur').value != "") {
                let oog = '%' + document.getElementById('oogkleur').value + '%';
                url += 'oogkleur=' + oog + '&';
            }
            if (document.getElementById('grootte').value != "" || document.getElementById('groperator').value != "") {
                let grootteOperator = document.getElementById('groperator').value;
                if (grootteOperator != "range") {
                    let grootte = document.getElementById('grootte').value;
                    let grootteOperator = document.getElementById('groperator').value;
                    let orderbyge = document.getElementById('ordenge').value;
                    url += 'grootte=' + grootte + '&grootteOperator=' + grootteOperator + '&orderBy=' + orderbyge + '&';

                }
                else {
                    let rangeMinGrootte = document.getElementById('minGrootte').value;
                    let rangeMaxGrootte = document.getElementById('maxGrootte').value;
                    let orderbyge = document.getElementById('ordenge').value;
                    url += '&grootteOperator=range&rangeMinGrootte=' + rangeMinGrootte + '&rangeMaxGrootte=' + rangeMaxGrootte + '&orderBy=' + orderbyge + '&'
                }
            }
            if (document.getElementById('gewicht').value != "" || document.getElementById('geoperator').value != "") {
                let gewichtOperator = document.getElementById('geoperator').value;
                if (gewichtOperator != "range") {
                    let gewicht = document.getElementById('gewicht').value;
                    let gewichtOperator = document.getElementById('geoperator').value;
                    let orderbyge = document.getElementById('ordenge').value;
                    url += 'gewicht=' + gewicht + '&gewichtOperator=' + gewichtOperator + '&orderBy=' + orderbyge + '&';

                }
                else {
                    let rangeMinGewicht = document.getElementById('minGewicht').value;
                    let rangeMaxGewicht = document.getElementById('maxGewicht').value;
                    let orderbyge = document.getElementById('ordenge').value;
                    url += '&gewichtOperator=range&rangeMinGewicht=' + rangeMinGewicht + '&rangeMaxGewicht=' + rangeMaxGewicht + '&orderBy=' + orderbyge + '&'

                }
            }
            fetch(url)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    let test = [data]
                    let lijst = document.getElementById("lijst");
                    lijst.innerHTML = "";
                    //console.log(test); // TEST
                    if (test[0].message == 'Geen profielen gevonden.') {
                        alert('Geen profielen gevonden');
                    }
                    else {
                        for (let i = 0; i < data.length; i++) {
                            test[i] = data[i];
                            let item = document.createElement('li');
                            item.innerHTML = test[i].nickname;
                            lijst.appendChild(item);
                            item.addEventListener('click',function (e) {
                                    sessionStorage.nieuwId    =    test[i].id;
                                    console.log(test[i].id);
                                    window.open('berichten.html','_self');
                                })
                        };
                    }
                })
                .catch(function (error) { console.log(error); });

            //resetten formulier
            let eLijst = document.getElementById('zoekform');
            eLijst.reset();
        }; //einde IF  
    }); // einde click

} // einde window onload

function validatie() {

    let grootte = document.getElementById('grootte').value;
    let gewicht = document.getElementById('gewicht').value;

    if ((isNaN(grootte) || grootte <= 0 || grootte >= 250) && grootte != "") {
        alert('Geef een geldige grootte');
        return false
    };
    if ((isNaN(gewicht) || gewicht <= 0 || gewicht >= 600) && gewicht != "") {
        alert('Geef een geldig gewicht');
        return false

    };

    return true;
}; //einde validatiefunctie


