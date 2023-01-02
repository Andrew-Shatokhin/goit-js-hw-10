import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

// const BASE_URL = 'https://restcountries.com/v3.1';

import fetchCountries from './fetchCountries.js';

const inputEl = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountries().then(data => console.log(data));

// fetchCountries().then(data => {
//   createMarkup(data.250);
// });

// function createMarkup(arr) {
//   const markup = arr.map(({ name.official, capital, population, flags.svg, languages }) =>

//     `<div>
//     <svg>${flags.svg}</svg>
//     <h1>${name.official}</h1>
//   </div>
//     <p>Capital: ${capital}</p>
//     <p>Population: ${population}</p>
//     <p>Languages: ${languages}</p>`).join('');

//   countryInfo.insertAdjacentHTML('beforeend', markup)
// }
