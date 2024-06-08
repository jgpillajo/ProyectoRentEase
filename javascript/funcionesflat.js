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


        if(!ValidarSoloLetrasCiudad(flat.ciudad)){
           
            return "**El campo ciudad solo permite Letras**";
        }

        if(!ValidarSoloNumeros(flat.numeroCalle && flat.area && flat.anio && flat.renta)){
           
             return "**El campo Numeracion domiciliaria, Area, Año y Precio solo permite Numeros**";
         }
        // El usuario nunca existio dentor FOR
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
        return "OK";
    }
    else{

        if(!ValidarSoloNumeros(flat.numeroCalle && flat.area && flat.anio && flat.renta)){
          
             return "**El campo Numeracion domiciliaria, Area, Año y Precio solo permite Numeros**";
         }

        if(!ValidarSoloLetrasCiudad(flat.ciudad)){
          
            return "**El campo ciudad solo permite Letras**";
        }
        // La primera vez, no hay usuarios
        var flats = [];
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
        return "OK";
    } 
}

function ValidarSoloLetrasCiudad() {
    const ciudad = document.getElementById("Ciudad").value;

    const patronLetra = /^[A-Za-z\s]+$/;
    
    const tieneFormatoCiudad = patronLetra.test(ciudad);
     

    if (tieneFormatoCiudad) {
      
        return true;
     } else {
       
        return false;
    }
    }

function ValidarSoloNumeros() {

    const numeroCalle = document.getElementById("NumeracionBien").value;
    const area = document.getElementById("Area").value;
    const anio=document.getElementById("Anio").value;
    const renta=document.getElementById("Precio").value;

    const patronNumeros = /^\d+$/;


    const tieneFormatoStreetNumber = patronNumeros.test(numeroCalle);
    const tieneFormatoSize= patronNumeros.test(area);
    const tieneFormatoYear = patronNumeros.test(anio);
    const tieneFormatoRenta = patronNumeros.test(renta);

    if (tieneFormatoStreetNumber && tieneFormatoSize && tieneFormatoYear && tieneFormatoRenta) {
       
        return true;
    } else {
      
        return false;
    }
}