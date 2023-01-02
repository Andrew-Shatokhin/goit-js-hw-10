export default function fetchCountries(name) {
  const resp = fetch(
    `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText);
        // Notiflix.Report.failure('Oops, there is no country with that name');
      }
      return resp.json();
    })
    .catch(err => console.error(err));
  return resp;
}
