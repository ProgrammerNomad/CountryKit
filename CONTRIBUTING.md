# Contributing to CountryKit

Thank you for considering contributing to CountryKit! We welcome contributions from the community.

## Ways to Contribute

- **Add/Fix Country Data** - Update incorrect information, add missing countries
- **Add Flags** - Contribute SVG flags for countries
- **Improve Documentation** - Fix typos, clarify explanations, add examples
- **Add Language Packages** - Create wrappers for Go, Ruby, Rust, etc.
- **Report Bugs** - Open issues for data errors or bugs
- **Suggest Features** - Propose new features or improvements

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/ProgrammerNomad/CountryKit.git
   cd CountryKit
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Edit the relevant files
   - Follow the existing code style and structure

4. **Run validation**
   ```bash
   node scripts/validate.js
   node test.js
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes clearly

## Data Contribution Guidelines

### Adding/Updating Countries

1. **Edit `data/countries.json`** directly
2. Follow the existing structure exactly:
   ```json
   {
     "cca2": "US",
     "cca3": "USA",
     "ccn3": "840",
     "name": "United States",
     "native_name": "United States",
     "calling_code": "+1",
     "capital": "Washington, D.C.",
     "region": "Americas",
     "subregion": "Northern America",
     "tld": ".us",
     "currency": [
       {
         "code": "USD",
         "name": "United States Dollar",
         "symbol": "$"
       }
     ],
     "languages": [
       {
         "code": "en",
         "name": "English"
       }
     ],
     "flag": {
       "emoji": "🇺🇸",
       "svg": "flags/US.svg"
     }
   }
   ```

3. **Required fields:**
   - `cca2`, `cca3`, `ccn3` (ISO codes)
   - `name`, `native_name`
   - `calling_code`
   - `currency` (array, at least one)
   - `languages` (array, at least one)
   - `flag.emoji`, `flag.svg`

4. **Optional fields:**
   - `capital`, `region`, `subregion`, `tld`

5. **After editing, regenerate dependent files:**
   ```bash
   node scripts/auto-generate.js
   ```

6. **Validate your changes:**
   ```bash
   node scripts/validate.js
   node test.js
   ```

### Adding Flags

1. Place SVG files in the `flags/` directory
2. Name them using ISO2 code: `US.svg`, `GB.svg`, etc.
3. Ensure SVG is clean and optimized
4. Update the country's `flag.svg` path in `countries.json`

### Data Quality Standards

- **ISO Codes**: Use official ISO 3166-1 codes
- **Calling Codes**: Follow E.164 format (include `+`)
- **Currency Codes**: Use ISO 4217 codes
- **Language Codes**: Use ISO 639-1 (2-letter) codes
- **Native Names**: Use the most common official native name
- **Accuracy**: Verify information from official sources

## Code Style

### JavaScript

- Use ES6+ features
- 2 spaces for indentation
- Semicolons required
- Clear variable names
- Add comments for complex logic

### Python

- Follow PEP 8
- 4 spaces for indentation
- Use docstrings for functions
- Type hints where appropriate

### PHP

- Follow PSR-12
- 4 spaces for indentation
- Use type declarations
- DocBlocks for all public methods

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add: <description>` - New features or data
- `Fix: <description>` - Bug fixes or data corrections
- `Update: <description>` - Updates to existing features/data
- `Docs: <description>` - Documentation changes
- `Test: <description>` - Test-related changes
- `Refactor: <description>` - Code refactoring

Examples:
```
Add: French Polynesia country data
Fix: Incorrect calling code for Brazil
Update: Currency symbol for Indian Rupee
Docs: Add PHP usage examples to README
```

## Pull Request Guidelines

- **Title**: Clear and descriptive
- **Description**: Explain what changes you made and why
- **Testing**: Confirm you've run validation and tests
- **Screenshots**: Include for UI changes (flag-preview.html)
- **Breaking Changes**: Clearly mark any breaking changes

## Testing

Before submitting a PR, ensure all tests pass:

```bash
# Data validation
node scripts/validate.js

# Data tests
node test.js

# Package tests
node test-package.js
python test-python.py
php test-php.php
```

## Adding New Language Packages

To add a package for a new language (e.g., Go, Ruby, Rust):

1. Create `packages/<language>/` directory
2. Follow the same structure as existing packages
3. Implement the same helper functions:
   - Get country by ISO2/ISO3
   - Get countries by calling code, region, currency, language
   - Search countries
4. Add README with usage examples
5. Add test file following `test-<language>.<ext>` pattern
6. Update main README with the new package

## Questions?

If you have questions or need help:

- Open an issue for discussion
- Check existing issues and PRs
- Review the README and package documentation

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Accept constructive criticism gracefully

## License

By contributing to CountryKit, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to CountryKit!
