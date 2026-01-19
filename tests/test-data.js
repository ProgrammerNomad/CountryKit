// Test script to validate all data files
const fs = require('fs');

function testFile(filename, description) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const json = JSON.parse(data);
    console.log(`[OK] ${description}: ${json.length} entries`);
    return json;
  } catch (error) {
    console.error(`[ERROR] ${description} failed:`, error.message);
    process.exit(1);
  }
}

console.log('=== Testing CountryKit Data Files ===\n');

// Test all files
const countries = testFile('./data/countries.json', 'countries.json');
const dialCodes = testFile('./data/dial-codes.json', 'dial-codes.json');
const currencies = testFile('./data/currencies.json', 'currencies.json');
const languages = testFile('./data/languages.json', 'languages.json');

console.log('\n--- Country Details ---');
countries.forEach(country => {
  console.log(`  ${country.name} (${country.cca2}) - ${country.calling_code} - ${country.currency[0].code}`);
});

// Test lookup by ISO2
console.log('\n--- Test: Find India by ISO2 ---');
const india = countries.find(c => c.cca2 === 'IN');
console.log(`Found: ${india.name}, Currency: ${india.currency[0].symbol}, Languages: ${india.languages.map(l => l.name).join(', ')}`);

// Test dial codes
console.log('\n--- Test: Countries with +1 calling code ---');
const plus1Dial = dialCodes.find(d => d.code === '+1');
console.log(`Countries: ${plus1Dial.countries.join(', ')}`);

// Test currencies
console.log('\n--- Test: All currencies ---');
currencies.forEach(cur => {
  console.log(`  ${cur.code} (${cur.symbol}) - ${cur.name}`);
});

// Test languages
console.log('\n--- Test: English speaking countries ---');
const english = languages.find(l => l.code === 'en');
console.log(`Countries: ${english.countries.join(', ')}`);

console.log('\n[OK] All tests passed!');
