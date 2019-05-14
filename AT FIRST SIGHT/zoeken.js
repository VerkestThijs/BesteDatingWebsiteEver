var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {
    document.getElementById('zoek').addEventListener('click', function (e) {

        if (nickname.value != "" || beroep.value != "" || geslacht.value != "" || haarkleur.value != "" || oogkleur.value != "") {

            //nickname
            let nickname = document.getElementById('nickname').value;

            let url = rooturl + '/profiel/search.php?nickname=' + nickname;
            fetch(url)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
                .catch(function (error) { console.log(error); })

            //beroep
            let beroep = document.getElementById('beroep').value;

            let url2 = rooturl + '/profiel/search.php?beroep=' + beroep;

            fetch(url2)
                .then(function (resp) { return resp.json(); })
                .then(function (data) { console.log(data); })
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

        }; //einde if


    }); // einde click

} // einde function
