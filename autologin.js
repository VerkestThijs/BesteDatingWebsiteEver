window.onload = function () {
    if (localStorage.nickname) {

        document.getElementById("frmNickname").value = localStorage.nickname;

            let url = rooturl + '/profiel/read.php';

            fetch(url)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    for (var i in data) {
                        if (data[i].nickname == localStorage.nickname) {
                            document.getElementById("frmWachtwoord").value = data[i].wachtwoord;
                            document.getElementsByClassName("dropbtn")[0].click();
                            document.getElementById("loginbtn").click();
                        }
                    }
                })
                .catch(function (error) { console.log(error); });

            console.log(document.getElementById("frmNickname").value);
            console.log(document.getElementById("frmWachtwoord").value);
    }
}
