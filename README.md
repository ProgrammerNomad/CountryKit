# CountryKit

**CountryKit** is an open-source, developer-friendly dataset of **countries + ISO codes + phone calling codes + flags + currencies + languages** — packed in clean formats that work in almost every programming language.

Perfect for building:
- Signup / profile country dropdowns
- Phone number + country code selection
- Currency pickers
- Language selectors
- Billing / geo-based apps
- Admin panels, dashboards, and APIs

---

## What CountryKit Includes

**Current Status: 250 countries/territories** (Complete dataset of all UN recognized countries plus territories)

Each country entry provides:

- **Country Name** (Common name + Native name)
- **ISO Codes**
  - ISO 3166-1 alpha-2 (`IN`, `US`)
  - ISO 3166-1 alpha-3 (`IND`, `USA`)
  - ISO numeric (`356`, `840`)
- **Phone / Calling Codes**
  - E.164 calling code (`+91`, `+1`)
- **Flags**
  - Emoji (`🇮🇳`)
  - SVG (`flags/IN.svg`) - **All 250 flags included**
- **Currencies** (163 unique currencies)
  - ISO 4217 currency code (`INR`, `USD`)
  - Currency name + symbol
- **Languages** (50 unique languages)
  - ISO 639-1 language codes (`en`, `hi`, `fr`)
- **Geographic Data**
  - Region (Asia, Europe, Americas, Africa, Oceania)
  - Subregion (Southern Asia, Western Europe, etc.)
  - Capital city
  - TLD (`.in`, `.us`)

**Fast Lookup Maps:**
- `countries_by_cca2.json` - O(1) lookup by ISO2 code
- `countries_by_cca3.json` - O(1) lookup by ISO3 code
- `countries_by_calling_code.json` - Countries grouped by phone code

---

## Data Formats

CountryKit focuses on **universal formats** that can be used in nearly any language:

- JSON (recommended)
- Minified JSON (for frontend / production use)
- CSV (optional)
- YAML (optional)

---

## Project Structure

```
CountryKit/
├── data/                         # Core data files (language-independent)
│   ├── countries.json           # Main dataset (250 countries/territories)
│   ├── countries.min.json       # Minified version (36.5% smaller)
│   ├── currencies.json          # 163 currencies with country mappings
│   ├── languages.json           # 50 languages with country mappings
│   ├── dial-codes.json          # 233 calling codes with country mappings
│   ├── countries_by_cca2.json   # Fast O(1) lookup by ISO2
│   ├── countries_by_cca3.json   # Fast O(1) lookup by ISO3
│   └── countries_by_calling_code.json  # Countries grouped by phone code
├── flags/                        # SVG flags (250 countries/territories)
│   ├── US.svg
│   ├── GB.svg
│   ├── IN.svg
│   └── ...
├── scripts/
│   ├── auto-generate.js         # Generate all dependent files
│   ├── validate.js              # Data validation
│   └── download-flags.js        # Download flags from flagcdn.com
├── packages/
│   ├── js/                      # Node.js/NPM package (optional wrapper)
│   │   ├── index.js
│   │   ├── index.d.ts           # TypeScript definitions
│   │   ├── package.json
│   │   └── README.md
│   ├── python/                  # Python/PyPI package (optional wrapper)
│   │   ├── __init__.py
│   │   ├── setup.py
│   │   └── README.md
│   └── php/                     # PHP/Composer package (optional wrapper)
│       ├── src/CountryKit.php
│       ├── composer.json
│       └── README.md
├── tests/                       # Test suites
│   ├── test-data.js             # Data validation tests
│   ├── test-package.js          # Node.js package tests
│   ├── test-python.py           # Python package tests
│   ├── test-python.py           # Python package tests
│   └── test-php.php             # PHP package tests
├── CONTRIBUTING.md              # Contribution guidelines
├── CHANGELOG.md                 # Version history
├── README.md
└── LICENSE
```

---

## Example Data (Country Object)

```json
{
  "cca2": "IN",
  "cca3": "IND",
  "ccn3": "356",
  "name": "India",
  "native_name": "भारत",
  "calling_code": "+91",
  "currency": [
    { "code": "INR", "name": "Indian Rupee", "symbol": "₹" }
  ],
  "languages": [
    { "code": "hi", "name": "Hindi" },
    { "code": "en", "name": "English" }
  ],
  "flag": {
    "emoji": "🇮🇳",
    "svg": "flags/IN.svg"
  }
}
```

---

## Quick Usage

CountryKit is **data-first**: the JSON files work directly in ANY language. The packages (`js`, `python`, `php`) are optional convenience wrappers.

### Direct JSON (Works in Any Language)

```js
// JavaScript/Node.js
const countries = require("./data/countries.json");
console.log(countries.length); // 250
```

```php
// PHP
$countries = json_decode(file_get_contents("data/countries.json"), true);
echo count($countries); // 250
```

```py
# Python
import json
with open("data/countries.json", "r", encoding="utf-8") as f:
    countries = json.load(f)
print(len(countries)) # 250
```

### Using the Node.js Package

```bash
cd packages/js
npm install
```

```js
const countrykit = require('./packages/js');

// Get country by ISO2 code
const usa = countrykit.getCountryByISO2('US');
console.log(usa.name); // "United States"

// Get countries by calling code
const plus1 = countrykit.getCountriesByCallingCode('+1');
console.log(plus1.length); // 2 (US, CA)

// Get countries by region
const asia = countrykit.getCountriesByRegion('Asia');
console.log(asia.length); // 50

// Fast lookup maps
const byISO2 = countrykit.countriesByISO2;
console.log(byISO2['IN']); // India
```

See [packages/js/README.md](packages/js/README.md) for full API documentation.

### Using the Python Package

```bash
cd packages/python
pip install -e .
```

```py
import countrykit

# Get country by ISO2 code
usa = countrykit.get_country_by_iso2('US')
print(usa['name'])  # "United States"

# Get countries by currency
usd_countries = countrykit.get_countries_by_currency('USD')
print(len(usd_countries))  # 19

# Search countries
results = countrykit.search_countries('united')
for c in results:
    print(c['name'])
```

See [packages/python/README.md](packages/python/README.md) for full API documentation.

### Using the PHP Package

```bash
cd packages/php
composer install
```

```php
<?php
require 'vendor/autoload.php';
use CountryKit\CountryKit;

// Get country by ISO2 code
$usa = CountryKit::getCountryByIso2('US');
echo $usa['name'];  // "United States"

// Get countries by language
$english = CountryKit::getCountriesByLanguage('en');
echo count($english);  // 179

// Search countries
$results = CountryKit::searchCountries('united');
foreach ($results as $country) {
    echo $country['name'] . "\n";
}
```

See [packages/php/README.md](packages/php/README.md) for full API documentation.

---

## Lookup Examples

### Find by ISO2

```js
const india = countries.find(c => c.cca2 === "IN");
```

### Find by calling code

```js
const plus91 = countries.filter(c => c.calling_code === "+91");
```

### List all currencies used

```js
const currencyCodes = new Set();
countries.forEach(c => c.currency?.forEach(cur => currencyCodes.add(cur.code)));
console.log([...currencyCodes]);
```

---

## Goals of CountryKit

CountryKit is designed to be:

- **Accurate**
- **Clean structured**
- **Stable keys**
- **Language-independent**
- **Easy to use**
- **Open-source + community friendly**

---

## Why Not Use an API?

Because developers often need this data:

- **offline**
- **fast**
- **inside frontend bundles**
- **without API dependencies**
- **without rate limits**

CountryKit is **data-first**, so it works everywhere.

---

## Build / Validation

CountryKit includes validation and build scripts to ensure data integrity:

### Validation

```bash
node scripts/validate.js
```

Checks for:
- Duplicate ISO codes (cca2, cca3, ccn3)
- Invalid calling codes
- Missing currencies
- Missing languages
- Broken references

### Auto-Generation

```bash
node scripts/auto-generate.js
```

Generates all dependent files from `countries.json`:
- `countries.min.json` (minified, 36.5% smaller)
- `currencies.json` (163 unique currencies)
- `languages.json` (50 unique languages)
- `dial-codes.json` (233 calling codes)
- `countries_by_cca2.json` (fast lookup map)
- `countries_by_cca3.json` (fast lookup map)
- `countries_by_calling_code.json` (grouped by phone code)

### Download Flags

```bash
node scripts/download-flags.js
```

Downloads SVG flags from flagcdn.com API for all countries in the dataset.

### Testing

```bash
# Test data files
node tests/test-data.js

# Test Node.js package
node tests/test-package.js

# Test Python package
python tests/test-python.py

# Test PHP package
php tests/test-php.php
```

---

## Data Sources (Planned / Recommended)

CountryKit compiles and normalizes data from public sources such as:

- ISO 3166 country codes (official standard)
- E.164 calling codes (ITU-T recommendation)
- ISO 4217 currency codes (official standard)
- ISO 639 language codes (official standard)
- Flag SVGs from [flagcdn.com](https://flagcdn.com) (public domain)

All data is cleaned, validated, and merged into one unified format.

---

## Contributing

Contributions are welcome!

### Ways to contribute

- Fix incorrect/missing data
- Add flags (SVG)
- Improve schema consistency
- Add scripts (validator / builder)
- Add language packages (PHP/Python/Go/etc)

### Contribution steps

1. Fork the repo
2. Create a new branch
3. Make changes
4. Run validation (if available)
5. Open a Pull Request

---

## Roadmap

- [x] Add complete `countries.json` dataset (250 countries/territories)
- [x] Add `countries.min.json` (minified - 36.5% smaller)
- [x] Add `dial-codes.json` (233 calling codes)
- [x] Add flags in SVG (250 flags from flagcdn.com)
- [x] Add validation script
- [x] Add fast lookup maps (`countries_by_cca2.json`, `countries_by_cca3.json`, `countries_by_calling_code.json`)
- [x] Add auto-generation script
- [x] Add Node.js package (packages/js/)
- [x] Add TypeScript definitions
- [x] Add Python package (packages/python/)
- [x] Add PHP package (packages/php/)
- [x] Expand to complete dataset (250 countries + territories)
- [ ] Publish to NPM (@countrykit/countrykit)
- [ ] Publish to PyPI (countrykit)
- [ ] Publish to Packagist (countrykit/countrykit)
- [ ] Add CSV/YAML formats (optional)
- [ ] Add timezone data
- [ ] Add geographic coordinates (lat/lng)
- [ ] Add border countries

---

## License

This project is open-source under the **MIT License**.

---

## Author

**Shiv Singh**  
GitHub: [https://github.com/ProgrammerNomad](https://github.com/ProgrammerNomad)

---

## Support

If this project helps you, consider giving it a star on GitHub.  
It motivates me to keep improving CountryKit!