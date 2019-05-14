var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {
    document.getElementById('zoek').addEventListener('click', function (e) {

        //VALIDATIE GEGEVENS
        if (validatie() == true) {

            //nickname
            let nickname = document.getElementById('nickname').value;
            let url = rooturl + '/profiel/search.php?nickname=' + nickname;
            fetch(url)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data) })
                .catch(function (error) { console.log(error); })

            //beroep
            let beroep = document.getElementById('beroep').value;
            let url2 = rooturl + '/profiel/search.php?beroep=' + beroep;
            fetch(url2)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data) })
                .catch(function (error) { console.log(error); })

            // geslacht
            let geslacht = document.getElementById('geslacht').value;
            let url3 = rooturl + '/profiel/search.php?sexe=' + geslacht;
            fetch(url3)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); });

            //haarkleur
            let haarkleur = document.getElementById('haarkleur').value;
            let url4 = rooturl + '/profiel/search.php?haarkleur=' + haarkleur;
            fetch(url4)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); })

            //oogkleur
            let oogkleur = document.getElementById('oogkleur').value;
            let url5 = rooturl + '/profiel/search.php?oogkleur=' + oogkleur;
            fetch(url5)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); })

            //grootte
            let grootte = document.getElementById('grootte').value;
            let url6 = rooturl + '/profiel/search.php?grootte=' + grootte;
            fetch(url6)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); })

            //gewicht
            let gewicht = document.getElementById('gewicht').value;
            let url7 = rooturl + '/profiel/search.php?gewicht=' + gewicht;
            fetch(url7)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); })

            //resetten formulier
            var eLijst = document.getElementById('zoekform');
            eLijst.reset();

        }; //einde IF    
    }); // einde click

} // einde window onload

function validatie() {
    if (document.zoekform.geslacht.value == '') {
        alert('Kies een geslacht');
        return false
    };
    if (document.zoekform.haarkleur.value == '') {
        alert('Kies een haarkleur');
        return false
    };
    if (document.zoekform.oogkleur.value == '') {
        alert('Kies een oogkleur');
        return false
    };
    if (isNaN(document.zoekform.grootte.value) || document.zoekform.grootte.value <= 0 || document.zoekform.grootte.value >= 250) {
        alert('Geef een geldige grootte');
        return false
    };
    if (isNaN(document.zoekform.gewicht.value) || document.zoekform.gewicht.value <= 0 || document.zoekform.gewicht.value >= 600) {
        alert('Geef een geldig gewicht');
        return false
    };
    return true;
}; //einde validatiefunctie


