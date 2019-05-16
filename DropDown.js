var rooturl = "https://scrumserver.tenobe.org/scrum/api";

        function changeURL(sNewRoot){
            rooturl = sNewRoot;
            console.log('root set to : ' + rooturl)
}

window.onload = function () {
    
    //localstorage controle + instellen
    if (localStorage.nickname){
        document.getElementById("input10_1").value = localStorage.nickname;
    }
    else{
        document.getElementById('knop10').addEventListener('click', fnLocalStorage);
    }

    //inloggen met enter
    document.getElementById('input10_2').addEventListener('keyup', function(event){
        if (event.keyCode === 13){
            event.preventDefault;
            fnLogin();
        }
    })
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fnDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.querySelector('.main').classList.toggle("blur");
    document.getElementById("input10_1").focus();
}

function fnLogin() {
    let nickname = document.getElementById("input10_1").value;
    let wachtwoord = document.getElementById("input10_2").value;

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
                sessionStorage.id = data.id;
                window.open("test.html" , "_self");
            }
            else if (data.message == "Unauthorized"){
                alert("nickname of wachtwoord is foutief");
            }
            })
            
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
            document.querySelector('.main').classList.remove("blur");
        }
    }
}

function fnLocalStorage(){
    localStorage.nickname = document.getElementById('input10_1').value;
}

//belangrijk voor globale javascript (id-veiligheid)
/*
window.onunload()=function(){
    alert("bye!");
    localStorage.id.remove;
}*/
