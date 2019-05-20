var rooturl = "https://scrumserver.tenobe.org/scrum/api";

        function changeURL(sNewRoot){
            rooturl = sNewRoot;
            console.log('root set to : ' + rooturl)
}
var times = false;
var keren = false;

window.onload = function () {
    //localstorage controle + instellen
    if (localStorage.nickname){
        document.getElementById("frmNickname").value = localStorage.nickname;
    }
    else{
        document.getElementById('loginbtn').addEventListener('click', fnLocalStorage);
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fnDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.querySelector('.main').classList.toggle("blur");
    document.getElementById("frmNickname").focus();

    if (times == false){
        window.addEventListener('keyup', function(event){
            if (event.keyCode === 13){
                event.preventDefault;
                fnLogin();
            }
        })
    }
    times = true;

}

window.onclick = function(event){
    fnNoDropDown(event);
}

function fnLogin() {
    let nickname = document.getElementById("frmNickname").value;
    let wachtwoord = document.getElementById("frmWachtwoord").value;
    localStorage.nickname = nickname;

    let url=rooturl+'/profiel/authenticate.php';
    //let url = 'http://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
    let data = {
        nickname : nickname,
        wachtwoord : wachtwoord
    }

    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request)
        .then(function (response) { return response.json(); })
        .then(function (data) { 
            if (data.message == "Authorized"){
                //id doorgeven aan verdere pagina's
                sessionStorage.id = data.id;
                //volgende window openen. vervang 'test' door correcte url
                window.open("zoeken.html" , "_self");
            }
            else if (keren == false){
                var waarschuwing = document.createElement('p');
                waarschuwing.textContent = "nickname of wachtwoord is niet correct";
                document.getElementById('frmLogin').appendChild(waarschuwing);
                keren = true;
                }
            })
        .catch(function (error) { console.log(error); });
}
//dropdown sluiten indien ernaast geklikt wordt

document.getElementById('index').onclick = function(event){
    console.log(event.target);
    fnNoDropDown(event);
}
//Dropdown sluiten bij naast klikken
function fnNoDropDown (event){
    if (event.target.matches('#index')){
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            document.querySelector('.main').classList.remove("blur");
            window.removeEventListener('keyup', function(event){
                if (event.keyCode === 13){
                    event.preventDefault;
                    fnLogin();
                }
            }); 
        //}
    }
}

//nickname opslaan in local storage
function fnLocalStorage(){
    localStorage.nickname = document.getElementById('frmNickname').value;
}

