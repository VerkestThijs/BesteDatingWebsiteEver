var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
};



window.onload = function () {



    document.getElementById("VerzendKnop").addEventListener("click", Verstuur);
    







}






function Verstuur() {

    let url = rooturl + '/profiel/create.php';

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(CreerJson()),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { console.log(data); })
        .catch(function (error) { console.log(error); });

    // var jsonobj = JSON.stringify(CreerJson())
    // console.log(jsonobj);

}

function validatie(Naam, Familienaam, Email, Nickname, Foto, Beroep, Haarkleur, Oogkleur, wachtwoord, Grootte, Gewicht) {

    let reg = /^[0-9]*$/;
    let regex = new RegExp(reg);

    const string = "er is iets foutgelopen"

    if (Naam == "" || Familienaam == "" || Email == "" || Nickname == ""
        || Foto == "" || Beroep == "" || Haarkleur == "" || Oogkleur == ""
        || wachtwoord == "") {

        alert(string + ": u hebt een van de velden leeg gelaten.")
        if (((!regex.test(Grootte)) || (!regex.test(Gewicht)))) {
            alert(string + ": u hebt geen getal ingegeven bij gewicht of grootte")
            return false;
        }
        return false;
    }

    else if ((!regex.test(Grootte)) || (!regex.test(Gewicht))) {
        alert(string + ": u hebt geen getal ingegeven bij gewicht of grootte")
        return false


    }
    else {
        return true;
    }

};


function creerSterrenbeeld() {

    let datum = document.getElementById("GeboorteDatum").value;
    let dag = datum.substr(8,2);
    let maand = datum.substr(5,2);

    let Sterrenbeeld = document.getElementById("Sterrenbeeld") 
    console.log(datum);




    if ((dag >= 22 && maand== 12)||(dag <=19 && maand ==01)) {
        Sterrenbeeld.value ="Steenbok";
        console.log(Sterrenbeeld);
        
    }
    if (((dag >=20 && maand==01)||(dag <=19 && maand==02))) {
        Sterrenbeeld.value ="Waterman";
    
    }
    if (((dag >=20 && maand==02)||(dag <=20 && maand==03))){
        Sterrenbeeld.value="Vissen";
    }
    if (((dag >=21 && maand==03)||(dag <=20 && maand==04))) {
        Sterrenbeeld.value="Ram";
    }
    if (((dag >=21 && maand==04)||(dag <=20 && maand==05))) {
        Sterrenbeeld.value="Stier";
    }
    if (((dag >=21 && maand==05)||(dag <=21 && maand==06))) {
        Sterrenbeeld.value="Tweeling";
    }
    if (((dag >=21 && maand==06)||(dag <=22 && maand==07))) {
        Sterrenbeeld.value="Kreeft";
    }
    if (((dag >=23 && maand==07)||(dag <=23 && maand==08))) {
        Sterrenbeeld.value="Leeuw";
    }
    if (((dag >=24 && maand==08)||(dag <=23 && maand==09))) {
        Sterrenbeeld.value="Maagd";
    }
    if (((dag >=24 && maand==09)||(dag <=23 && maand==10))) {
        Sterrenbeeld.value="Weegschaal";
        
    }
    if (((dag >=24 && maand==10)||(dag <=22 && maand==11))) {
        Sterrenbeeld.value="Schorpioen";

    }
    if (((dag >=23 && maand==11)||(dag <=21 && maand==12))) {
        Sterrenbeeld.value="Boogschutter";
    }
        
    

    console.log(dag+"dag")
    console.log(maand +"maand");

    
    





    

}





function CreerJson() {
    let Naam = document.getElementById("Naam").value;
    let Famielienaam = document.getElementById("FamNaam").value;
    let Geboortedatum = document.getElementById("GeboorteDatum").value;
    let Email = document.getElementById("Email").value;
    let Nickname = document.getElementById("Nickname").value;
    let Foto = document.getElementById("Foto").value;
    let Beroep = document.getElementById("Beroep").value;
    let Sexe = document.querySelector('input[name=Sexe]:checked').value;
    let Haarkleur = document.getElementById("Haarkleur").value;
    let Oogkleur = document.getElementById("Oogkleur").value;
    let Grootte = document.getElementById("Grootte").value;
    let Gewicht = document.getElementById("Gewicht").value;
    let Wachtwoord = document.getElementById("Wachtwoord").value;
    let Sterrenbeeld = document.getElementById("Sterrenbeeld").value;
    console.log(typeof(Geboortedatum));

    


    let geslaagdevalidatie = validatie(Naam, Famielienaam, Email, Nickname, Foto, Beroep, Haarkleur, Oogkleur, Wachtwoord, Grootte, Gewicht);

    if (geslaagdevalidatie) {

        data = {

            familienaam: Famielienaam,
            voornaam: Naam,
            geboortedatum: Geboortedatum,
            email: Email,
            nickname: Nickname,
            foto: Foto,
            beroep: Beroep,
            sexe: Sexe,
            haarkleur: Haarkleur,
            oogkleur: Oogkleur,
            grootte: Grootte,
            gewicht: Gewicht,
            wachtwoord: Wachtwoord,
            Sterrenbeeld: Sterrenbeeld,
            lovecoins: String(3)

        }

        return data;

    }
    else {
        return false
    }



    // data = {

    //     familienaam: Famielienaam,
    //     voornaam: Naam,
    //     geboortedatum: Geboortedatum,
    //     email: Email,
    //     nickname: Nickname,
    //     foto: base64string,
    //     beroep: Beroep,
    //     sexe: Sexe,
    //     haarkleur: Haarkleur,
    //     oogkleur: Oogkleur,
    //     grootte: Grootte,
    //     gewicht: Gewicht,
    //     wachtwoord: Wachtwoord,
    //     Sterrenbeeld: Sterrenbeeld,
    //     lovecoins: String(0)

    // };

    // return data




}








