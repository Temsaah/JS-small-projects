'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
<<<<<<< HEAD

let map, mapEvent;

navigator.geolocation?.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  },
  function () {
    alert("Couldn't get your position");
  }
);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  const icon = L.icon({
    iconUrl: 'icon-2.png',
    iconSize: [20, 30],
  });
  const popup = L.popup({
    maxWidth: 200,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  });
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng], { icon: icon })
    .addTo(map)
    .bindPopup(popup)
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

});
=======
>>>>>>> 4d74c3df01ed2542f32483793f3ec8fe615c303f
