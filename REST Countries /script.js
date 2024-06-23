'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryAndNeighbourData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);

//     const [neighbour] = data[0]?.borders;

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2);

//       const [neighbour] = data2[0]?.borders;

//       if (!neighbour) return;

//       const request3 = new XMLHttpRequest();

//       request3.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

//       request3.send();

//       request3.addEventListener('load', function () {
//         const data3 = JSON.parse(this.responseText);
//         console.log(data3);
//         renderCountry(data3);
//       });
//     });
//   });
// };

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}m people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
  console.log(msg);
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);

      return res.json();
    })
    .then(function (data) {
      renderCountry(data[0]);

      const neighbour = data[0]?.borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(neighbour => renderCountry(neighbour[0], 'neighbour'))
    .catch(err => {
      renderError(`${err.message}. Try again!`);
    });
};

btn.addEventListener('click', function () {
  getCountryData('GermanyZ');
});
