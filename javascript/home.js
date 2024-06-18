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

const creadorFlats = ordenarBoton => {
  if (!ordenarBoton) {
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

const removerTodosChildren = () => {
  let remove = document.getElementById('grid-flats');
  remove.replaceChildren();
};

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
  if (!precioMin || !precioMax) {
    let filterPrince = flatStorage.filter(e => e.area >= areaMin && e.area <= areaMax);
    let filterPrice2 = filterPrince.filter(e => e.ciudad == ciudades);
    creadorFlats(filterPrice2);
  } else if (!areaMin || !areaMax) {
    let filterArea = flatStorage.filter(e => e.precio >= precioMin && e.precio <= precioMax);
    let filterArea2 = filterArea.filter(e => e.ciudad == ciudades);
    creadorFlats(filterArea2);
  }
  let filter = flatStorage.filter(e => e.precio >= precioMin && e.precio <= precioMax);
  let filter2 = filter.filter(e => e.area >= areaMin && e.area <= areaMax);
  let filter3 = filter2.filter(e => e.ciudad == ciudades);
  creadorFlats(filter3);
};
