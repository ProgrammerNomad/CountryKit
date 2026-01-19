<?php
/**
 * Test script for CountryKit PHP package
 */

// Load the CountryKit class
require_once __DIR__ . '/packages/php/src/CountryKit.php';

use CountryKit\CountryKit;

echo "============================================================\n";
echo "CountryKit PHP Package Test Suite\n";
echo "============================================================\n";

$errors = 0;

// Test 1: Basic data loading
echo "\nTesting basic data loading...\n";
try {
    $countries = CountryKit::getCountries();
    if (count($countries) > 0) {
        echo "[OK] Loaded " . count($countries) . " countries\n";
    } else {
        echo "[FAIL] No countries loaded\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 2: ISO2 lookup
echo "\nTesting ISO2 lookup...\n";
try {
    $us = CountryKit::getCountryByIso2('US');
    if ($us && $us['name'] === 'United States' && $us['calling_code'] === '+1') {
        echo "[OK] Found {$us['name']} ({$us['cca2']})\n";
    } else {
        echo "[FAIL] ISO2 lookup failed\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 3: ISO3 lookup
echo "\nTesting ISO3 lookup...\n";
try {
    $gbr = CountryKit::getCountryByIso3('GBR');
    if ($gbr && $gbr['name'] === 'United Kingdom') {
        echo "[OK] Found {$gbr['name']} ({$gbr['cca3']})\n";
    } else {
        echo "[FAIL] ISO3 lookup failed\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 4: Calling code lookup
echo "\nTesting calling code lookup...\n";
try {
    $countries = CountryKit::getCountriesByCallingCodeValue('+1');
    if (count($countries) > 0) {
        echo "[OK] Found " . count($countries) . " countries with +1\n";
        foreach ($countries as $c) {
            echo "  - {$c['name']}\n";
        }
    } else {
        echo "[FAIL] No countries found with +1\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 5: Region lookup
echo "\nTesting region lookup...\n";
try {
    $asia = CountryKit::getCountriesByRegion('Asia');
    if (count($asia) > 0) {
        echo "[OK] Found " . count($asia) . " Asian countries\n";
    } else {
        echo "[FAIL] No Asian countries found\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 6: Currency lookup
echo "\nTesting currency lookup...\n";
try {
    $usdCountries = CountryKit::getCountriesByCurrency('USD');
    if (count($usdCountries) > 0) {
        echo "[OK] Found " . count($usdCountries) . " countries using USD\n";
        foreach ($usdCountries as $c) {
            echo "  - {$c['name']}\n";
        }
    } else {
        echo "[FAIL] No USD countries found\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 7: Language lookup
echo "\nTesting language lookup...\n";
try {
    $english = CountryKit::getCountriesByLanguage('en');
    if (count($english) > 0) {
        echo "[OK] Found " . count($english) . " English-speaking countries\n";
    } else {
        echo "[FAIL] No English-speaking countries found\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 8: Search
echo "\nTesting search...\n";
try {
    $results = CountryKit::searchCountries('united');
    if (count($results) > 0) {
        echo "[OK] Found " . count($results) . " countries matching 'united'\n";
        foreach ($results as $c) {
            echo "  - {$c['name']}\n";
        }
    } else {
        echo "[FAIL] No countries found\n";
        $errors++;
    }
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Test 9: Helper functions
echo "\nTesting helper functions...\n";
try {
    $regions = CountryKit::getAllRegions();
    echo "[OK] " . count($regions) . " regions: " . implode(', ', $regions) . "\n";
    
    $subregions = CountryKit::getAllSubregions();
    echo "[OK] " . count($subregions) . " subregions\n";
    
    $currencies = CountryKit::getCurrencies();
    echo "[OK] " . count($currencies) . " currencies\n";
    
    $languages = CountryKit::getLanguages();
    echo "[OK] " . count($languages) . " languages\n";
} catch (Exception $e) {
    echo "[ERROR] Error: " . $e->getMessage() . "\n";
    $errors++;
}

// Summary
echo "\n============================================================\n";
if ($errors === 0) {
    echo "[PASS] All tests passed!\n";
    echo "============================================================\n";
    exit(0);
} else {
    echo "[FAIL] {$errors} test(s) failed\n";
    echo "============================================================\n";
    exit(1);
}
