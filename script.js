'use strict';

const divGeo = document.getElementById('prevision');
const divLluv = document.getElementById('lluvia');

const apiUrl =
  'https://api.openweathermap.org/data/2.5/onecall?appid=2a93841ddf9bf01c2891dd81d9e70cb1&lang=es';

function getLocation() {
  divGeo.innerHTML = '';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    divGeo.innerHTML = 'No ha sido posible conocer tu ubicación';
  }
}

function success(pos) {
  const crd = pos.coords;

  const ltd = crd.latitude;
  const lgt = crd.longitude;

  const apiUrlFull = apiUrl.concat('&lat=', ltd, '&lon=', lgt);

  fetch(apiUrlFull)
    .then((result) => result.json())
    .then((output) => {
      console.log(output.hourly);
      let horas = output.hourly;
      let ochohoras = horas.slice(0, 8);
      let lluvia = 0;
      let contador = 1;
      for (const hora of ochohoras) {
        let prevision = hora.weather[0].description;
        let prevision2 = hora.weather[0].main;

        if (prevision2 == 'Rain') lluvia++;

        divGeo.innerHTML +=
          'La previsión dentro de ' +
          contador +
          'h' +
          ' es de: ' +
          prevision +
          '<br/>';

        contador++;
      }
      if (lluvia > 0) {
        divLluv.innerHTML = 'Se prevé lluvia en las próximas 8h';
      } else {
        divLluv.innerHTML = 'No se prevé lluvia en las proximas 8h';
      }
    })
    .catch((err) => console.error(err));
}
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}
