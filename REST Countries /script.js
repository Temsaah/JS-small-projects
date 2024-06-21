'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryAndNeighbourData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    const [neighbour] = data[0]?.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2);

      const [neighbour] = data2[0]?.borders;

      if (!neighbour) return;

      const request3 = new XMLHttpRequest();

      request3.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

      request3.send();

      request3.addEventListener('load', function () {
        const data3 = JSON.parse(this.responseText);
        console.log(data3);
        renderCountry(data3);
      });
    });
  });
};

function renderCountry(data) {
  const html = `
  <article class="country">
        <img class="country__img" src="${data[0].flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data[0].name.common}</h3>
          <h4 class="country__region">${data[0].region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data[0].population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data[0].languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data[0].currencies)[0].name
          }</p>
        </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
}

getCountryAndNeighbourData('Germany');
