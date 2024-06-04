var RegistrarFlat = function(flat){
    var flats = JSON.parse(localStorage.getItem('flats')); // Etiqueta (nombre de variable)
    if(flats){
        for(var i = 0; i < flats.length; i++){
            var temporal = flats[i];
            if(user.username == temporal.username){
                // break
                return "Usuario ya existe";
            }
        }
        // El usuario nunca existio dentor FOR
        users.push(user);
        localStorage.setItem('flats', JSON.stringify(users));
        return "OK";
    }
    else{
        // La primera vez, no hay usuarios
        var flats = [];
        users.push(user);
        localStorage.setItem('flats', JSON.stringify(users));
        return "OK";
    } 
}