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
        if (messages[i][0].benIkZender == "1") 
        {
            partners.push([messages[i][0].naarId, messages[i][messages[i].length-1].bericht]);
        }
        else {
            partners.push([messages[i][0].vanId, messages[i][messages[i].length-1].bericht]);
        } 
    }
    console.log(partners);

    //maak chatpartnerprofielen aan
    for (var j = 0; j < partners.length; j++) {
        addChatPartner(partners[j], userId);
    }
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
            var eImg = document.createElement('img');
            var eNickname = document.createElement('p');
            eNickname.innerHTML = partnerProfiel.nickname;
            eNickname.className = "nicknameGesprekspartner";
            var eBerichttekst = document.createElement('p');
            eBerichttekst.innerHTML = partner[1];
            eBerichttekst.className = "boodschap";
            if (eBerichttekst.innerHTML.length > 15) 
            {
                eBerichttekst.innerHTML = eBerichttekst.innerHTML.substring(0,15) + " ...";
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

                //verwijder borders van alle gesprekspartners
                var eAllePartners = document.getElementsByClassName('gesprekspartner');
                console.log(eAllePartners.length);
                console.log(eAllePartners);
                for (var i = 0; i < eAllePartners.length; i++) {
                    eAllePartners[i].style.borderWidth = "";
                    eAllePartners[i].style.border = "";
                    eAllePartners[i].style.borderColor = "";
                }  

                //alle berichten van de ingelogde user
                let urlBerichten = rooturl + '/bericht/read.php?profielId=' + userId;
                fetch(urlBerichten)
                    .then(function (resp) { return resp.json(); })
                    .then(function (msgs) {
                        console.log(msgs);
                        console.log(userId);
                        
                        //plaats rode border rond aangeklikte gesprekspartner
                        ePartner.style.borderWidth = "1px";
                        ePartner.style.border = "solid";
                        ePartner.style.borderColor = "red";
                        
                        var eMain = document.getElementsByTagName('main')[0];
                        var eMsgList = document.getElementById('containerBerichten');
                        eMsgList.innerHTML = "";
                        var eHeading = document.createElement('h2');
                        eHeading.innerHTML = "Berichtengeschiedenis";
                        eMsgList.appendChild(eHeading);
                        var eGesprek = document.createElement('div');
                        for (var i = 0; i < msgs.length; i++) {          //while-lus van maken: zolang vanID of naarID != partnerProfiel.id
                            if (msgs[i][0].vanId == partnerProfiel.id || msgs[i][0].naarId == partnerProfiel.id ) {
                                console.log(msgs[i][0].vanId, msgs[i][0].naarId, userId);
                                console.log(i);
                                for (var j = 0; j < msgs[i].length; j++) { 
                                    var eBericht = document.createElement('div');
                                    eBericht.className = "bericht";
                                    eBericht.id = "bericht" + (j+1);
                                    console.log(msgs[i].length);

                                    if (msgs[i][j].vanId == userId) {
                                        console.log(userId);
                                        var eName = document.createElement('p');
                                        ////////////////waarde wordt niet doorgegeven/////////////////
                                        /*
                                        var sUserName = fetchProfile(userId);
                                        console.log(sUserName);
                                        */
                                        eName.innerHTML = fetchProfile(userId) + ': ';
                                        console.log(fetchProfile(userId));
                                        eName.className = "nicknameBoodschap";
                                        eBericht.appendChild(eName);
                                    }
                                    else {
                                        var eName = document.createElement('p');
                                        eName.innerHTML = partnerProfiel.nickname + ': ';
                                        eName.className = "nicknameBoodschap";
                                        eBericht.appendChild(eName);
                                    }
                                    var eBoodschap = document.createElement('p');
                                    eBoodschap.innerHTML = msgs[i][j].bericht;
                                    eBoodschap.className = 'boodschap';
                                    eBericht.appendChild(eBoodschap);
                                    eGesprek.appendChild(eBericht);
                                    eGesprek.id = 'gesprek';
                                    eGesprek.className = 'gesprek';

                                    if (j % 2 == 0) {
                                        eBericht.style.backgroundColor = "GainsBoro";
                                    }
                                    else {
                                        eBericht.style.backgroundColor = "PaleGreen";
                                    }
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

function fetchProfile(userId) {
        let url = rooturl + '/profiel/read_one.php?id=' + userId;  
        fetch(url)
            .then(function (resp) { return resp.json(); })
            .then(function (profiel) {
                console.log(profiel.nickname);
                return profiel.nickname;
            })
            .catch(function (error) { console.log(error); });
}