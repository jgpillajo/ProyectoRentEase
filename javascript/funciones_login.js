const validarLogin = function () {
  let idLogin = ['username', 'password'];
  let parrafos = ['p1', 'p2'];

  if (!validarCamposVacios(idLogin, parrafos)) {
    return;
  }

  let user = document.getElementById('username').value;
  let pass = document.getElementById('password').value;

  let userObject = {
    username: user,
    password: pass,
  };

  autenticarUsuario();
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

const autenticarUsuario = function () {};

const registrarUsuario = function (userRegister) {
  let usuariosArray = [];
  let usuarioStorage = JSON.parse(localStorage.getItem('usuariosGuardados'));
  if (!usuarioStorage) {
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
  let claveArray = claveDigi.split('');
  console.log(claveArray);
  let caracteres8 = document.querySelectorAll('span');
  for (let i = 0; i < claveDigi.length; i++) {
    if (claveDigi.length < 8) {
      caracteres8[0].classList.add('validar-clave');
    } else {
      caracteres8[0].classList.remove('validar-clave');
    }
  }
  if (!claveRegex(claveDigi)) {
    caracteres8[1].classList.add('validar-clave');
  } else {
    caracteres8[1].classList.remove('validar-clave');
  }

  if (!numeroRegex(claveDigi)) {
    caracteres8[2].classList.add('validar-clave');
  } else {
    caracteres8[2].classList.remove('validar-clave');
  }
};

const claveRegex = function (input) {
  let caracterSpec = /([!@#$%^&*])/gm;
  let resultado = caracterSpec.test(input);
  return resultado;
};

const numeroRegex = input => {
  let numeroRegex = /([0-9])/gm;
  let resultado = numeroRegex.test(input);
  return resultado;
};
