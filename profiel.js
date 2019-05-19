var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {

    let profielId = sessionStorage.id;                                          //test: let profielId = 5000;
    let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (userGegevens) {
            console.log(userGegevens);
            let eProfielvelden = document.getElementsByClassName("inputveld");
            voegPlaceholderToe(userGegevens, eProfielvelden);
        })
        .catch(function (error) { console.log(error); });

    //event listener: update profiel
    document.getElementById("VerzendKnop").addEventListener("click", Updaten);

    //event listener: delete
    document.getElementById("Deleteknop").addEventListener("click", Delete);
}

function voegPlaceholderToe(data, velden) {
    velden[0].placeholder = data.nickname;
    velden[1].placeholder = data.voornaam;
    velden[2].placeholder = data.familienaam;
    velden[3].placeholder = toonGeslacht(data.sexe);
    velden[4].placeholder = data.geboortedatum.substring(data.geboortedatum.length - 2, data.geboortedatum.length)
        + '/' + data.geboortedatum.substring(data.geboortedatum.length - 5, data.geboortedatum.length - 3)
        + '/' + data.geboortedatum.substring(0, 4);
    velden[5].placeholder = geefSterrenbeeld(data.geboortedatum);
    velden[6].placeholder = data.email;
    velden[7].placeholder = data.foto;
    velden[8].placeholder = data.beroep;
    velden[9].placeholder = data.haarkleur;
    velden[10].placeholder = data.oogkleur;
    velden[11].placeholder = data.grootte;
    velden[12].placeholder = data.gewicht;
    velden[13].placeholder = data.lovecoins;
    velden[14].placeholder = verbergWachtwoord(data.wachtwoord);
}

function toonGeslacht(geslacht) {
    if (geslacht == 'v') {
        return "vrouw";
    }
    else {
        if (geslacht == 'm') {
            return "man";
        }
        else {
            return "androgyn";
        }
    }
}

function verbergWachtwoord(wachtwoord) {
    var sWachtwoord = "";
    for (let i = 0; i < wachtwoord.length; i++) {
        var sTeken = "*";
        sWachtwoord += sTeken;
    }
    return sWachtwoord;
}

function Updaten() {

    let profielId = sessionStorage.id;
    let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    fetch(url)
        .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
        .then(function (userGegevens) {
            //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
            //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
            //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
            let urlUpdate = rooturl + '/profiel/update.php';

            //inulvelden
            let nieuweEmail = document.getElementById('Email').value;
            let nieuweFoto = document.getElementById('Foto').value;
            let nieuwBeroep = document.getElementById('Beroep').value;
            let nieuweHaarkleur = document.getElementById('Haarkleur').value;
            let nieuweOogkleur = document.getElementById('Oogkleur').value;
            let nieuweGrootte = document.getElementById('Grootte').value;
            let nieuwGewicht = document.getElementById('Gewicht').value;
            let nieuwWachtwoord = document.getElementById('Wachtwoord').value;
            var aIngevuldeVelden = [nieuweEmail, nieuweFoto, nieuwBeroep, nieuweHaarkleur, nieuweOogkleur, nieuweGrootte, nieuwGewicht, nieuwWachtwoord];

            aVeldIds = ['email', 'foto', 'beroep', 'haarkleur', 'oogkleur', 'grootte', 'gewicht', 'wachtwoord'];

            //validatie
            if ((nieuweGrootte != "" && isNaN(nieuweGrootte)) || (nieuwGewicht != "" && isNaN(nieuwGewicht))) {
                alert("U heeft bij grootte en/of gewicht geen getal opgegeven." + "\r\n" + "Uw profiel werd niet gewijzigd.");
            }
            else {
                for (let i = 0; i < aIngevuldeVelden.length; i++) {
                    if (aIngevuldeVelden[i] != "") {
                        userGegevens[aVeldIds[i]] = aIngevuldeVelden[i];
                    }
                }
                alert("Uw profiel werd aangepast.");
            }

            var request = new Request(urlUpdate, {
                method: 'PUT',
                body: JSON.stringify(userGegevens),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            document.getElementById("profielForm").reset();

            fetch(request)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data);
                    let eProfielvelden = document.getElementsByClassName("inputveld");
                    voegPlaceholderToe(userGegevens, eProfielvelden);
                 })
                .catch(function (error) { console.log(error); });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function geefSterrenbeeld(geboortedatum) {

    let dag = geboortedatum.substr(8,2);
    let maand = geboortedatum.substr(5,2);

    if ((dag >= 22 && maand== 12)||(dag <=19 && maand ==01)) {
        return "Steenbok";

    }
    if (((dag >=20 && maand==01)||(dag <=19 && maand==02))) {
        return "Waterman";
    
    }
    if (((dag >=20 && maand==02)||(dag <=20 && maand==03))){
        return "Vissen";
    }
    if (((dag >=21 && maand==03)||(dag <=20 && maand==04))) {
        return "Ram";
    }
    if (((dag >=21 && maand==04)||(dag <=20 && maand==05))) {
        return "Stier";
    }
    if (((dag >=21 && maand==05)||(dag <=21 && maand==06))) {
        return "Tweeling";
    }
    if (((dag >=21 && maand==06)||(dag <=22 && maand==07))) {
        return "Kreeft";
    }
    if (((dag >=23 && maand==07)||(dag <=23 && maand==08))) {
        return "Leeuw";
    }
    if (((dag >=24 && maand==08)||(dag <=23 && maand==09))) {
        return "Maagd";
    }
    if (((dag >=24 && maand==09)||(dag <=23 && maand==10))) {
        return "Weegschaal";
        
    }
    if (((dag >=24 && maand==10)||(dag <=22 && maand==11))) {
        return "Schorpioen";

    }
    if (((dag >=23 && maand==11)||(dag <=21 && maand==12))) {
        return "Boogschutter";
    }

}

function Delete(){
    var userid = sessionStorage.id;

    let url = rooturl + '/profiel/delete.php';
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    let data = {
        id: userid
    }

    var request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { console.log(data); })
        .catch(function (error) { console.log(error); });
}