var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function fnBlindDate(){
var url = rooturl + '/profiel/search.php?';
                    if (document.getElementById('geslacht').value != "") {
                        url += 'sexe=' + document.getElementById('geslacht').value ;
                    }
                    fetch(url)
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) {
                            console.log(data.length);
                            let amount = data.length;
                            let BlindId = Math.floor(Math.random() * amount);
                            console.log(data[BlindId]);
                            let BlindDate = data[BlindId];

                            let lijst = document.getElementById("lijst");
                            while (lijst.childElementCount != 0){
                                lijst.removeChild(lijst.firstChild);
                            }
                                let item = document.createElement('a');
                                item.innerHTML = BlindDate.nickname;
                                sessionStorage.partnerId = BlindDate.id;

                                item.addEventListener('click', function(e){
                                    window.open('berichten.html', '_self');
                                    
                                })

                                lijst.appendChild(item);
                                
                        })
                        .catch(function (error) { console.log(error); });
            }