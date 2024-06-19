var RegistrarFlat = function(flat){
    var flats = JSON.parse(localStorage.getItem('flats')); 
    if(flats){
     if(!ValidarSoloLetras(flat.ciudad)){
            return "**El campo ciudad solo permite Letras**";
        }
        if(!ValidarSoloNumeros(flat.numeroCalle && flat.area && flat.anio && flat.renta)){
             return "**El campo Numeracion domiciliaria, Area, Año y Precio solo permite Numeros**";
         }
        console.log("Registro FLAT")
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
       //localStorage.setItem('flatsFavoritos', JSON.stringify(flats));
        return "OK";
    }
     else{
         if(!ValidarSoloNumeros(flat.numeroCalle && flat.area && flat.anio && flat.renta)){
            return "**El campo Numeracion domiciliaria, Area, Año y Precio solo permite Numeros**";
         }
        if(!ValidarSoloLetras(flat.ciudad)){
            return "**El campo ciudad solo permite Letras**";
        }  
        var flats = [];
        flats.push(flat);
        localStorage.setItem('flats', JSON.stringify(flats));
       // localStorage.setItem('flatsFavoritos', JSON.stringify(flats));
        console.log("Registro flat por primera vez")
        return "OK";
    } 
}

function ValidarSoloLetras() {
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