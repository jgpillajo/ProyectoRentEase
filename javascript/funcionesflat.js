var RegistrarFlat = function(flat){
    var flats = JSON.parse(localStorage.getItem('flats')); // Etiqueta (nombre de variable)
    if(flats){
        for(var i = 0; i < flats.length; i++){
            var temporal = flats[i];
            let {streetnumber}=temporal;
            if(flat.streetnumber == streetnumber){
                // break
                return "Ya existe un inmueble registrado con la misma numeracion domiciliaria";
            }
        }

        if(!ValidarSoloLetras(flat.ciudad== false)){
           // alert("Ciudad Invalida");
            return "Campos Ciudad con formato incorrecto";
        }
        // El usuario nunca existio dentor FOR
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
        return "OK";
    }
    else{

        if(!ValidarSoloLetras(flat.ciudad== false)){
            alert("Ciudad Invalida");
            return "Ciudad con formato incorrecto";
        }
        // La primera vez, no hay usuarios
        var flats = [];
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
        return "OK";
    } 
}

function ValidarSoloLetras() {
    const ciudad = document.getElementById("Ciudad").value;
    const patronCiudad = /^[A-Za-z\s]+$/;
    const tieneFormatoCiudad = patronCiudad.test(ciudad);

    if (tieneFormatoCiudad) {
       // alert("Ciudad formato correcto!!");
        return true;
    } 
    else {
       // alert("Ciudad formato incorrecto");
        return false;
    }
}