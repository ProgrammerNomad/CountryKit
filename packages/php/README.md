# CountryKit - PHP Package

Universal country data library with ISO codes, phone codes, flags, currencies, and languages.

## Installation

Install via Composer:

```bash
composer require countrykit/countrykit
```

Or add to your `composer.json`:

```json
{
    "require": {
        "countrykit/countrykit": "^1.0"
    }
}
```

## Requirements

- PHP 7.2 or higher
- No other dependencies

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
- PSR-4 autoloading

## Usage

### Basic Setup

```php
<?php
require 'vendor/autoload.php';

use CountryKit\CountryKit;
```

### Get Country by ISO Code

```php
// Get by ISO 3166-1 alpha-2 (2-letter)
$usa = CountryKit::getCountryByIso2('US');
echo $usa['name'];  // "United States"
echo $usa['calling_code'];  // "+1"

// Get by ISO 3166-1 alpha-3 (3-letter)
$gbr = CountryKit::getCountryByIso3('GBR');
echo $gbr['name'];  // "United Kingdom"
```

### Get Countries by Calling Code

```php
// Countries with +1 calling code
$countries = CountryKit::getCountriesByCallingCodeValue('+1');
foreach ($countries as $country) {
    echo $country['name'] . "\n";
}
// Output: United States, Canada
```

### Get Countries by Region

```php
// All European countries
$europe = CountryKit::getCountriesByRegion('Europe');
echo count($europe);  // Number of European countries

// All countries in Southern Asia
$southAsia = CountryKit::getCountriesBySubregion('Southern Asia');
```

### Get Countries by Currency

```php
// All countries using Euro
$euroCountries = CountryKit::getCountriesByCurrency('EUR');
foreach ($euroCountries as $country) {
    echo $country['name'] . "\n";
}
```

### Get Countries by Language

```php
// All English-speaking countries
$englishCountries = CountryKit::getCountriesByLanguage('en');
foreach ($englishCountries as $country) {
    echo $country['name'] . "\n";
}
```

### Search Countries

```php
// Search by name or native name
$results = CountryKit::searchCountries('united');
foreach ($results as $country) {
    echo $country['name'] . "\n";
}
// Output: United States, United Kingdom, United Arab Emirates
```

### Access Raw Data

```php
// All countries (array)
$allCountries = CountryKit::getCountries();
echo count($allCountries);

// Fast lookup arrays
$byIso2 = CountryKit::getCountriesByIso2();
$byIso3 = CountryKit::getCountriesByIso3();
$byPhone = CountryKit::getCountriesByCallingCode();

// All currencies
$currencies = CountryKit::getCurrencies();

// All languages
$languages = CountryKit::getLanguages();

// All calling codes
$callingCodes = CountryKit::getDialCodes();

// All regions
$regions = CountryKit::getAllRegions();

// All subregions
$subregions = CountryKit::getAllSubregions();
```

## Data Structure

Each country array contains:

```php
[
    'cca2' => 'US',                    // ISO 3166-1 alpha-2
    'cca3' => 'USA',                   // ISO 3166-1 alpha-3
    'ccn3' => '840',                   // ISO 3166-1 numeric
    'name' => 'United States',         // Common name
    'native_name' => 'United States',  // Native name
    'calling_code' => '+1',            // Phone calling code
    'capital' => 'Washington, D.C.',   // Capital city
    'region' => 'Americas',            // Region
    'subregion' => 'Northern America', // Subregion
    'tld' => '.us',                    // Top-level domain
    'currency' => [                    // Currencies (array)
        [
            'code' => 'USD',
            'name' => 'United States Dollar',
            'symbol' => '$'
        ]
    ],
    'languages' => [                   // Languages (array)
        [
            'code' => 'en',
            'name' => 'English'
        ]
    ],
    'flag' => [
        'emoji' => '🇺🇸',              // Flag emoji
        'svg' => 'flags/US.svg'         // SVG flag path
    ]
]
```

## API Reference

### Lookup Methods

- `getCountryByIso2($code)` - Get country by 2-letter ISO code
- `getCountryByIso3($code)` - Get country by 3-letter ISO code
- `getCountriesByCallingCodeValue($code)` - Get countries by phone code
- `getCountriesByRegion($region)` - Get countries by region
- `getCountriesBySubregion($subregion)` - Get countries by subregion
- `getCountriesByCurrency($code)` - Get countries by currency code
- `getCountriesByLanguage($code)` - Get countries by language code
- `searchCountries($query)` - Search countries by name

### List Methods

- `getAllRegions()` - Get all unique regions
- `getAllSubregions()` - Get all unique subregions
- `getCurrencies()` - Get all currencies with details
- `getLanguages()` - Get all languages with details
- `getDialCodes()` - Get all calling codes with mappings

### Data Methods

- `getCountries()` - Get all country data
- `getCountriesByIso2()` - Get array indexed by ISO2
- `getCountriesByIso3()` - Get array indexed by ISO3
- `getCountriesByCallingCode()` - Get array grouped by phone code

## Examples

### Display Country Information

```php
$country = CountryKit::getCountryByIso2('FR');

echo "Country: {$country['name']} {$country['flag']['emoji']}\n";
echo "Capital: {$country['capital']}\n";
echo "Phone: {$country['calling_code']}\n";
echo "Currencies: ";
foreach ($country['currency'] as $curr) {
    echo "{$curr['name']} ({$curr['symbol']}) ";
}
echo "\n";
```

### Build a Country Selector

```php
$countries = CountryKit::getCountries();
?>
<select name="country">
    <?php foreach ($countries as $country): ?>
        <option value="<?= $country['cca2'] ?>">
            <?= $country['flag']['emoji'] ?> <?= $country['name'] ?>
        </option>
    <?php endforeach; ?>
</select>
```

### Phone Number Validation

```php
function validatePhoneCountry($phoneNumber) {
    $dialCodes = CountryKit::getDialCodes();
    
    foreach ($dialCodes as $dialCode) {
        if (strpos($phoneNumber, $dialCode['code']) === 0) {
            return $dialCode['countries'];
        }
    }
    
    return null;
}

$matches = validatePhoneCountry('+1-555-1234');
// Returns: ['US', 'CA']
```

### Currency Converter Helper

```php
function getCountriesForCurrency($currencyCode) {
    $countries = CountryKit::getCountriesByCurrency($currencyCode);
    $names = array_map(function($c) {
        return $c['name'];
    }, $countries);
    return implode(', ', $names);
}

echo getCountriesForCurrency('EUR');
// Output: Germany, France, Spain, Italy, Netherlands, ...
```

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Data Sources

Data is curated from official sources and updated regularly. Flag SVGs are from public domain sources.
