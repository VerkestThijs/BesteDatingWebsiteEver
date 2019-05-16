window.onload = function(){
    let userId = localStorage.id;
    document.getElementById("testInput").value = userId;
}
function fnLogOut(){
    localStorage.removeItem("id");
    window.open("DropDown.html","_self");
}
