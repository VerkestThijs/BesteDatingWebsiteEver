var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)


    window.onload = function () {

        

        document.getElementById("Deleteknop").addEventListener("click", Delete);








    }

    function Delete(){


        var userid = sessionStorage.id;

        

        let url = rooturl + '/profiel/delete.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            id: userid
        }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });

            console.log(userid)

    }
}


