const validarLogin = function () {
  let idLogin = ['username', 'password'];
  let parrafos = ['p1', 'p2'];

  if (!validarCamposVacios(idLogin, parrafos)) {
    return;
  }

  let user = document.getElementById('username').value;
  let pass = document.getElementById('password').value;

  let userObject = {
    username: user.toLowerCase(),
    password: pass,
  };

  if (autenticarUsuario(userObject) === 'Credenciales correctas') {
    usuarioEnSesion(user);
    document.location.href = 'Home.html';
    alert("Bienvenido");
  } else {
    document.getElementById('username').classList.remove('inputs');
    document.getElementById('username').classList.add('inputs-vacio');
    document.getElementById('password').classList.remove('inputs');
    document.getElementById('password').classList.add('inputs-vacio');
    document.getElementById('login-email-pass').classList.remove('no-display');
  }
};

const validarRegister = function () {
  let idRegister = ['nombre', 'apellido', 'fecha', 'correo', 'clave'];
  let parrafos2 = ['p1', 'p2', 'p3', 'p4', 'p5'];

  if (!validarCamposVacios(idRegister, parrafos2)) {
    return;
  }

  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let fecha = document.getElementById('fecha').valueAsNumber;
  let correo = document.getElementById('correo').value;
  let clave = document.getElementById('clave').value;

  let fechaActual = new Date();
  if (fechaActual - fecha >= 567648000000) {
    document.getElementById('fecha').classList.add('inputs');
    document.getElementById('fecha').classList.remove('inputs-vacio');
    document.getElementById('fecha-validacion').classList.add('no-display');
  } else {
    document.getElementById('fecha').classList.remove('inputs');
    document.getElementById('fecha').classList.add('inputs-vacio');
    document.getElementById('fecha-validacion').classList.remove('no-display');
    return;
  }

  let userRegister = {
    nombre: nombre,
    apellido: apellido,
    fecha: fecha,
    correo: correo.toLowerCase(),
    clave: clave,
  };

  if (claveValidacion().indexOf(false) === -1) {
  } else {
    return;
  }

  if (registrarUsuario(userRegister) === 'Registro exitoso') {
    document.location.href = 'Login.html';
  } else if (registrarUsuario(userRegister) === 'Correo ya registrado') {
    document.getElementById('correo').classList.remove('inputs');
    document.getElementById('correo').classList.add('inputs-vacio');
    document.getElementById('contenedor-correo').classList.remove('no-display');
  } else {
    document.getElementById('correo').classList.add('inputs');
    document.getElementById('correo').classList.remove('inputs-vacio');
    document.getElementById('contenedor-correo').classList.add('no-display');
  }
};

const validarCamposVacios = function (ids, parraf) {
  let verificar = true;
  let verificar1 = true;

  for (let i = 0; i < ids.length; i++) {
    if (document.getElementById(ids[i]).value == '') {
      document.getElementById(ids[i]).classList.remove('inputs');
      document.getElementById(ids[i]).classList.add('inputs-vacio');
      document.getElementById(parraf[i]).classList.remove('no-display');
      verificar = false;
    } else {
      document.getElementById(ids[i]).classList.add('inputs');
      document.getElementById(ids[i]).classList.remove('inputs-vacio');
      document.getElementById(parraf[i]).classList.add('no-display');
      verificar1 = true;
    }
  }
  if (verificar == true && verificar1 == true) {
    return true;
  } else {
    return false;
  }
};

const registrarUsuario = function (userRegister) {
  let usuariosArray = [];
  let usuarioStorage = JSON.parse(localStorage.getItem('usuariosGuardados'));
  if (!usuarioStorage && ValidarEmail()=== true) {
    usuariosArray.push(userRegister);
    localStorage.setItem('usuariosGuardados', JSON.stringify(usuariosArray));
    return 'Registro exitoso';
  } else {
    for (let item of usuarioStorage) {
      if (userRegister.correo === item.correo) {
        return 'Correo ya registrado';
      }
    }
    usuarioStorage.push(userRegister);
    localStorage.setItem('usuariosGuardados', JSON.stringify(usuarioStorage));
    return 'Registro exitoso';
  }
};

const claveValidacion = function () {
  let claveDigi = document.getElementById('clave').value;
  let caracterSpecRegex = /([!@#$%^&*])/gm;
  let numeroRegex = /([0-9])/gm;
  let caracteres8 = document.querySelectorAll('span');
  let verificador = [];
  for (let i = 0; i < claveDigi.length; i++) {
    if (claveDigi.length < 8) {
      caracteres8[0].classList.add('validar-clave');
      verificador.push(false);
    } else {
      caracteres8[0].classList.remove('validar-clave');
      verificador.push(true);
    }
  }
  if (!regexValid(claveDigi, caracterSpecRegex)) {
    caracteres8[1].classList.add('validar-clave');
    verificador.push(false);
  } else {
    caracteres8[1].classList.remove('validar-clave');
    verificador.push(true);
  }

  if (!regexValid(claveDigi, numeroRegex)) {
    caracteres8[2].classList.add('validar-clave');
    verificador.push(false);
  } else {
    caracteres8[2].classList.remove('validar-clave');
    verificador.push(true);
  }
  return verificador;
};

const regexValid = (input, regex) => {
  let resultado = regex.test(input);
  return resultado;
};

//! LOGIN

const autenticarUsuario = userLogin => {
  let usuarioStorage = JSON.parse(localStorage.getItem('usuariosGuardados'));
  console.log(usuarioStorage);
  if (usuarioStorage === null) {
    return;
  }
  for (let i = 0; i < usuarioStorage.length; i++) {
    if (
      usuarioStorage[i].correo === userLogin.username &&
      usuarioStorage[i].clave === userLogin.password
    ) {
      return 'Credenciales correctas';
    }
  }
};

const usuarioEnSesion = useractual => {
  let usuarioLogged = useractual;
  localStorage.setItem('usuarioLogeado',useractual);
  console.log("usuario guardado en usuarioLogueado")
  return;
};

//! Solo con inicio de sesión se puede ver las páginas

const sesionActual = () => {
  const validarSesionActual = () => {
    document.location.href = 'Login.html';
  };
  if (
    !JSON.parse(localStorage.getItem('usuarioLogueado')) ||
    JSON.parse(localStorage.getItem('usuarioLogueado')) === ''
  ) {
    alert('Inicia sesión para poder ver la página');
    setTimeout(validarSesionActual, 1300);
  } else {
    return;
  }
};

//! Provincias Ec

let provincias = [
  'Azuay',
  'Bolívar',
  'Cañar',
  'Carchi',
  'Chimborazo',
  'Cotopaxi',
  'El Oro',
  'Esmeraldas',
  'Galápagos',
  'Guayas',
  'Imbabura',
  'Loja',
  'Los Ríos',
  'Manabí',
  'Morona-Santiago',
  'Napo',
  'Orellana',
  'Pastaza',
  'Pichincha',
  'Santa Elena',
  'Santo Domingo de los Tsáchilas',
  'Sucumbíos',
  'Tungurahua',
  'Zamora-Chinchipe',
];

let provinciasValue = [
  'Azuay',
  'Bolivar',
  'Canar',
  'Carchi',
  'Chimborazo',
  'Cotopaxi',
  'El Oro',
  'Esmeraldas',
  'Galapagos',
  'Guayas',
  'Imbabura',
  'Loja',
  'Los Rios',
  'Manabi',
  'Morona-Santiago',
  'Napo',
  'Orellana',
  'Pastaza',
  'Pichincha',
  'Santa Elena',
  'Santo Domingo de los Tsachilas',
  'Sucumbios',
  'Tungurahua',
  'Zamora-Chinchipe',
];

let idProvincias = document.getElementById('provincia');

for (let [index, value] of provincias.entries()) {
  let option = document.createElement('option');
  option.value = `${provinciasValue[index]}`;
  let provinciaText = `${value} `;
  option.innerHTML = provinciaText;
 // idProvincias.appendChild(option);
}

//! New Flat

const registratNewFlat = newFlat => {
  let flatStorage = JSON.parse(localStorage.getItem('flatStorage'));
  if (!flatStorage) {
    let flatArray = [];
    flatArray.push(newFlat);
    localStorage.setItem('flatStorage', JSON.stringify(flatArray));
  }
};

const validarNewFLat = () => {
  let idFlat = [
    'provincia',
    'ciudad',
    'direccion',
    'numeracion',
    'area',
    'aire',
    'construccion',
    'precio',
    'disponibilidad',
  ];
  let parrafos = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'];
     if (!validarCamposVacios(idFlat, parrafos)) {
    return;
  } 
  let provincia = document.getElementById('provincia').value;
  let ciudad = document.getElementById('ciudad').value;
  let direccion = document.getElementById('direccion').value;
  let numeracion = document.getElementById('numeracion').value;
  let area = document.getElementById('area').value;
  let aire = document.getElementById('aire').value;
  let construccion = document.getElementById('construccion').value;
  let precio = document.getElementById('precio').value;
  let disponibilidad = document.getElementById('disponibilidad').value;

  let flatObject = {
    provincia: provincia,
    ciudad: ciudad,
    direccion: direccion,
    numeracion: numeracion,
    area: area,
    aire: aire,
    construccion: construccion,
    precio: precio,
    disponibilidad: disponibilidad,
  };

  registratNewFlat(flatObject);
};

function ValidarSoloLetras() {
   
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;

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
  const password = document.getElementById("clave").value;
  
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
    alert("**Password Seguro**");
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


function buscarNombre() {
  // Obtener el correo del campo de entrada
  const correoBuscar = document.getElementById('username').value;

  // Recuperar el array de datos de localStorage y parsear el JSON
  const datosJSON = localStorage.getItem('usuariosGuardados');
  const datos = datosJSON ? JSON.parse(datosJSON) : [];

  // Buscar el usuario por correo
  const usuarioEncontrado = datos.find(usuario => usuario.correo === correoBuscar);

  // Mostrar el nombre del usuario si se encuentra
  if (usuarioEncontrado) {
    const nombre = usuarioEncontrado.nombre;
      document.getElementById('resultadoNombre').textContent = `Nombre: ${usuarioEncontrado.nombre}`;
      localStorage.setItem('NombreLogueado',nombre);

  } else {
      document.getElementById('resultadoNombre').textContent = 'Usuario no encontrado';
  }
}

function cerrarSesion(){
            localStorage.removeItem('NombreLogueado');
            localStorage.removeItem('usuarioLogeado');
         //  localStorage.removeItem('flatsFavoritos');
            document.location.href = 'Login.html';
            alert('**Cerrando Sesion**');   
}