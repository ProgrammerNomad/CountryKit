// Auto-generate all dependent files from countries.json
const fs = require('fs');

console.log('=== Auto-Generating All Data Files ===\n');

const countries = JSON.parse(fs.readFileSync('./data/countries.json', 'utf8'));

// 1. Generate dial-codes.json
console.log('--- Generating dial-codes.json ---');
const dialCodesMap = {};
countries.forEach(country => {
  // Skip countries without calling codes (e.g. Antarctica)
  if (!country.calling_code || country.calling_code === '') return;
  
  if (!dialCodesMap[country.calling_code]) {
    dialCodesMap[country.calling_code] = [];
  }
  dialCodesMap[country.calling_code].push(country.cca2);
});

const dialCodes = Object.keys(dialCodesMap).sort().map(code => ({
  code: code,
  countries: dialCodesMap[code]
}));

fs.writeFileSync('./data/dial-codes.json', JSON.stringify(dialCodes, null, 2));
console.log(`[OK] Generated dial-codes.json with ${dialCodes.length} dial codes`);

// 2. Generate currencies.json
console.log('\n--- Generating currencies.json ---');
const currenciesMap = {};
countries.forEach(country => {
  country.currency.forEach(curr => {
    if (!currenciesMap[curr.code]) {
      currenciesMap[curr.code] = {
        code: curr.code,
        name: curr.name,
        symbol: curr.symbol,
        countries: []
      };
    }
    if (!currenciesMap[curr.code].countries.includes(country.cca2)) {
      currenciesMap[curr.code].countries.push(country.cca2);
    }
  });
});

const currencies = Object.values(currenciesMap).sort((a, b) => a.code.localeCompare(b.code));
fs.writeFileSync('./data/currencies.json', JSON.stringify(currencies, null, 2));
console.log(`[OK] Generated currencies.json with ${currencies.length} currencies`);

// 3. Generate languages.json
console.log('\n--- Generating languages.json ---');
const languagesMap = {};
countries.forEach(country => {
  country.languages.forEach(lang => {
    if (!languagesMap[lang.code]) {
      languagesMap[lang.code] = {
        code: lang.code,
        name: lang.name,
        countries: []
      };
    }
    if (!languagesMap[lang.code].countries.includes(country.cca2)) {
      languagesMap[lang.code].countries.push(country.cca2);
    }
  });
});

const languages = Object.values(languagesMap).sort((a, b) => a.code.localeCompare(b.code));
fs.writeFileSync('./data/languages.json', JSON.stringify(languages, null, 2));
console.log(`[OK] Generated languages.json with ${languages.length} languages`);

// 4. Generate minified version
console.log('\n--- Generating countries.min.json ---');
fs.writeFileSync('./data/countries.min.json', JSON.stringify(countries));
const originalSize = fs.statSync('./data/countries.json').size;
const minifiedSize = fs.statSync('./data/countries.min.json').size;
const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
console.log(`[OK] Generated countries.min.json (${savings}% smaller)`);

// 5. Generate lookup maps
console.log('\n--- Generating lookup maps ---');

const byCca2 = {};
countries.forEach(country => {
  byCca2[country.cca2] = country;
});
fs.writeFileSync('./data/countries_by_cca2.json', JSON.stringify(byCca2, null, 2));
console.log(`[OK] Generated countries_by_cca2.json`);

const byCca3 = {};
countries.forEach(country => {
  byCca3[country.cca3] = country;
});
fs.writeFileSync('./data/countries_by_cca3.json', JSON.stringify(byCca3, null, 2));
console.log(`[OK] Generated countries_by_cca3.json`);

const byCallingCode = {};
countries.forEach(country => {
  if (!byCallingCode[country.calling_code]) {
    byCallingCode[country.calling_code] = [];
  }
  byCallingCode[country.calling_code].push(country);
});
fs.writeFileSync('./data/countries_by_calling_code.json', JSON.stringify(byCallingCode, null, 2));
console.log(`[OK] Generated countries_by_calling_code.json`);

console.log('\n=== Summary ===');
console.log(`Countries: ${countries.length}`);
console.log(`Dial Codes: ${dialCodes.length}`);
console.log(`Currencies: ${currencies.length}`);
console.log(`Languages: ${languages.length}`);
console.log('\n[OK] All files generated successfully!');
