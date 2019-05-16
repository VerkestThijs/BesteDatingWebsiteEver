var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}



window.onload = function () {

    

    document.getElementById("VerzendKnop").addEventListener("click", Verstuur)

    






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

        var jsonobj = JSON.stringify(CreerJson())
        console.log(jsonobj);

}






function CreerJson() {
    let Naam = document.getElementById("Naam").value;
    let Famielienaam = document.getElementById("FamNaam").value
    let Geboortedatum = document.getElementById("GeboorteDatum").value
    let Email = document.getElementById("Email").value
    let Nickname = document.getElementById("Nickname").value
    let Foto = document.getElementById("Foto").value
    let Beroep = document.getElementById("Beroep").value
    let Sexe = document.querySelector('input[name=Sexe]:checked').value
    let Haarkleur = document.getElementById("Haarkleur").value
    let Oogkleur = document.getElementById("Oogkleur").value
    let Grootte = document.getElementById("Grootte").value
    let Gewicht = document.getElementById("Gewicht").value
    let Wachtwoord = document.getElementById("Wachtwoord").value
    let Sterrenbeeld = document.getElementById("Sterrenbeeld").value
    let base64string = btoa(Foto);// dit creert een base 64 string om mee te geven in json







    data = {
        
        familienaam: Famielienaam,
        voornaam: Naam,
        geboortedatum: Geboortedatum,
        email: Email,
        nickname: Nickname,
        foto: base64string,
        beroep: Beroep,
        sexe: Sexe,
        haarkleur: Haarkleur,
        oogkleur: Oogkleur,
        grootte: Grootte,
        gewicht: Gewicht,
        wachtwoord: Wachtwoord,
        Sterrenbeeld: Sterrenbeeld,
        lovecoins: String(0)

    };

    return data




}








