# Changelog

All notable changes to CountryKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Expand dataset to 195+ countries
- Publish to NPM, PyPI, and Packagist
- Add CSV/YAML export formats
- Add timezone data
- Add geographic coordinates (lat/lng)
- Add border countries data

## [1.0.0] - 2026-01-19

### Added
- Initial release with 89 countries
- Complete country data with ISO codes (alpha-2, alpha-3, numeric)
- Phone calling codes in E.164 format
- 89 SVG flags from flagcdn.com
- Flag emojis for all countries
- 72 unique currencies with symbols
- 50 unique languages with ISO codes
- Geographic data (region, subregion, capital, TLD)
- Fast lookup maps for O(1) access:
  - `countries_by_cca2.json` - Lookup by ISO2
  - `countries_by_cca3.json` - Lookup by ISO3
  - `countries_by_calling_code.json` - Grouped by phone code
- Minified JSON (39.5% size reduction)
- Extracted data files:
  - `currencies.json` - All currencies with country mappings
  - `languages.json` - All languages with country mappings
  - `dial-codes.json` - All calling codes with country mappings
- Node.js package (`packages/js/`)
  - Helper functions for all lookup operations
  - TypeScript definitions
  - Full API documentation
- Python package (`packages/python/`)
  - Setup.py for pip installation
  - Full API matching Node.js package
  - Comprehensive documentation
- PHP package (`packages/php/`)
  - PSR-4 autoloading
  - Composer.json for Packagist
  - Static class with all helper methods
  - Full API documentation
- Scripts:
  - `auto-generate.js` - Generate all dependent files from countries.json
  - `validate.js` - Validate data integrity
  - `download-flags.js` - Download SVG flags from flagcdn.com
- Test suites:
  - `test.js` - Data file validation
  - `test-package.js` - Node.js package tests
  - `test-python.py` - Python package tests
  - `test-php.php` - PHP package tests
- Interactive flag gallery (`flag-preview.html`)
  - Beautiful gradient UI
  - Real-time search functionality
  - Statistics display (countries, currencies, languages, regions)
  - Click to view detailed country info
- Comprehensive documentation:
  - Main README with all packages
  - Package-specific READMEs
  - Code examples for multiple languages
  - Contributing guidelines
- MIT License

### Countries Included (89)
- **Asia (29)**: India, China, Japan, South Korea, Singapore, UAE, Thailand, Malaysia, Indonesia, Philippines, Vietnam, Pakistan, Bangladesh, Nepal, Sri Lanka, Myanmar, Cambodia, Laos, Kuwait, Qatar, Bahrain, Oman, Jordan, Lebanon, Morocco, Algeria, Tunisia, Israel, Turkey
- **Americas (20)**: United States, Canada, Brazil, Mexico, Argentina, Chile, Colombia, Peru, Venezuela, Ecuador, Uruguay, Costa Rica, Panama, Guatemala, Dominican Republic, Jamaica, and more
- **Europe (28)**: United Kingdom, Germany, France, Spain, Italy, Netherlands, Russia, Poland, Sweden, Norway, Denmark, Finland, Switzerland, Austria, Belgium, Portugal, Greece, Turkey, Ukraine, Romania, Czech Republic, Hungary, Bulgaria, Croatia, Serbia, Slovakia, Lithuania, Latvia, Estonia, Iceland, Luxembourg, Hong Kong (special)
- **Africa (7)**: South Africa, Nigeria, Egypt, Kenya, Ghana, Ethiopia, Tanzania, Uganda
- **Oceania (3)**: Australia, New Zealand, and more

### Data Quality
- All ISO codes validated against official standards
- Calling codes follow ITU-T E.164 format
- Currency codes follow ISO 4217 standard
- Language codes follow ISO 639-1 standard
- All flags verified and optimized SVGs
- Zero validation errors
- All tests passing

### Technical Details
- Zero runtime dependencies for all packages
- Universal JSON format works in any language
- Lazy loading in packages for performance
- PSR-4 autoloading for PHP
- Type hints and docstrings for Python
- TypeScript definitions for JavaScript
- Clean, consistent API across all languages

---

## Version History Notes

This is the first stable release of CountryKit. Future versions will expand the dataset and add more features while maintaining backward compatibility.

For a full list of changes, see the [commit history](https://github.com/ProgrammerNomad/CountryKit/commits/main).
