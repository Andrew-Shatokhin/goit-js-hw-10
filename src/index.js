import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// fetchCountries().then(data => console.log(data));

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  const searchValue = e.target.value.trim();
  console.log(searchValue);
  if (!searchValue) return;

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  fetchCountries(searchValue).then(createMarkup).catch(onFetchError);
}

function createMarkup(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (data.length === 1) {
    const markup = createOneCountryMarkup(data[0]);
    addMarkup(markup, countryInfo);
  }
  if (data.length > 1 && data.length <= 10) {
    const markup = createSeveralCountriesMarkup(data);
    addMarkup(markup, countryList);
  }
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createOneCountryMarkup(country) {
  const { name, capital, population, flags, languages } = country;
  return `<div class=country-box>
      <img src="${flags.svg}" alt="flag ${name.official}"  />
      <h1>${name.common}</h1>
      </div>
    <p><span class=country-text>Capital:</span> ${capital}</p>
    <p><span class=country-text>Population:</span> ${population}</p>
    <p><span class=country-text>Languages:</span> ${Object.values(
      languages
    ).join(', ')}</p>`;
}

function createSeveralCountriesMarkup(countries) {
  return countries
    .map(
      ({ flags, name }) =>
        ` <li>
      <div class=country-box>
        <img src="${flags.svg}" alt="flag ${name.official}"  />
        <p class=severalCountries-text>${name.common}</p>
      </div>
    </li>`
    )
    .join('');
}

function addMarkup(markup, element) {
  element.insertAdjacentHTML('beforeend', markup);
}
