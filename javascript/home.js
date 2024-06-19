let flatStorage = [
  { provincia: 'Pichincha', ciudad: 'Zapotillo', calle: 'Eloy alfaro', numeracion: 'n34-118', area: 125, aire: true, construcion: 1994, precio: 1200, disponibilidad: '2023/8/12' },
  { provincia: 'Pichincha', ciudad: 'Azcabulli', calle: 'Eloy alfaro2', numeracion: 'n34-118', area: 88, aire: false, construcion: 1996, precio: 450, disponibilidad: '2023/8/12' },
  { provincia: 'Pichincha', ciudad: 'Farraon', calle: 'Eloy alfaro3', numeracion: 'n34-118', area: 69, aire: true, construcion: 1998, precio: 400, disponibilidad: '2023/8/12' },
  { provincia: 'Pichincha', ciudad: 'Quito', calle: 'Eloy alfaro4', numeracion: 'n34-118', area: 78, aire: false, construcion: 2000, precio: 500, disponibilidad: '2023/8/12' },
];

const pushImg = () => {
  for (let i = 0; i < flatStorage.length; i++) {
    flatStorage[i].img = `${i}`;
  }
};

pushImg();

getvalue = t => {
  if (t.value === 'Ciudad') {
    console.log('getvalue ciudad');
    creadorFlats(OrdenCiudad(flatStorage));
  } else if (t.value === 'Precio') {
    console.log('getvalue precio');
    creadorFlats(OrdenPrecio(flatStorage));
  } else if (t.value === 'Área') {
    console.log('getvalue area');
    creadorFlats(OrdenArea(flatStorage));
  }
};

const OrdenCiudad = flatStorage => {
  return flatStorage.sort((a, b) => a.ciudad.localeCompare(b.ciudad));
};
const OrdenPrecio = flatStorage => {
  return flatStorage.sort((a, b) => a.precio - b.precio);
};

const OrdenArea = flatStorage => {
  return flatStorage.sort((a, b) => a.area - b.area);
};

const ordenPrecio2 = flatStorage => {
  return flatStorage.sort((a, b) => b.precio - a.precio);
};

const OrdenArea2 = flatStorage => {
  return flatStorage.sort((a, b) => b.area - a.area);
};

const removerTodosChildren = () => {
  let remove = document.getElementById('grid-flats');
  remove.replaceChildren();
};

const creadorFlats = ordenarBoton => {
  if (ordenarBoton === false) {
    removerTodosChildren();
    let divGrid2 = document.getElementById('grid-flats');
    let temp = document.createElement('div');
    temp.classList.add('grid-flat-solo');
    temp.innerHTML = `
    <img class="img-flat" src="/img/no_img.jpg" alt="">
    <div class = "contenedor-flat">
    <p class="avenida-flat">No hay información disponible</p>
    <p><span class = "precio">No hay infomración disponible </span> $/mes</p>
    <p>No hay infomración disponible m², aire acondicionado No hay infomración disponible</p>
    <p>Año de construción: No hay infomración disponible</p>
    <p>Disponible desde: No hay infomración disponible</p>
    </div>`;
    divGrid2.appendChild(temp);
    return;
  }
  if (!ordenarBoton) {
    removerTodosChildren();
    let divGrid2 = document.getElementById('grid-flats');
    for (let i = 0; i < flatStorage.length; i++) {
      let temp = document.createElement('div');
      temp.classList.add('grid-flat-solo');
      temp.innerHTML = `
    <img class="img-flat" src="/img/flat${flatStorage[i].img}.webp" alt="">
    <div class = "contenedor-flat">
    <p class="avenida-flat">Av. ${flatStorage[i].calle} ${flatStorage[i].numeracion} ${flatStorage[i].provincia}, ${flatStorage[i].ciudad} </p>
    <p><span class = "precio">${flatStorage[i].precio}</span> $/mes</p>
    <p>${flatStorage[i].area} m², aire acondicionado ${flatStorage[i].aire}</p>
    <p>Año de construción: ${flatStorage[i].construcion}</p>
    <p>Disponible desde: ${flatStorage[i].disponibilidad}</p>
    </div>`;
      divGrid2.appendChild(temp);
    }
    return;
  }
  removerTodosChildren();
  let divGrid = document.getElementById('grid-flats');
  for (let i = 0; i < ordenarBoton.length; i++) {
    let temp = document.createElement('div');
    temp.classList.add('grid-flat-solo');
    temp.innerHTML = `
    <img class="img-flat" src="/img/flat${ordenarBoton[i].img}.webp" alt="">
    <div class = "contenedor-flat">
    <p class="avenida-flat">Av. ${ordenarBoton[i].calle} ${ordenarBoton[i].numeracion} ${ordenarBoton[i].provincia}, ${ordenarBoton[i].ciudad} </p>
    <p><span class = "precio">${ordenarBoton[i].precio}</span> $/mes</p>
    <p>${ordenarBoton[i].area} m², aire acondicionado ${ordenarBoton[i].aire}</p>
    <p>Año de construción: ${ordenarBoton[i].construcion}</p>
    <p>Disponible desde: ${ordenarBoton[i].disponibilidad}</p>
    </div>`;
    divGrid.appendChild(temp);
  }
};
creadorFlats();

const datalistCiudades = () => {
  let ciudades = [];
  let flatOrdenados = OrdenCiudad(flatStorage);
  for (let [index, value] of flatOrdenados.entries()) {
    ciudades.push(`${value.ciudad}`);
  }
  let ciudad = document.getElementById('ciudades');
  for (let [index, value] of ciudades.entries()) {
    let option = document.createElement('option');
    option.value = `${ciudades[index]}`;
    ciudad.appendChild(option);
  }
};

datalistCiudades();

const precioHolder = () => {
  let preciMin = document.getElementById('precio-min');
  let preciMax = document.getElementById('precio-max');
  let temp = OrdenPrecio(flatStorage);
  preciMin.placeholder = `Valor mínimo - ${temp[0].precio}`;
  temp = ordenPrecio2(flatStorage);
  preciMax.placeholder = `Valor máximo - ${temp[0].precio}`;
};
precioHolder();

const areaHolder = () => {
  let preciMin = document.getElementById('area-min');
  let preciMax = document.getElementById('area-max');
  let temp = OrdenArea(flatStorage);
  preciMin.placeholder = `Valor mínimo - ${temp[0].area}`;
  temp = OrdenArea2(flatStorage);
  preciMax.placeholder = `Valor máximo - ${temp[0].area}`;
};
areaHolder();

const filter = () => {
  let precioMin = document.getElementById('precio-min').value;
  let precioMax = document.getElementById('precio-max').value;
  let areaMin = document.getElementById('area-min').value;
  let areaMax = document.getElementById('area-max').value;
  let ciudades = document.getElementsByName('ciudades')[0].value;

  if (precioMin <= 0 || precioMax <= 0 || areaMin <= 0 || areaMax <= 0) {
    let noFlat = false;
    creadorFlats(noFlat);
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
  if (value !== '') {
    let filtro = array.filter(e => e.precio >= value);
    return filtro;
  } else {
    return array;
  }
};

const filtro2 = (value, array) => {
  if (value !== '') {
    let filtro = array.filter(e => e.precio <= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro3 = (value, array) => {
  if (value !== '') {
    let filtro = array.filter(e => e.area >= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro4 = (value, array) => {
  if (value !== '') {
    let filtro = array.filter(e => e.area <= value);
    return filtro;
  } else {
    return array;
  }
};
const filtro5 = (value, array) => {
  if (value !== '') {
    let filtro = array.filter(e => e.ciudad == value);
    return filtro;
  } else {
    return array;
  }
};
