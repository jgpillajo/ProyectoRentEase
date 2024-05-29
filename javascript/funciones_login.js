var RegistrarUsuario = function(user){
    var users = JSON.parse(localStorage.getItem('users'));
    console.log('users: ' + users);
    if(users){
        console.log('user: ' + users.length);
        for(var i = 0; i < users.length; i++){
            var temporal = users[i];
            let {username}= temporal;
            
            console.log('username: ' + username);
            if(user.username == username){
                // break
                console.log(console.log('users: ' + users));
                console.log("usuario ya existe");
              //  document.location.href = "Login.html";
                return "Usuario ya existe";
            }
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
       alert("Usuario registrado exitosamente ");
       //document.location.href = "Login.html";
        return "OK";
    }
    else{
        // La primera vez, no hay usuarios
        var users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Usuario registrado exitosamente else");
        return "OK";
    }   
}

var AutenticarUsuario = function(userAutenticado){
                                // LLamada por el nombre de a estructura
    var users = JSON.parse(localStorage.getItem('users')); // del string -> Array JSON
    console.log('users: ' + users);
    if(users){
        let ExisteUsuario = false;
        for(var i = 0; i < users.length; i++){
            var temporal = users[i];
            if(userAutenticado.username == temporal.username){
                ExisteUsuario = true;
                if(userAutenticado.password == temporal.password){
                    return "OK";
                }
                else{
                   
                    return "Contraseña Incorrecta";
                }
            }
        }
        if(ExisteUsuario == false){
            return "Usuario no encontrado";
        }
        else{
            return "Usuario/Clave no existen";
        }
    }
    else{
        return "No hay usuarios registrados";
    }
}


function ValidarLogin(){
    var logged = JSON.parse(localStorage.getItem('logged')); // Etiqueta (nombre de variable)
    if(logged){
        return true;
    } else{
        return false;
    }
}
/*
function ValidarPassword() {
    // Get the password value from the input field
    const password = document.getElementById("Clave").value;
    
    // Convert the password string to an array
    let miarray = [...password];
    
    // Check if the password contains '.', '#', or '*'
    if (miarray.includes('!') || miarray.includes('"') || miarray.includes('#')) {
        alert("Password seguro");
        console.log(password);
        return true;
    } else {
        alert("Password no contiene las normas de seguridad");
        return false;
    }
}
*/
function ValidarPassword() {
    // Obtener el valor de la contraseña desde el campo de entrada
    const password = document.getElementById("Clave").value;
    
    // Definir los caracteres especiales, números, letras mayúsculas y letras minúsculas
    const specialCharactersPattern = /[!"#$%&'()*+,-./:;<=>?@_`{|}~]/;
    const numberPattern = /\d/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    // Verificar si la contraseña contiene al menos un carácter especial, un número, una letra mayúscula y una letra minúscula
    const hasSpecialCharacter = specialCharactersPattern.test(password);
    const hasNumber = numberPattern.test(password);
    const hasUppercase = uppercasePattern.test(password);
    const hasLowercase = lowercasePattern.test(password);

    if (hasSpecialCharacter && hasNumber && hasUppercase && hasLowercase) {
        alert("Contraseña Segura");
        console.log(password);
       document.location.href = "Login.html";
        return true;
    } 
    /*
    if(hasSpecialCharacter===' '){
        alert("Contras");
        //document.location.href = "Register.html";
        console.log(password);
        return false;
    }*/
    else {
        alert("Contraseña Insegura");
        console.log(password);
       // document.location.href = "Register.html";
        return false;
    }
}