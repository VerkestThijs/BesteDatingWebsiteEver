var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {
    HaalProfielOp();
   document.getElementById("AantalCoins").addEventListener("change", BepaalPrijs);


}


async function HaalProfielOp() {
    let ProfielId = sessionStorage.id;
    let url = rooturl + '/profiel/read_one.php?id=' + ProfielId;


    //  fetch(url)
    //     .then(function (resp) { return resp.json(); })
    //     .then(function (userGegevens) {
    //         console.log(userGegevens);
            
    //     })
    //     .catch(function (error) { console.log(error); });




        const response = await fetch(url);
        const jsonobj = await response.json();    
        
        return jsonobj



        



        

}
console.log(this.HaalProfielOp().then((lovecoins) => {BepaalPrijs(lovecoins)}))
function BepaalPrijs(data) {
   
   

    let elements = document.getElementById("resultaatdiv");
    elements.innerHTML="";


    let prijs = 1;
    let coins = document.getElementById("AantalCoins").value
    
    let para = document.createElement("p"); 
    para.innerHTML = "u betaalt " + (coins * prijs) + " euro";
    elements.appendChild(para);

    let lovecoins= parseInt(data.lovecoins + coins)

    console.log(lovecoins);
    
    

    

    
    

    //console.log(arrdata.lovecoins);
    
   

    
    
}