/**
 * Complete CountryKit Dataset - Add All Missing Countries
 * Fetches data from mledoze/countries GitHub repo and updates/merges with existing data
 */

const fs = require('fs');
const https = require('https');

// Load existing countries
const existing = JSON.parse(fs.readFileSync('data/countries.json', 'utf-8'));
const existingByCca2 = new Map(existing.map(c => [c.cca2, c]));
console.log(`Existing countries: ${existing.length}`);

// Fetch all countries from API
console.log('Fetching all countries from mledoze/countries...');

https.get('https://raw.githubusercontent.com/mledoze/countries/master/countries.json', (res) => {
    let data = '';
    
    console.log(`Status: ${res.statusCode}`);
    res.on('data', chunk => data += chunk);
    
    res.on('end', () => {
        try {
            const allCountries = JSON.parse(data);
            
            if (!Array.isArray(allCountries)) {
                console.error('Error: API did not return an array');
                process.exit(1);
            }
            
            console.log(`Received ${allCountries.length} countries from API`);
        
        let newCount = 0;
        let updatedCount = 0;
        
        allCountries.forEach(country => {
            const cca2 = country.cca2 || '';
            if (!cca2) return;
            
            // Extract currencies
            const currencies = [];
            if (country.currencies && typeof country.currencies === 'object') {
                Object.entries(country.currencies).forEach(([code, info]) => {
                    currencies.push({
                        code: code,
                        name: info.name || code,
                        symbol: info.symbol || ''
                    });
                });
            }
            
            // Extract languages
            const languages = [];
            if (country.languages && typeof country.languages === 'object') {
                Object.entries(country.languages).forEach(([code, name]) => {
                    languages.push({
                        code: code,
                        name: name
                    });
                });
            }
            
            // Get native name
            let nativeName = country.name?.common || country.name?.official || '';
            if (country.name?.native) {
                const firstNative = Object.values(country.name.native)[0];
                if (firstNative?.common) {
                    nativeName = firstNative.common;
                }
            }
            
            // Get calling code
            let callingCode = '';
            if (country.idd?.root) {
                const suffix = country.idd.suffixes?.[0] || '';
                callingCode = country.idd.root + suffix;
            }
            
            // Build country object
            const countryData = {
                cca2: country.cca2 || '',
                cca3: country.cca3 || '',
                ccn3: country.ccn3 || '',
                name: country.name?.common || '',
                native_name: nativeName,
                calling_code: callingCode,
                currency: currencies.length ? currencies : [{ code: 'N/A', name: 'N/A', symbol: '' }],
                languages: languages.length ? languages : [{ code: 'en', name: 'English' }],
                flag: {
                    emoji: country.flag || '',
                    svg: `flags/${cca2.toLowerCase()}.svg`
                },
                capital: country.capital?.[0] || '',
                region: country.region || '',
                subregion: country.subregion || '',
                tld: country.tld?.[0] || ''
            };
            
            // Update existing or add new
            if (existingByCca2.has(cca2)) {
                const existingCountry = existingByCca2.get(cca2);
                // Update only if fields are missing or empty
                if (!existingCountry.calling_code || existingCountry.calling_code === '') {
                    existingCountry.calling_code = countryData.calling_code;
                    updatedCount++;
                }
                if (!existingCountry.currency || existingCountry.currency.length === 0 || existingCountry.currency[0].code === 'N/A') {
                    if (countryData.currency[0].code !== 'N/A') {
                        existingCountry.currency = countryData.currency;
                    }
                }
                if (!existingCountry.languages || existingCountry.languages.length === 0) {
                    existingCountry.languages = countryData.languages;
                }
                if (!existingCountry.native_name || existingCountry.native_name === existingCountry.name) {
                    existingCountry.native_name = countryData.native_name;
                }
                existingByCca2.set(cca2, existingCountry);
            } else {
                existingByCca2.set(cca2, countryData);
                newCount++;
            }
        });
        
        // Convert Map back to sorted array
        const allData = Array.from(existingByCca2.values());
        allData.sort((a, b) => a.name.localeCompare(b.name));
        
        // Save updated data
        fs.writeFileSync(
            'data/countries.json',
            JSON.stringify(allData, null, 2),
            'utf-8'
        );
        
        console.log(`\n[OK] Complete! Total countries: ${allData.length}`);
        console.log(`[OK] Added ${newCount} new countries`);
        console.log(`[OK] Updated ${updatedCount} countries with missing data`);
        console.log(`\nRun these commands next:`);
        console.log(`  node scripts/auto-generate.js`);
        console.log(`  node scripts/download-flags.js`);
        console.log(`  node tests/test-data.js`);
        } catch (error) {
            console.error('Error:', error.message);
            process.exit(1);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching data:', err.message);
    process.exit(1);
});
