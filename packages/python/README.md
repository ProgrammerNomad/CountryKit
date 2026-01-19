# CountryKit - Python Package

Universal country data library with ISO codes, phone codes, flags, currencies, and languages.

## Installation

```bash
pip install countrykit
```

Or install from source:
```bash
cd packages/python
pip install -e .
```

## Features

- 250 countries and territories with complete data
- ISO 3166-1 alpha-2, alpha-3, and numeric codes
- Phone calling codes
- SVG and emoji flags
- Currencies with symbols
- Languages
- Regions and subregions
- Fast O(1) lookups by ISO codes
- Zero dependencies

## Usage

### Import

```python
import countrykit

# Or import specific functions
from countrykit import get_country_by_iso2, get_countries_by_region
```

### Get Country by ISO Code

```python
# Get by ISO 3166-1 alpha-2 (2-letter)
usa = countrykit.get_country_by_iso2('US')
print(usa['name'])  # "United States"
print(usa['calling_code'])  # "+1"

# Get by ISO 3166-1 alpha-3 (3-letter)
gbr = countrykit.get_country_by_iso3('GBR')
print(gbr['name'])  # "United Kingdom"
```

### Get Countries by Calling Code

```python
# Countries with +1 calling code
countries = countrykit.get_countries_by_calling_code('+1')
for country in countries:
    print(country['name'])
# Output: United States, Canada
```

### Get Countries by Region

```python
# All European countries
europe = countrykit.get_countries_by_region('Europe')
print(len(europe))  # Number of European countries

# All countries in Southern Asia
south_asia = countrykit.get_countries_by_subregion('Southern Asia')
```

### Get Countries by Currency

```python
# All countries using Euro
euro_countries = countrykit.get_countries_by_currency('EUR')
for country in euro_countries:
    print(country['name'])
```

### Get Countries by Language

```python
# All English-speaking countries
english_countries = countrykit.get_countries_by_language('en')
for country in english_countries:
    print(country['name'])
```

### Search Countries

```python
# Search by name or native name
results = countrykit.search_countries('united')
for country in results:
    print(country['name'])
# Output: United States, United Kingdom, United Arab Emirates
```

### Access Raw Data

```python
# All countries (list)
all_countries = countrykit.countries
print(len(all_countries))

# Fast lookup maps (dict)
by_iso2 = countrykit.countries_by_cca2
by_iso3 = countrykit.countries_by_cca3
by_phone = countrykit.countries_by_calling_code

# All currencies
currencies = countrykit.get_all_currencies()

# All languages
languages = countrykit.get_all_languages()

# All calling codes
calling_codes = countrykit.get_all_calling_codes()

# All regions
regions = countrykit.get_all_regions()

# All subregions
subregions = countrykit.get_all_subregions()
```

## Data Structure

Each country object contains:

```python
{
  "cca2": "US",                    # ISO 3166-1 alpha-2
  "cca3": "USA",                   # ISO 3166-1 alpha-3
  "ccn3": "840",                   # ISO 3166-1 numeric
  "name": "United States",         # Common name
  "native_name": "United States",  # Native name
  "calling_code": "+1",            # Phone calling code
  "capital": "Washington, D.C.",   # Capital city
  "region": "Americas",            # Region
  "subregion": "Northern America", # Subregion
  "tld": ".us",                    # Top-level domain
  "currency": [                    # Currencies (array)
    {
      "code": "USD",
      "name": "United States Dollar",
      "symbol": "$"
    }
  ],
  "languages": [                   # Languages (array)
    {
      "code": "en",
      "name": "English"
    }
  ],
  "flag": {
    "emoji": "🇺🇸",              # Flag emoji
    "svg": "flags/US.svg"         # SVG flag path
  }
}
```

## API Reference

### Lookup Functions

- `get_country_by_iso2(code)` - Get country by 2-letter ISO code
- `get_country_by_iso3(code)` - Get country by 3-letter ISO code
- `get_countries_by_calling_code(code)` - Get countries by phone code
- `get_countries_by_region(region)` - Get countries by region
- `get_countries_by_subregion(subregion)` - Get countries by subregion
- `get_countries_by_currency(code)` - Get countries by currency code
- `get_countries_by_language(code)` - Get countries by language code
- `search_countries(query)` - Search countries by name

### List Functions

- `get_all_regions()` - Get all unique regions
- `get_all_subregions()` - Get all unique subregions
- `get_all_currencies()` - Get all currencies with details
- `get_all_languages()` - Get all languages with details
- `get_all_calling_codes()` - Get all calling codes with mappings

### Data Objects

- `countries` - List of all country objects
- `countries_by_cca2` - Dict for O(1) lookup by ISO2
- `countries_by_cca3` - Dict for O(1) lookup by ISO3
- `countries_by_calling_code` - Dict of countries grouped by phone code
- `currencies` - List of all currency objects
- `languages` - List of all language objects
- `dial_codes` - List of all calling code objects

## Requirements

- Python 3.6+
- No external dependencies

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Data Sources

Data is curated from official sources and updated regularly. Flag SVGs are from public domain sources.
