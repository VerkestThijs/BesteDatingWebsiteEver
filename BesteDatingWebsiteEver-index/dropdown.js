
window.onload = function () {
    let LoginBtn = document.getElementById('loginbtn')
    LoginBtn.addEventListener('click', fnLogin())
}

/*window.onclick = function(event){
	if (!event.target.matches(
}*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fnDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.body.classList.toggle("blur");
}

function fnLogin() {
    let Naam = document.getElementById("frmNickname").nodeValue;
    let Wachtwoord = document.getElementById("frmWachtwoord").nodeValue;

    console.log(Naam);
    console.log(Wachtwoord);

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
    let data = {
        "nickname": Naam,
        "wachtwoord": Wachtwoord
    }

    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application / json' })
    });

    fetch(request)
        .then(function (response) { return response.json(); })
        .then(function (data) { console.log(data); })
        .catch(function (error) { console.log(error); });
}

window.onclick = function (event) {
    if ((!event.target.matches('.dropbtn'))) {
        if ((!event.target.matches('.dropdown-con'))) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            document.body.style.backgroundColor = "white";
        }
    }
} 