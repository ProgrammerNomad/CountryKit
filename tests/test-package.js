// Test NPM package interface
const countrykit = require('../packages/js/index.js');

console.log('=== Testing CountryKit NPM Package ===\n');

// Test 1: getCountryByISO2
console.log('1. Get country by ISO2:');
const india = countrykit.getCountryByISO2('IN');
console.log(`   ${india.name} - ${india.calling_code} - ${india.currency[0].symbol}`);

// Test 2: getCountryByISO3
console.log('\n2. Get country by ISO3:');
const usa = countrykit.getCountryByISO3('USA');
console.log(`   ${usa.name} - ${usa.calling_code}`);

// Test 3: getCountriesByCallingCode
console.log('\n3. Get countries by calling code (+1):');
const northAmerica = countrykit.getCountriesByCallingCode('+1');
northAmerica.forEach(c => console.log(`   - ${c.name}`));

// Test 4: getCountriesByRegion
console.log('\n4. Get countries by region (Asia):');
const asian = countrykit.getCountriesByRegion('Asia');
console.log(`   Found ${asian.length} Asian countries`);

// Test 5: getCountriesByCurrency
console.log('\n5. Get countries using Euro:');
const euroCountries = countrykit.getCountriesByCurrency('EUR');
console.log(`   ${euroCountries.length} countries use Euro:`);
euroCountries.slice(0, 5).forEach(c => console.log(`   - ${c.name}`));

// Test 6: getCountriesByLanguage
console.log('\n6. Get English-speaking countries:');
const englishCountries = countrykit.getCountriesByLanguage('en');
console.log(`   ${englishCountries.length} countries speak English`);

// Test 7: getAllCountries
console.log('\n7. Get all countries:');
const allCountries = countrykit.getAllCountries();
console.log(`   Total countries: ${allCountries.length}`);

// Test 8: getAllCurrencies
console.log('\n8. Get all currencies:');
const allCurrencies = countrykit.getAllCurrencies();
console.log(`   Total currencies: ${allCurrencies.length}`);

// Test 9: getAllLanguages
console.log('\n9. Get all languages:');
const allLanguages = countrykit.getAllLanguages();
console.log(`   Total languages: ${allLanguages.length}`);

// Test 10: Direct access
console.log('\n10. Direct access to lookup maps:');
const japan = countrykit.byCca2['JP'];
console.log(`   ${japan.name} (${japan.native_name})`);

console.log('\n[OK] All NPM package tests passed!');
