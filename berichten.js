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
        .catch(function (error) { console.log(error); });
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

    //voeg chatpartnerprofielen toe
    for (var j = 0; j < partners.length; j++) {
        addChatPartner(partners[j], userId);                                          
    }
}

function addChatPartner(partner, userId) {
    let url = rooturl + '/profiel/read_one.php?id=' + partner[0];
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
            eBerichttekst.innerHTML = partner[1];
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
            ePartnerList.appendChild(ePartner);

            //eventlistener per foto
            ePartner.addEventListener("click", function (e) {

                //verwijder border van alle aangeklikte gesprekspartners
                var eAllePartners = document.getElementsByClassName('gesprekspartner');
                console.log(eAllePartners.length);
                console.log(eAllePartners);
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

                        //plaats rode border rond actief partnerprofiel
                        ePartner.style.borderWidth = "1px";
                        ePartner.style.border = "solid";
                        ePartner.style.borderColor = "red";

                        //maak berichtenlijst
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
                                    eBericht.className = "bericht";
                                    eBericht.id = "bericht" + (j + 1);

                                    //voeg nickname toe aan bericht
                                    if (msgs[i][j].vanId == userId) {
                                        var eName = document.createElement('p');
                                        eName.innerHTML = localStorage.nickname + ': ';                     //localStorage.setItem('nickname', 'David'); wanneer niet gelinkt aan ingelogde account
                                        eName.className = "nicknameBoodschap";
                                        eBericht.appendChild(eName);
                                        eBericht.style.backgroundColor = "GainsBoro";
                                    }
                                    else {
                                        var eName = document.createElement('p');
                                        eName.innerHTML = partnerProfiel.nickname + ': ';
                                        eName.className = "nicknameBoodschap";
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
                                }
                            }
                        }
                        eMsgList.appendChild(eGesprek);
                        eMain.appendChild(eMsgList);
                    })
                    .catch(function (error) { console.log(error); });
            });
        })
        .catch(function (error) { console.log(error); });
}