
var rooturl = "https://scrumserver.tenobe.org/scrum/api";
var chatPartners = [];
var chatMessages = {};


window.onload = function () {
    let profielId = 2;
    let urlBerichten = rooturl + '/bericht/read.php?profielId=' + profielId;

    //get chatpartners
    fetch(urlBerichten)
        .then(function (resp) { return resp.json(); })
        .then(function (chatMessages) {
            chatPartners = extractChatPartners(chatMessages, profielId);
        })
        .catch(function (error) { console.log(error); });
}

function extractChatPartners(messages, userId) {
    let partners = [];
    //maak lijst van chatpartners + laatste boodschap
    for (var i = 0; i < messages.length; i++) {
        if (messages[i][0].benIkZender == "1") {
            partners.push([messages[i][0].naarId, messages[i][messages[i].length - 1].bericht]);
        }
        else {
            partners.push([messages[i][0].vanId, messages[i][messages[i].length - 1].bericht]);
        }
    }
    console.log(partners);

    //maak chatpartnerprofielen aan
    for (var j = 0; j < partners.length; j++) {
        addChatPartner(partners[j], userId);
    }
    //partners.forEach(partner => { addChatPartner(partner, sImgSource); })
}

function addChatPartner(partner, userId) {
    //per profiel de info fetchen
    let url = rooturl + '/profiel/read_one.php?id=' + partner;
    var rootImg = "https://scrumserver.tenobe.org/scrum/img/";

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (partnerProfiel) {
            //create HTML
            var ePartnerList = document.getElementById('containerGesprekspartners');
            var ePartner = document.createElement('div');
            console.log(userId);
            var eImg = document.createElement('img');
            var eNickname = document.createTextNode(partnerProfiel.nickname);
            var eBerichttekst = document.createTextNode(partner[1]);  //chatmessages: komen eerste x aantal karakters van bericht
            ePartner.id = "partner" + partner;
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
                //alle berichten van de ingelogde user
                let urlBerichten = rooturl + '/bericht/read.php?profielId=' + userId;
                fetch(urlBerichten)
                    .then(function (resp) { return resp.json(); })
                    .then(function (msgs) {
                        console.log(msgs);
                        var eMsgList = document.getElementById('containerBerichten');
                        var eBericht = document.createElement('div');
                        for (var i = 0; i < msgs.length; i++) {          //while-lus van maken: zolang vanID of naarID != partnerProfiel.id
                            console.log(partnerProfiel.id, userId);                 // waarde = 1 + 2
                            console.log(msgs[i][0].vanId == partnerProfiel.id);     //geeft ook false weer
                            console.log(msgs[i][0].naarId == partnerProfiel.id);    //geeft false weer
                            console.log(msgs[i][0].naarId);                         //waarde = 2
                            console.log(msgs[i][0].vanId);                          //waarde = 4
                            console.log(partnerProfiel.id);                         //waarde = 1
                            if (msgs[i][0].vanId == partnerProfiel.id || msgs[i][0].naarId == partnerProfiel.id) {
                                console.log(msgs[i][0].vanId, msgs[i][0].naarId, userId);
                                for (var j = 0; j < msgs[i][j].length; j++) {
                                    ////////////////gaat niet in deze loop/////////////////
                                    if (msgs[i][j].vanId == userId) {
                                        var eName = document.createTextNode(fetchProfile(userId) + ': ');
                                        eBericht.appendChild(eName);
                                    }
                                    else {

                                        var eName = document.createTextNode(profiel.nickname + ': ');
                                        eBericht.appendChild(eName);
                                    }
                                    var eBoodschap = document.createTextNode(msgs[i][j].bericht);
                                    eBericht.appendChild(eBoodschap);
                                }
                            }
                        }
                        eBericht.id = "bericht" + (i + 1);
                        eBericht.class = "bericht";
                        eMsgList.appendChild(eBericht);
                    })
                    .catch(function (error) { console.log(error); });
            });
        })
        .catch(function (error) { console.log(error); });
}

function fetchProfile(userId) {
    let url = rooturl + '/profiel/read_one.php?id=' + userId;
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (profiel) {
            return profiel.nickname;
        })
        .catch(function (error) { console.log(error); });
}