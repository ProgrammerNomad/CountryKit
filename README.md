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

Each country entry aims to provide:

- **Country Name**
- **ISO Codes**
  - ISO 3166-1 alpha-2 (`IN`, `US`)
  - ISO 3166-1 alpha-3 (`IND`, `USA`)
  - ISO numeric (`356`, `840`)
- **Phone / Calling Codes**
  - E.164 calling code (`+91`, `+1`)
- **Flags**
  - Emoji (`🇮🇳`)
  - SVG (optional)
- **Currencies**
  - ISO 4217 currency code (`INR`, `USD`)
  - Currency name + symbol
- **Languages**
  - ISO 639-1 language codes (`en`, `hi`, `fr`)
- **Extra (optional / future-ready)**
  - Region / Subregion
  - Capital
  - Timezones
  - TLD (`.in`, `.us`)
  - Borders
  - Lat/Lng

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
├── data/
│   ├── countries.json
│   ├── countries.min.json
│   ├── currencies.json
│   ├── languages.json
│   └── dial-codes.json
├── flags/
│   ├── IN.svg
│   ├── US.svg
│   └── ...
├── scripts/
│   ├── build.js
│   └── validate.js
├── packages/
│   ├── js/
│   ├── python/
│   └── php/
├── README.md
└── LICENSE
```

> Not all files may exist on day one — the goal is to grow CountryKit step-by-step while keeping it clean and stable.

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

### JavaScript / TypeScript (Direct JSON Import)

```js
import countries from "./data/countries.json" assert { type: "json" };

console.log(countries.find(c => c.cca2 === "IN"));
```

### Node.js (CommonJS)

```js
const countries = require("./data/countries.json");

console.log(countries.length);
```

### PHP

```php
<?php

$countries = json_decode(file_get_contents(__DIR__ . "/data/countries.json"), true);

foreach ($countries as $country) {
  if ($country["cca2"] === "IN") {
    print_r($country);
  }
}
```

### Python

```py
import json

with open("data/countries.json", "r", encoding="utf-8") as f:
    countries = json.load(f)

india = next(c for c in countries if c["cca2"] == "IN")
print(india)
```

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

## Build / Validation (Optional)

If you maintain this dataset seriously, validation scripts help avoid errors:

- Duplicate ISO codes
- Invalid calling codes
- Missing currencies
- Missing languages

Example (future plan):

```bash
node scripts/validate.js
node scripts/build.js
```

---

## Data Sources (Planned / Recommended)

CountryKit compiles and normalizes data from public sources such as:

- ISO 3166 country codes
- E.164 calling codes
- ISO 4217 currency codes
- ISO 639 language codes
- Public flag SVG sources

All data is cleaned and merged into one unified format.

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

- [ ] Add complete `countries.json` dataset
- [ ] Add `countries.min.json` (minified)
- [ ] Add `dial-codes.json`
- [ ] Add flags in SVG
- [ ] Add validation script
- [ ] Add fast lookup maps (`countries_by_cca2.json`)
- [ ] Publish packages (NPM / PyPI / Composer)

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