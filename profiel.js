var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {

    //let profielId = sessionStorage.id;   
    let profielId = 5000;
    let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (userGegevens) {
            console.log(userGegevens);
            let eProfielvelden = document.getElementsByClassName("inputveld");
            InsertDataAsPlaceholder(userGegevens, eProfielvelden);
        })
        .catch(function (error) { console.log(error); });

    //event listener: update profiel
    document.getElementById("VerzendKnop").addEventListener("click", Updaten)

    //fetch data uit profielId + vul ze in als placeholder
}

function InsertDataAsPlaceholder(data, velden) {
    velden[0].placeholder = data.nickname;
    velden[1].placeholder = data.voornaam;
    velden[2].placeholder = data.familienaam;
    velden[3].placeholder = ToonGeslacht(data.sexe);
    velden[4].placeholder = data.geboortedatum.substring(data.geboortedatum.length - 2, data.geboortedatum.length)
        + '/' + data.geboortedatum.substring(data.geboortedatum.length - 5, data.geboortedatum.length - 3)
        + '/' + data.geboortedatum.substring(0, 4);
    velden[5].placeholder = data.email;
    velden[6].placeholder = data.foto;
    velden[7].placeholder = data.beroep;
    velden[8].placeholder = data.haarkleur;
    velden[9].placeholder = data.oogkleur;
    velden[10].placeholder = data.grootte;
    velden[11].placeholder = data.gewicht;
    velden[12].placeholder = verbergWachtwoord(data.wachtwoord);
    //velden[12].placeholder = data.xxx;                // functie Thijs datumNAarSterrenbeeld
}

function ToonGeslacht(geslacht) {
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

    //let profielId = sessionStorage.id;   
    let profielId = 5000;
    let url = rooturl + '/profiel/read_one.php?id=' + profielId;

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


    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (userGegevens) {
            //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
            //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
            //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
            let urlUpdate = rooturl + '/profiel/update.php';

            aVeldIds = ['email', 'foto', 'beroep', 'haarkleur', 'oogkleur', 'grootte', 'gewicht', 'wachtwoord'];

            for (let i = 0; i < aIngevuldeVelden.length; i++) {
                if (aIngevuldeVelden[i] != "") 
                {
                    userGegevens[i] = aIngevuldeVelden[i];
                    console.log(userGegevens[i]);
                }
            }

            var request = new Request(urlUpdate, {
                method: 'PUT',
                body: JSON.stringify(userGegevens),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            fetch(request)
                .then(function (resp) { return resp.json(); })
                .then(function (boodschap) {
                    console.log(profielId);
                    console.log(boodschap);
                })
                .catch(function (error) { console.log(error); });

            document.getElementById("profielForm").reset();

        })
        .catch(function (error) {
            console.log(error);
        });

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (userGegevens) {
            console.log(userGegevens);
            let eProfielvelden = document.getElementsByClassName("inputveld");
            InsertDataAsPlaceholder(userGegevens, eProfielvelden);
        })
        .catch(function (error) { console.log(error); });
}

/*
//validatie lege spaties
function validatie(aIngevuldeVelden) {
        if (aIngevuldeVelden[i] == "") {
            console.log("leeg veld");
            return false;
        }
        console.log("vontrole1");

    }

    return true;
}
*/
