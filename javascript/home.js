let flatStorage = JSON.parse(localStorage.getItem("flats"));

const pushImg = () => {
  for (let i = 0; i < flatStorage.length; i++) {
    flatStorage[i].img = `${i}`;
  }
};

pushImg();

getvalue = (t) => {
  if (t.value === "Ciudad") {
    creadorFlats(OrdenCiudad(flatStorage));
  } else if (t.value === "Precio") {
    creadorFlats(OrdenPrecio(flatStorage));
  } else if (t.value === "Área") {
    creadorFlats(OrdenArea(flatStorage));
  }
};

const OrdenCiudad = (arrayFlats) => {
  return arrayFlats.sort((a, b) => a.city.localeCompare(b.city));
};
const OrdenPrecio = (arrayFlats) => {
  let temp = arrayFlats.sort((a, b) => Number(a.price) - Number(b.price));
  return temp;
};

const OrdenArea = (arrayFlats) => {
  return arrayFlats.sort((a, b) => Number(a.size) - Number(b.size));
};

const ordenPrecio2 = (arrayFlats) => {
  return arrayFlats.sort((a, b) => b.price - a.price);
};

const OrdenArea2 = (arrayFlats) => {
  return arrayFlats.sort((a, b) => b.size - a.size);
};

const removerTodosChildren = () => {
  let remove = document.getElementById("grid-flats");
  remove.replaceChildren();
};

const creadorFlats = (ordenarBoton) => {
  if (ordenarBoton === false || ordenarBoton == "") {
    removerTodosChildren();
    let divGrid2 = document.getElementById("grid-flats");
    let temp = document.createElement("div");
    temp.classList.add("grid-flat-solo");
    temp.innerHTML = `
      <img class="img-flat" src="/img/no_img.jpg" alt="">
      <div class = "contenedor-flat">
      <p class="avenida-flat">No hay información disponible</p>
      <p><span class = "precio">No hay infomración disponible </span></p>
      <p>No hay infomración disponible</p>
      <p>No hay infomración disponible</p>
      <p>No hay infomración disponible</p>
      </div>`;
    divGrid2.appendChild(temp);
    return;
  }
  if (!ordenarBoton) {
    removerTodosChildren();
    let divGrid2 = document.getElementById("grid-flats");
    for (let i = 0; i < flatStorage.length; i++) {
      let temp = document.createElement("div");
      temp.classList.add("grid-flat-solo");
      temp.innerHTML = `
      <img class="img-flat" src="/img/flat${flatStorage[i].img}.webp" alt="">
      <div class = "contenedor-flat">
      <p class="avenida-flat">Av. ${flatStorage[i].streetname} ${flatStorage[i].streetnumber}, ${flatStorage[i].city} </p>
      <p><span class = "precio">${flatStorage[i].price}</span> $/mes</p>
      <p>${flatStorage[i].size} m², aire acondicionado ${flatStorage[i].ac}</p>
      <p>Año de construción: ${flatStorage[i].year}</p>
      <p>Disponible desde: ${flatStorage[i].date}</p>
      </div>`;
      divGrid2.appendChild(temp);
    }
    return;
  }
  removerTodosChildren();
  let divGrid = document.getElementById("grid-flats");
  for (let i = 0; i < ordenarBoton.length; i++) {
    let temp = document.createElement("div");
    temp.classList.add("grid-flat-solo");
    temp.innerHTML = `
      <img class="img-flat" src="/img/flat${ordenarBoton[i].img}.webp" alt="">
      <div class = "contenedor-flat">
      <p class="avenida-flat">Av. ${ordenarBoton[i].streetname} ${ordenarBoton[i].streetnumber}, ${ordenarBoton[i].city} </p>
      <p><span class = "precio">${ordenarBoton[i].price}</span> $/mes</p>
      <p>${ordenarBoton[i].size} m², aire acondicionado ${ordenarBoton[i].ac}</p>
      <p>Año de construción: ${ordenarBoton[i].year}</p>
      <p>Disponible desde: ${ordenarBoton[i].date}</p>
      </div>`;
    divGrid.appendChild(temp);
  }
};
creadorFlats();

const datalistCiudades = () => {
  let ciudades = [];
  let flatOrdenados = OrdenCiudad(flatStorage);
  for (let [index, value] of flatOrdenados.entries()) {
    ciudades.push(`${value.city}`);
  }
  let ciudad = document.getElementById("ciudades");
  for (let [index, value] of ciudades.entries()) {
    let option = document.createElement("option");
    option.value = `${ciudades[index]}`;
    ciudad.appendChild(option);
  }
};

datalistCiudades();

const precioHolder = () => {
  let preciMin = document.getElementById("precio-min");
  let preciMax = document.getElementById("precio-max");
  let temp = OrdenPrecio(flatStorage);
  preciMin.placeholder = `Valor mínimo - ${temp[0].price}`;
  temp = ordenPrecio2(flatStorage);
  preciMax.placeholder = `Valor máximo - ${temp[0].price}`;
};
precioHolder();

const areaHolder = () => {
  let preciMin = document.getElementById("area-min");
  let preciMax = document.getElementById("area-max");
  let temp = OrdenArea(flatStorage);
  preciMin.placeholder = `Valor mínimo - ${temp[0].size}`;
  temp = OrdenArea2(flatStorage);
  preciMax.placeholder = `Valor máximo - ${temp[0].size}`;
};
areaHolder();

const filter = () => {
  let precioMin = document.getElementById("precio-min").value;
  let precioMax = document.getElementById("precio-max").value;
  let areaMin = document.getElementById("area-min").value;
  let areaMax = document.getElementById("area-max").value;
  let ciudades = document.getElementsByName("ciudades")[0].value;

  if (precioMin <= 0 && precioMax <= 0 && areaMin <= 0 && areaMax <= 0) {
    let noFlat = false;
    creadorFlats(noFlat);
    console.log("precio minimo");
    return;
  }

  let primero = filtro1(precioMin, flatStorage);
  let segundo = filtro2(precioMax, primero);
  let tercero = filtro3(areaMin, segundo);
  let cuarto = filtro4(areaMax, tercero);
  let quinto = filtro5(ciudades, cuarto);

  creadorFlats(quinto);
};

const filtro1 = (value, array) => {
  if (value !== "") {
    let filtro = array.filter((e) => Number(e.price) >= value);
    return filtro;
  } else {
    return array;
  }
};

const filtro2 = (value, array) => {
  if (value !== "") {
    let filtro = array.filter((e) => Number(e.price) <= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro3 = (value, array) => {
  if (value !== "") {
    let filtro = array.filter((e) => Number(e.size) >= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro4 = (value, array) => {
  if (value !== "") {
    let filtro = array.filter((e) => Number(e.size) <= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro5 = (value, array) => {
  if (value !== "") {
    let filtro = array.filter((e) => e.city === value);
    return filtro;
  } else {
    return array;
  }
};
