// Validation script for CountryKit data
const fs = require('fs');

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`⚠ WARNING: ${msg}`);
  warnings++;
}

function success(msg) {
  console.log(`✓ ${msg}`);
}

console.log('=== Validating CountryKit Data ===\n');

// Load all data
const countries = JSON.parse(fs.readFileSync('./data/countries.json', 'utf8'));
const dialCodes = JSON.parse(fs.readFileSync('./data/dial-codes.json', 'utf8'));
const currencies = JSON.parse(fs.readFileSync('./data/currencies.json', 'utf8'));
const languages = JSON.parse(fs.readFileSync('./data/languages.json', 'utf8'));

// Validate countries
console.log('--- Validating Countries ---');
const seenCca2 = new Set();
const seenCca3 = new Set();

countries.forEach((country, index) => {
  // Check required fields
  if (!country.cca2) error(`Country at index ${index} missing cca2`);
  if (!country.cca3) error(`Country at index ${index} missing cca3`);
  if (!country.name) error(`Country at index ${index} missing name`);
  if (!country.calling_code) error(`Country at index ${index} missing calling_code`);
  
  // Check for duplicates
  if (seenCca2.has(country.cca2)) {
    error(`Duplicate cca2: ${country.cca2}`);
  }
  seenCca2.add(country.cca2);
  
  if (seenCca3.has(country.cca3)) {
    error(`Duplicate cca3: ${country.cca3}`);
  }
  seenCca3.add(country.cca3);
  
  // Validate ISO codes format
  if (country.cca2 && country.cca2.length !== 2) {
    error(`${country.name}: cca2 must be 2 characters`);
  }
  if (country.cca3 && country.cca3.length !== 3) {
    error(`${country.name}: cca3 must be 3 characters`);
  }
  
  // Validate calling code format
  if (country.calling_code && !country.calling_code.startsWith('+')) {
    error(`${country.name}: calling_code must start with +`);
  }
  
  // Check currency array
  if (!country.currency || country.currency.length === 0) {
    warn(`${country.name}: no currency defined`);
  }
  
  // Check languages array
  if (!country.languages || country.languages.length === 0) {
    warn(`${country.name}: no languages defined`);
  }
});

success(`Validated ${countries.length} countries`);

// Validate dial codes
console.log('\n--- Validating Dial Codes ---');
dialCodes.forEach(dial => {
  if (!dial.code.startsWith('+')) {
    error(`Dial code ${dial.code} must start with +`);
  }
  
  // Check if countries exist
  dial.countries.forEach(countryCode => {
    if (!seenCca2.has(countryCode)) {
      error(`Dial code ${dial.code} references unknown country: ${countryCode}`);
    }
  });
});
success(`Validated ${dialCodes.length} dial codes`);

// Validate currencies
console.log('\n--- Validating Currencies ---');
const seenCurrency = new Set();
currencies.forEach(currency => {
  if (!currency.code || currency.code.length !== 3) {
    error(`Currency code must be 3 characters: ${currency.code}`);
  }
  
  if (seenCurrency.has(currency.code)) {
    error(`Duplicate currency code: ${currency.code}`);
  }
  seenCurrency.add(currency.code);
  
  // Check if countries exist
  currency.countries.forEach(countryCode => {
    if (!seenCca2.has(countryCode)) {
      error(`Currency ${currency.code} references unknown country: ${countryCode}`);
    }
  });
});
success(`Validated ${currencies.length} currencies`);

// Validate languages
console.log('\n--- Validating Languages ---');
const seenLanguage = new Set();
languages.forEach(language => {
  if (!language.code || language.code.length !== 2) {
    warn(`Language code should be 2 characters: ${language.code}`);
  }
  
  if (seenLanguage.has(language.code)) {
    error(`Duplicate language code: ${language.code}`);
  }
  seenLanguage.add(language.code);
  
  // Check if countries exist
  language.countries.forEach(countryCode => {
    if (!seenCca2.has(countryCode)) {
      error(`Language ${language.code} references unknown country: ${countryCode}`);
    }
  });
});
success(`Validated ${languages.length} languages`);

// Summary
console.log('\n=== Validation Summary ===');
console.log(`Errors:   ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\n✗ Validation failed!');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠ Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✓ All validations passed!');
  process.exit(0);
}
