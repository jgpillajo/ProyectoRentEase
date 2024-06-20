var RegistrarFlat = function (flat) {
  var flats = JSON.parse(localStorage.getItem("flats"));
  if (flats) {
    console.log("Registro FLAT");
    flats.push(flat);
    localStorage.setItem("flats", JSON.stringify(flats));
    //localStorage.setItem('flatsFavoritos', JSON.stringify(flats));
    return "OK";
  } else {
    var flats = [];
    flats.push(flat);
    localStorage.setItem("flats", JSON.stringify(flats));
    // localStorage.setItem('flatsFavoritos', JSON.stringify(flats));
    console.log("Registro flat por primera vez");
    return "OK";
  }
};
