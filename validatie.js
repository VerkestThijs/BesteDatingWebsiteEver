function validatie(Naam,Familienaam,Email,Nickname,Foto,Beroep,Haarkleur,Oogkleur,wachtwoord){
    if ( Naam==""  || Familienaam =="" || Email=="" || Nickname=="" || Foto==""|| Beroep=="" 
    || Haarkleur =="" ||  Oogkleur =="" || wachtwoord ==" ") {
        return false
    }
    else {
        return true
    }

}