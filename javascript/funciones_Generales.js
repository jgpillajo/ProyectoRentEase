var DefinirUsuario = function () {
  const usuario = localStorage.getItem('usuarioLogeado');
  if (usuario) {
    document.getElementById('mensaje').innerHTML = ' ' + usuario;
    document.getElementById('resultadoNombre').innerHTML = ' ' + localStorage.getItem('NombreLogueado');
    document.getElementById('usuario').value = usuario;
  } else {
    alert('**No hay usuario Logueado**');
    document.location.href = 'Login.html';
  }
};
// Llamar a la función cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', event => {
  DefinirUsuario();
});
