var rooturl = "https://scrumserver.tenobe.org/scrum/api";
var chatPartners = [];
var chatMessages = {};


window.onload = function () {
    let userId = sessionStorage.id;                                                                     //test: let userId = 2                                                                                             
    let urlBerichten = rooturl + '/bericht/read.php?profielId=' + userId;                                       

    //geef berichtenlijst van user
    fetch(urlBerichten)
    .then(function (resp) { return resp.json(); })
    .then(function (chatMessages) {
        if (chatMessages.length == 0) {
            //geen gesprekken? boodschap tonen
            var eChatpartnerLijst = document.getElementById('containerGesprekspartners');
            var eGeenBerichten = document.createElement('p');
            eGeenBerichten.innerHTML = "U heeft nog geen gesprekken gevoerd.";
            eChatpartnerLijst.appendChild(eGeenBerichten);
        }
        else {
            //wel gesprekken? heading Gesprekspartners maken
            var eChatpartnerLijst = document.getElementById('containerGesprekspartners');
            var eHeading = document.createElement('h2');
            eHeading.innerHTML = "Gesprekspartners";
            eChatpartnerLijst.appendChild(eHeading);
            //filter chatpartners uit berichtenlijst
            chatPartners = extractChatPartners(chatMessages, userId);            
        }
    })
    .then( function(){
        if (sessionStorage.nieuwId  != null){
            fnNieuwePartner();
        }
    })
    .catch(function (error) { console.log(error); });

    //nieuwbericht
     
}
function extractChatPartners(messages, userId) {
    let partners = [];
    //maak array: chatpartnerId + boodschap
    for (var i = 0; i < messages.length; i++) {
        if (messages[i][0].benIkZender == "1") {
            partners.push([messages[i][0].naarId, messages[i][messages[i].length - 1].bericht]);
        }
        else {
            partners.push([messages[i][0].vanId, messages[i][messages[i].length - 1].bericht]);
        }

    }
    for (var j = 0; j < partners.length; j++) {
        addChatPartner(partners[j][0], userId, partners[j][1]);
    }
}

function addChatPartner(partner, userId, bericht = "") {
    let url = rooturl + '/profiel/read_one.php?id=' + partner;
    var rootImg = "https://scrumserver.tenobe.org/scrum/img/";

    //geef info per profiel + voeg toe
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (partnerProfiel) {

            var ePartnerList = document.getElementById('containerGesprekspartners');
            var ePartner = document.createElement('div');
            var eImg = document.createElement('img');
            var eNickname = document.createElement('p');
            eNickname.innerHTML = partnerProfiel.nickname;
            eNickname.className = "nicknameGesprekspartner";
            var eBerichttekst = document.createElement('p');

            var eNieuwbericht = document.createElement('input');
            eNieuwbericht.id = 'input' + partner;
            eNieuwbericht.className = "berichttextbox";

            var eNieuwberichtBtn = document.createElement('button');

            eNieuwberichtBtn.id = 'btn'  +  partner;
            eNieuwberichtBtn.type = "button";
            eNieuwberichtBtn.textContent = "verzenden";
            eNieuwberichtBtn.className = "berichtbutton";

            eBerichttekst.innerHTML = bericht;

            eBerichttekst.className = "boodschap";
            if (eBerichttekst.innerHTML.length > 15) {
                eBerichttekst.innerHTML = eBerichttekst.innerHTML.substring(0, 15) + " ...";
            }
            ePartner.id = "partner" + partnerProfiel.id;
            ePartner.className = "gesprekspartner";
            eImg.src = rootImg + partnerProfiel.foto;
            eImg.alt = partnerProfiel.nickname;
            eImg.title = partnerProfiel.nickname;
            ePartner.appendChild(eImg);
            ePartner.appendChild(eNickname);
            ePartner.appendChild(eBerichttekst);
            ePartner.appendChild(eNieuwbericht);
            ePartner.appendChild(eNieuwberichtBtn);

            ePartnerList.appendChild(ePartner);

            
            if (sessionStorage.nieuwId && partnerProfiel.id == sessionStorage.nieuwId){
                console.log("nieuwId:")
                console.log(sessionStorage.nieuwId);
                document.getElementById('input' + sessionStorage.nieuwId).focus();
                sessionStorage.removeItem('nieuwId');

                let urlBerichten = rooturl + '/bericht/read.php?profielId=' + userId;
                fetch(urlBerichten)
                    .then(function (resp) { return resp.json(); })
                    .then(function (msgs) {
                        //plaats rode border rond actief partnerprofiel
                        ePartner.style.borderWidth = "1px";
                        ePartner.style.border = "solid";
                        ePartner.style.borderColor = "red";

                        //maak berichtenlijst
                        fnBerichtenLijst(msgs, partnerProfiel, userId);
                    })
                    .catch(function (error) { console.log(error); });
            }
            else{

            }
            eNieuwberichtBtn.addEventListener("click", function (e){
                fnNieuwBericht(partnerProfiel);
            });
            
            document.getElementById('input' + partner).addEventListener('keyup', function(event){
                if (event.keyCode === 13){
                    fnNieuwBericht(partnerProfiel);
                }
            })

            //eventlistener per foto
            ePartner.addEventListener("click", function (e) {

                //verwijder border van alle aangeklikte gesprekspartners
                var eAllePartners = document.getElementsByClassName('gesprekspartner');
                //console.log(eAllePartners.length);
                //console.log(eAllePartners);
                for (var i = 0; i < eAllePartners.length; i++) {
                    eAllePartners[i].style.borderWidth = "";
                    eAllePartners[i].style.border = "";
                    eAllePartners[i].style.borderColor = "";
                }
                //geef alle berichten van ingelogde user
                let urlBerichten = rooturl + '/bericht/read.php?profielId=' + userId;
                fetch(urlBerichten)
                    .then(function (resp) { return resp.json(); })
                    .then(function (msgs) {
                        //console.log(msgs);

                        //plaats rode border rond actief partnerprofiel
                        ePartner.style.borderWidth = "1px";
                        ePartner.style.border = "solid";
                        ePartner.style.borderColor = "red";

                        console.log(msgs);
                        console.log(partnerProfiel);
                        console.log(userId);

                        //maak berichtenlijst
                        fnBerichtenLijst(msgs, partnerProfiel, userId);
                    })
                    .catch(function (error) { console.log(error); });
            });
        })
        .catch(function (error) { console.log(error); });
}

//nieuwbericht
function fnNieuwePartner(){
    addChatPartner(sessionStorage.nieuwId, sessionStorage.id);
    //console.log(document.getElementById('input' + sessionStorage.nieuwId));
    //document.getElementById('input' + sessionStorage.nieuwId).focus();
    //sessionStorage.removeItem('nieuwId');
}

function fnNieuwBericht (partnerProfiel){

    let vanId =  sessionStorage.id; 
    let naarId = partnerProfiel.id;
    let bericht = document.getElementById('input' + naarId).value; 

                let url=rooturl+'/bericht/post.php';
                //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
                let data = {
                    vanId:vanId,
                    naarId:naarId,
                    bericht:bericht,
                    status:"verzonden"
                }

                var request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });

                fetch(request)
                    .then( function (resp)  { return resp.json(); })
                    .then( function (data)  { 
                        console.log(data);
                        if (data.message = "Bericht werd aangemaakt."){
                            console.log(document.getElementById('gesprek'));
                            if (document.getElementById('gesprek') == null){

                                console.log("round 1");
                                let urlBerichten = rooturl + '/bericht/read.php?profielId=' + vanId;
                                fetch(urlBerichten)
                                    .then(function (resp) { return resp.json(); })
                                    .then(function (msgs) {
                                        //maak berichtenlijst
                                        fnBerichtenLijst(msgs, partnerProfiel, localStorage.id);
                                        //fnBerichtenLijst(msgs, partnerProfiel, localStorage.id);
                                        var partner = document.getElementById('partner' + naarId);
                                        partner.getElementsByClassName('boodschap')[0].textContent = bericht;
                                        document.getElementById('input' + naarId).value = "";
                                        //fnLijstAanvullen(naarId, bericht);
                                    })
                                    .catch(function (error) { console.log(error); });
                            }
                            else{
                                fnLijstAanvullen(naarId, bericht);
                            }
                            
                        }
                      })
                    .catch(function (error) { console.log(error); });
}

function fnLijstAanvullen(naarId, bericht){
    var eGesprek = document.getElementById('gesprek');
                            var nieuwstebericht = document.createElement('div');
                            nieuwstebericht.classList.add("bericht");
                            nieuwstebericht.classList.add("verzondenbericht");
                            nieuwstebericht.style.backgroundColor = "gainsboro";

                            var eName = document.createElement('p');
                            eName.className = "nicknameBoodschap";
                            eName.textContent = localStorage.nickname;

                            var eBoodschap = document.createElement('p');
                            eBoodschap.className = "boodschap";
                            eBoodschap.textContent = bericht;

                            nieuwstebericht.appendChild(eName);
                            nieuwstebericht.appendChild(eBoodschap);

                            eGesprek.append(nieuwstebericht);

                            var partner = document.getElementById('partner' + naarId);
                            partner.getElementsByClassName('boodschap')[0].textContent = bericht;

                            //bericht leegmaken
                            document.getElementById('input' + naarId).value = "";
}

function fnBerichtenLijst(msgs, partnerProfiel, userId){
    var eMain = document.getElementsByTagName('main')[0];
                        var eMain = document.getElementsByTagName('main')[0];
                        var eMsgList = document.getElementById('containerBerichten');
                        eMsgList.innerHTML = "";
                        var eHeading = document.createElement('h2');
                        eHeading.innerHTML = "Berichtengeschiedenis";
                        eMsgList.appendChild(eHeading);
                        var eGesprek = document.createElement('div');
                        for (var i = 0; i < msgs.length; i++) {          //while-lus van maken: zolang vanID of naarID != partnerProfiel.id
                            if (msgs[i][0].vanId == partnerProfiel.id || msgs[i][0].naarId == partnerProfiel.id) {
                                //lus door alle berichten
                                for (var j = 0; j < msgs[i].length; j++) {
                                    var eBericht = document.createElement('div');
                                    eBericht.classList.add("bericht") ;

                                    eBericht.id = "bericht" + (j + 1);

                                    //voeg nickname toe aan bericht
                                    if (msgs[i][j].vanId == userId) {
                                        var eName = document.createElement('p');
                                        eName.innerHTML = localStorage.nickname + ': ';                     //localStorage.setItem('nickname', 'David'); wanneer niet gelinkt aan ingelogde account
                                        eName.className = "nicknameBoodschap";
                                        eBericht.classList.add("verzondenbericht");
                                        eBericht.appendChild(eName);
                                        eBericht.style.backgroundColor = "GainsBoro";
                                    }
                                    else {
                                        var eName = document.createElement('p');
                                        eName.innerHTML = partnerProfiel.nickname + ': ';
                                        eName.className = "nicknameBoodschap";
                                        eBericht.classList.add("ontvangenbericht");
                                        eBericht.appendChild(eName);
                                        eBericht.style.backgroundColor = "PaleGreen";
                                    }

                                    //voeg boodschap toe aan bericht 
                                    var eBoodschap = document.createElement('p');
                                    eBoodschap.innerHTML = msgs[i][j].bericht;
                                    eBoodschap.className = 'boodschap';
                                    eBericht.appendChild(eBoodschap);
                                    eGesprek.appendChild(eBericht);
                                    eGesprek.id = 'gesprek';
                                    eGesprek.className = 'gesprek';
                                }//for
                            }//if
                        }//for
                        eMsgList.appendChild(eGesprek);
                        eMain.appendChild(eMsgList);
                        /*
                    })
                    .catch(function (error) { console.log(error); });
            });
        })
        .catch(function (error) { console.log(error); });
        */
    }