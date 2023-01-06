const fetch = require("node-fetch");

exports.getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result = await response.json();

    const countries = result.map((country) => {
      return {
        name: country.translations.fra.common,
        population: country.population,
        logo: country.flags.png,
      };
    });

    return countries;
  } catch (e) {
    throw e;
  }
};
