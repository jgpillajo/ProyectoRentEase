var RegistrarUsuario = function(user){

    var users = JSON.parse(localStorage.getItem('users'));

    console.log('users: ' + users);
    if(users){
        console.log('user: ' + users.length);
        for(var i = 0; i < users.length; i++){
            var temporal = users[i];
            console.log('username: ' + temporal.username);
            if(user.username == temporal.username){
                // break
                return "Usuario ya existe";
            }
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return "OK";
    }
    else{
        // La primera vez, no hay usuarios
        var users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return "OK";
    }   
}
var AutenticarUsuario = function(user){
    var users = JSON.parse(localStorage.getItem('users'));
    console.log('users: ' + users);
    if(users){
        let ExisteUsuario = false;
        for(var i = 0; i < users.length; i++){
            var temporal = users[i];
            if(user.username == temporal.username){
                ExisteUsuario = true;
                if(user.password == temporal.password){
                    return "OK";
                }
                else{
                    return "Credenciales invalidas";
                }
            }
        }
        if(ExisteUsuario == false){
            return "Usuario no encontrado";
        }
        else{
            return "Usuario/Clave no fueron registrados";
        }
    }
    else{
        return "No existen usuarios registrados";
    }

    //function ValidarPassword(password){
      //  let miarray=[...password];
        //if(miarray.includes('.')&& miarray.includes('#'))
   // }
}