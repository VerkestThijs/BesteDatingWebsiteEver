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
                url += 'haarkleur=' + document.getElementById('haarkleur').value;
            }
            if (document.getElementById('oogkleur').value != "") {
                url += 'oogkleur=' + document.getElementById('oogkleur').value;
            }
            fetch(url)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    let test = [data]
                    let lijst = document.getElementById("lijst");
                    console.log(data);
                        for (let i = 0; i < data.length; i++) {
                            test[i] = data[i]
                            //console.log(test[i].voornaam + test[i].familienaam)
                            let item = document.createElement('li');
                            item.innerHTML = test[i].voornaam + ' ' + test[i].familienaam + ' (' + test[i].email + ' )';
                            lijst.appendChild(item); 
                        };      
                })
                .catch(function (error) { console.log(error); });

            //resetten formulier
            let eLijst = document.getElementById('zoekform');
            eLijst.reset();

        }; //einde IF  
    }); // einde click

} // einde window onload

function validatie() {

    if ((isNaN(document.zoekform.grootte.value) || document.zoekform.grootte.value <= 0 || document.zoekform.grootte.value >= 250) && document.zoekform.grootte.value != "") {
        alert('Geef een geldige grootte');
        return false
    };
    if ((isNaN(document.zoekform.gewicht.value) || document.zoekform.gewicht.value <= 0 || document.zoekform.gewicht.value >= 600) && document.zoekform.gewicht.value != "") {
        alert('Geef een geldig gewicht');
        return false
    };

    return true;
}; //einde validatiefunctie