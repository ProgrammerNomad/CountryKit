// CountryKit - Main entry point for NPM package
const countries = require('../../data/countries.json');
const dialCodes = require('../../data/dial-codes.json');
const currencies = require('../../data/currencies.json');
const languages = require('../../data/languages.json');

// Lookup maps for O(1) access
const byCca2 = require('../../data/countries_by_cca2.json');
const byCca3 = require('../../data/countries_by_cca3.json');
const byCallingCode = require('../../data/countries_by_calling_code.json');

// Helper functions
function getCountryByISO2(code) {
  return byCca2[code.toUpperCase()] || null;
}

function getCountryByISO3(code) {
  return byCca3[code.toUpperCase()] || null;
}

function getCountriesByCallingCode(code) {
  const normalizedCode = code.startsWith('+') ? code : `+${code}`;
  return byCallingCode[normalizedCode] || [];
}

function getCountriesByRegion(region) {
  return countries.filter(c => c.region === region);
}

function getCountriesByCurrency(currencyCode) {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return [];
  return currency.countries.map(code => byCca2[code]);
}

function getCountriesByLanguage(languageCode) {
  const language = languages.find(l => l.code === languageCode);
  if (!language) return [];
  return language.countries.map(code => byCca2[code]);
}

function getAllCountries() {
  return countries;
}

function getAllCurrencies() {
  return currencies;
}

function getAllLanguages() {
  return languages;
}

function getAllDialCodes() {
  return dialCodes;
}

// Export everything
module.exports = {
  // Raw data
  countries,
  dialCodes,
  currencies,
  languages,
  
  // Lookup maps
  byCca2,
  byCca3,
  byCallingCode,
  
  // Helper functions
  getCountryByISO2,
  getCountryByISO3,
  getCountriesByCallingCode,
  getCountriesByRegion,
  getCountriesByCurrency,
  getCountriesByLanguage,
  getAllCountries,
  getAllCurrencies,
  getAllLanguages,
  getAllDialCodes
};
