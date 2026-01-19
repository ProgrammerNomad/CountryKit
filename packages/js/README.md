# CountryKit - Node.js Package

NPM package for [CountryKit](https://github.com/ProgrammerNomad/CountryKit) - easy access to country data with helper functions.

## Installation

```bash
npm install countrykit
```

## Quick Start

```js
const countrykit = require('countrykit');

// Get country by ISO2 code
const india = countrykit.getCountryByISO2('IN');
console.log(india.name);  // India

// Get countries by calling code
const northAmerica = countrykit.getCountriesByCallingCode('+1');
console.log(northAmerica.map(c => c.name));  // ['United States', 'Canada']

// Get all countries using Euro
const euroCountries = countrykit.getCountriesByCurrency('EUR');
console.log(euroCountries.length);  // 11
```

## API

### Data Access

- `countries` - Array of all countries
- `currencies` - Array of all currencies
- `languages` - Array of all languages
- `dialCodes` - Array of all dial codes

### Lookup Maps (O(1) access)

- `byCca2` - Countries indexed by ISO2 code
- `byCca3` - Countries indexed by ISO3 code
- `byCallingCode` - Countries grouped by calling code

### Helper Functions

- `getCountryByISO2(code)` - Get country by ISO2 code
- `getCountryByISO3(code)` - Get country by ISO3 code
- `getCountriesByCallingCode(code)` - Get countries by calling code
- `getCountriesByRegion(region)` - Get countries by region
- `getCountriesByCurrency(currencyCode)` - Get countries using a currency
- `getCountriesByLanguage(languageCode)` - Get countries speaking a language
- `getAllCountries()` - Get all countries
- `getAllCurrencies()` - Get all currencies
- `getAllLanguages()` - Get all languages
- `getAllDialCodes()` - Get all dial codes

## TypeScript

Full TypeScript definitions included:

```typescript
import * as countrykit from 'countrykit';

const country: countrykit.Country = countrykit.getCountryByISO2('IN');
```

## License

MIT - See [LICENSE](../../LICENSE)

## More Info

See main [CountryKit README](../../README.md) for complete documentation.
