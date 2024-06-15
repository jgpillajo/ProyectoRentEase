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
                console.log("**Usuario ya existe**");
                return "**Usuario ya existe**";
            }
        }

        if(!ValidarSoloLetras(user.nombre && user.apellido)){
           
            return "**Los campos Nombre y Apellido solo permite Letras**";
        }


        if(!ValidarEmail(user.correo)){
            alert("**Correo Invalido**");
            return "**El correo no tiene formato**";
        }

        if (!ValidarPassword(user.password)){
            alert("**Contraseña Insegura**");
          return "**La contraseña debe contener una letra mayuscula,una muniscula, un numero y un caracter especial**";
        }
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("**Contraseña Segura - Usuario registrado exitosamente**");
      // alert("Usuario registrado exitosamente");
        return "OK";
    }
    else{

        if(!ValidarSoloLetras(user.nombre && user.apellido)){
           
            return "**Los campos Nombre y Apellido solo permite Letras**";
        }

        if(!ValidarEmail(user.correo)){
            alert("**Correo Invalido**");
            return "**El correo no cumple con el formato**";
        }

        if (!ValidarPassword(user.password)) {
            alert("Contraseña Insegura!!");
            return "La contraseña debe contener una letra mayuscula,una muniscula, un numero y un caracter especial. ";
        }
        // La primera vez, no hay usuarios
        var users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Contraseña Segura - Usuario registrado exitosamente");
       // alert("Usuario registrado exitosamente!!!");
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
            return "Usuario/Clave no existen";
        }
    }
    else{
        return "No hay usuarios registrados";
    }
}

function ValidarSoloLetras() {
   
    const nombre = document.getElementById("Nombre").value;
    const apellido = document.getElementById("Apellido").value;

    const patronLetra = /^[A-Za-z\s]+$/;
    
    const tieneFormatoNombre = patronLetra.test(nombre);
    const tieneFormatoApellido = patronLetra.test(apellido);

     

    if (tieneFormatoNombre && tieneFormatoApellido) {
      
        return true;
     } else {
       
        return false;
    }
    }


function ValidarPassword() {
    // Obtener el valor de la contraseña desde el campo de entrada
    const password = document.getElementById("Clave").value;
    
    // Definir los caracteres especiales, números, letras mayúsculas y letras minúsculas
    const patronCaracterEspecial = /[!"#$%&'()*+,-./:;<=>?@_`{|}~]/;
    const patronNumeros = /\d/;
    const patroMayus = /[A-Z]/;
    const patronMinus = /[a-z]/;

    // Verificar si la contraseña contiene al menos un carácter especial, un número, una letra mayúscula y una letra minúscula
    const tieneCaracterEspecial = patronCaracterEspecial.test(password);
    const tieneNumero = patronNumeros .test(password);
    const tieneMayus= patroMayus.test(password);
    const tieneMinus = patronMinus.test(password);

    if (tieneCaracterEspecial && tieneNumero && tieneMayus && tieneMinus) {
    
        return true;
       
    } 
    else {
     
        return false;

    }
}
function ValidarEmail() {
    const correo = document.getElementById("Correo").value;
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tieneFormatoCorreo = patronCorreo.test(correo);

    if (tieneFormatoCorreo) {
      //  alert("email formato correcto");
        return true;
    } 
    else {
       // alert("email formato incorrecto");
        return false;
    }
}