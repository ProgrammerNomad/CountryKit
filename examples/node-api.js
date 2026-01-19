/**
 * CountryKit - Node.js REST API Example
 * 
 * Simple Express API demonstrating how to use CountryKit in a backend service
 * 
 * Install dependencies:
 *   npm init -y
 *   npm install express
 * 
 * Run:
 *   node node-api.js
 * 
 * Test endpoints:
 *   http://localhost:3000/countries
 *   http://localhost:3000/country/US
 *   http://localhost:3000/countries/region/Asia
 *   http://localhost:3000/countries/currency/USD
 *   http://localhost:3000/countries/language/en
 *   http://localhost:3000/search?q=united
 */

const express = require('express');
const path = require('path');

// Load CountryKit data directly
const countries = require('../data/countries.json');
const countriesByISO2 = require('../data/countries_by_cca2.json');
const countriesByISO3 = require('../data/countries_by_cca3.json');
const countriesByCallingCode = require('../data/countries_by_calling_code.json');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes

// Get all countries
app.get('/countries', (req, res) => {
    res.json({
        success: true,
        count: countries.length,
        data: countries
    });
});

// Get country by ISO2 or ISO3 code
app.get('/country/:code', (req, res) => {
    const code = req.params.code.toUpperCase();
    let country;

    if (code.length === 2) {
        country = countriesByISO2[code];
    } else if (code.length === 3) {
        country = countriesByISO3[code];
    }

    if (country) {
        res.json({
            success: true,
            data: country
        });
    } else {
        res.status(404).json({
            success: false,
            error: 'Country not found'
        });
    }
});

// Get countries by region
app.get('/countries/region/:region', (req, res) => {
    const region = req.params.region;
    const filtered = countries.filter(c => 
        c.region && c.region.toLowerCase() === region.toLowerCase()
    );

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// Get countries by currency
app.get('/countries/currency/:code', (req, res) => {
    const currencyCode = req.params.code.toUpperCase();
    const filtered = countries.filter(c =>
        c.currency && c.currency.some(curr => curr.code === currencyCode)
    );

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// Get countries by language
app.get('/countries/language/:code', (req, res) => {
    const langCode = req.params.code.toLowerCase();
    const filtered = countries.filter(c =>
        c.languages && c.languages.some(lang => lang.code.toLowerCase() === langCode)
    );

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// Get countries by calling code
app.get('/countries/calling-code/:code', (req, res) => {
    const code = req.params.code.startsWith('+') ? req.params.code : '+' + req.params.code;
    const filtered = countriesByCallingCode[code] || [];

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// Search countries
app.get('/search', (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({
            success: false,
            error: 'Query parameter "q" is required'
        });
    }

    const queryLower = query.toLowerCase();
    const results = countries.filter(c =>
        c.name.toLowerCase().includes(queryLower) ||
        c.native_name.toLowerCase().includes(queryLower) ||
        c.cca2.toLowerCase() === queryLower ||
        c.cca3.toLowerCase() === queryLower
    );

    res.json({
        success: true,
        count: results.length,
        data: results
    });
});

// Get statistics
app.get('/stats', (req, res) => {
    const regions = new Set();
    const currencies = new Set();
    const languages = new Set();

    countries.forEach(c => {
        if (c.region) regions.add(c.region);
        c.currency?.forEach(curr => currencies.add(curr.code));
        c.languages?.forEach(lang => languages.add(lang.code));
    });

    res.json({
        success: true,
        data: {
            total_countries: countries.length,
            total_regions: regions.size,
            total_currencies: currencies.size,
            total_languages: languages.size,
            regions: Array.from(regions).sort()
        }
    });
});

// API documentation
app.get('/', (req, res) => {
    res.json({
        name: 'CountryKit API',
        version: '1.0.0',
        endpoints: {
            'GET /countries': 'Get all countries',
            'GET /country/:code': 'Get country by ISO2 or ISO3 code',
            'GET /countries/region/:region': 'Get countries by region',
            'GET /countries/currency/:code': 'Get countries by currency code',
            'GET /countries/language/:code': 'Get countries by language code',
            'GET /countries/calling-code/:code': 'Get countries by calling code',
            'GET /search?q=query': 'Search countries by name',
            'GET /stats': 'Get statistics'
        },
        examples: {
            country: '/country/US',
            region: '/countries/region/Asia',
            currency: '/countries/currency/USD',
            language: '/countries/language/en',
            calling_code: '/countries/calling-code/+1',
            search: '/search?q=united'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     CountryKit REST API Example           ║
╚════════════════════════════════════════════╝

Server running on http://localhost:${PORT}

Try these endpoints:
  → http://localhost:${PORT}/
  → http://localhost:${PORT}/countries
  → http://localhost:${PORT}/country/US
  → http://localhost:${PORT}/countries/region/Asia
  → http://localhost:${PORT}/search?q=united

Press Ctrl+C to stop
    `);
});
