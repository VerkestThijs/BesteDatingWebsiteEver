var rooturl = "https://scrumserver.tenobe.org/scrum/api";

        function changeURL(sNewRoot) {
            rooturl = sNewRoot;
            console.log('root set to : ' + rooturl)
        }

        window.onload = function () {
            document.getElementById('zoek').addEventListener('click', function (e) {
                var url = rooturl + '/profiel/search.php?';
                //VALIDATIE GEGEVENS
                if (validatie() == true) {
                    if (document.getElementById('nickname').value != "") {
                        url += 'nickname=' + document.getElementById('nickname').value + '&';
                    }
                    if (document.getElementById('beroep').value != "") {
                        url += 'beroep=' + document.getElementById('beroep').value + '&';
                    }
                    if (document.getElementById('geslacht').value != "") {
                        url += 'sexe=' + document.getElementById('geslacht').value + '&';
                    }
                    if (document.getElementById('haarkleur').value != "") {
                        url += 'haarkleur=' + document.getElementById('haarkleur').value;
                    }
                    fetch(url)
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) {
                            let test = [data]
                            let lijst = document.getElementById("lijst");
                            console.log(data);
                            for (let i = 0; i < data.length; i++) {
                                test[i] = data[i]
                                //console.log(test[i].voornaam + test[i].familienaam)
                                let item = document.createElement('li');
                                item.innerHTML = test[i].voornaam + ' ' + test[i].familienaam
                                lijst.appendChild(item);
                            }
                        })
                        .catch(function (error) { console.log(error); });

                    //resetten formulier
                    var eLijst = document.getElementById('zoekform');
                    eLijst.reset();

                }; //einde IF    
            }); // einde click

        } // einde window onload

        function validatie() {
            let grootte = document.getElementById('grootte').value
            let  gewicht = document.getElementById('gewicht').value


            if ((isNaN(grootte) || grootte <= 0 || grootte >= 250) && grootte != "") {
                alert('Geef een geldige grootte');
                return false
            };
            if ((isNaN(gewicht) || gewicht <= 0 || gewicht >= 600) && gewicht != "") {
                alert('Geef een geldig gewicht');
                return false
            };

            return true;
        }; //einde validatiefunctie