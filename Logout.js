window.onload = function(){
    let userId = sessionStorage.id;
    document.getElementById("testInput").value = userId;
}
function fnLogOut(){
    sessionStorage.clear();
    window.open("DropDown.html","_self");
}
