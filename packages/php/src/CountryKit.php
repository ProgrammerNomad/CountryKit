<?php

namespace CountryKit;

/**
 * CountryKit - Universal country data library
 * 
 * Provides easy access to country data including ISO codes, phone codes,
 * flags, currencies, and languages.
 */
class CountryKit
{
    private static $dataDir;
    private static $countries;
    private static $countriesByIso2;
    private static $countriesByIso3;
    private static $countriesByCallingCode;
    private static $dialCodes;
    private static $currencies;
    private static $languages;

    /**
     * Initialize data directory path
     */
    private static function init()
    {
        if (self::$dataDir === null) {
            self::$dataDir = dirname(__DIR__, 3) . '/data';
        }
    }

    /**
     * Load JSON file
     */
    private static function loadJson($filename)
    {
        self::init();
        $path = self::$dataDir . '/' . $filename;
        if (!file_exists($path)) {
            throw new \Exception("Data file not found: $filename");
        }
        $content = file_get_contents($path);
        return json_decode($content, true);
    }

    /**
     * Get all countries
     * 
     * @return array
     */
    public static function getCountries()
    {
        if (self::$countries === null) {
            self::$countries = self::loadJson('countries.json');
        }
        return self::$countries;
    }

    /**
     * Get countries indexed by ISO2 code
     * 
     * @return array
     */
    public static function getCountriesByIso2()
    {
        if (self::$countriesByIso2 === null) {
            self::$countriesByIso2 = self::loadJson('countries_by_cca2.json');
        }
        return self::$countriesByIso2;
    }

    /**
     * Get countries indexed by ISO3 code
     * 
     * @return array
     */
    public static function getCountriesByIso3()
    {
        if (self::$countriesByIso3 === null) {
            self::$countriesByIso3 = self::loadJson('countries_by_cca3.json');
        }
        return self::$countriesByIso3;
    }

    /**
     * Get countries grouped by calling code
     * 
     * @return array
     */
    public static function getCountriesByCallingCode()
    {
        if (self::$countriesByCallingCode === null) {
            self::$countriesByCallingCode = self::loadJson('countries_by_calling_code.json');
        }
        return self::$countriesByCallingCode;
    }

    /**
     * Get all dial codes
     * 
     * @return array
     */
    public static function getDialCodes()
    {
        if (self::$dialCodes === null) {
            self::$dialCodes = self::loadJson('dial-codes.json');
        }
        return self::$dialCodes;
    }

    /**
     * Get all currencies
     * 
     * @return array
     */
    public static function getCurrencies()
    {
        if (self::$currencies === null) {
            self::$currencies = self::loadJson('currencies.json');
        }
        return self::$currencies;
    }

    /**
     * Get all languages
     * 
     * @return array
     */
    public static function getLanguages()
    {
        if (self::$languages === null) {
            self::$languages = self::loadJson('languages.json');
        }
        return self::$languages;
    }

    /**
     * Get country by ISO 3166-1 alpha-2 code
     * 
     * @param string $code 2-letter ISO code (e.g., 'US', 'GB')
     * @return array|null Country data or null if not found
     */
    public static function getCountryByIso2($code)
    {
        $countries = self::getCountriesByIso2();
        $code = strtoupper($code);
        return $countries[$code] ?? null;
    }

    /**
     * Get country by ISO 3166-1 alpha-3 code
     * 
     * @param string $code 3-letter ISO code (e.g., 'USA', 'GBR')
     * @return array|null Country data or null if not found
     */
    public static function getCountryByIso3($code)
    {
        $countries = self::getCountriesByIso3();
        $code = strtoupper($code);
        return $countries[$code] ?? null;
    }

    /**
     * Get countries by calling code
     * 
     * @param string $callingCode Phone calling code (e.g., '+1', '+44')
     * @return array Array of countries
     */
    public static function getCountriesByCallingCodeValue($callingCode)
    {
        $countries = self::getCountriesByCallingCode();
        // Normalize calling code
        $code = strpos($callingCode, '+') === 0 ? $callingCode : '+' . $callingCode;
        return $countries[$code] ?? [];
    }

    /**
     * Get countries by region
     * 
     * @param string $region Region name (e.g., 'Asia', 'Europe')
     * @return array Array of countries
     */
    public static function getCountriesByRegion($region)
    {
        $countries = self::getCountries();
        $result = [];
        $regionLower = strtolower($region);
        
        foreach ($countries as $country) {
            if (isset($country['region']) && strtolower($country['region']) === $regionLower) {
                $result[] = $country;
            }
        }
        
        return $result;
    }

    /**
     * Get countries by subregion
     * 
     * @param string $subregion Subregion name (e.g., 'Western Europe')
     * @return array Array of countries
     */
    public static function getCountriesBySubregion($subregion)
    {
        $countries = self::getCountries();
        $result = [];
        $subregionLower = strtolower($subregion);
        
        foreach ($countries as $country) {
            if (isset($country['subregion']) && strtolower($country['subregion']) === $subregionLower) {
                $result[] = $country;
            }
        }
        
        return $result;
    }

    /**
     * Get countries by currency code
     * 
     * @param string $currencyCode Currency code (e.g., 'USD', 'EUR')
     * @return array Array of countries
     */
    public static function getCountriesByCurrency($currencyCode)
    {
        $countries = self::getCountries();
        $result = [];
        $code = strtoupper($currencyCode);
        
        foreach ($countries as $country) {
            if (isset($country['currency'])) {
                foreach ($country['currency'] as $currency) {
                    if ($currency['code'] === $code) {
                        $result[] = $country;
                        break;
                    }
                }
            }
        }
        
        return $result;
    }

    /**
     * Get countries by language code
     * 
     * @param string $languageCode Language code (e.g., 'en', 'es', 'fr')
     * @return array Array of countries
     */
    public static function getCountriesByLanguage($languageCode)
    {
        $countries = self::getCountries();
        $result = [];
        $code = strtolower($languageCode);
        
        foreach ($countries as $country) {
            if (isset($country['languages'])) {
                foreach ($country['languages'] as $language) {
                    if (strtolower($language['code']) === $code) {
                        $result[] = $country;
                        break;
                    }
                }
            }
        }
        
        return $result;
    }

    /**
     * Search countries by name or native name
     * 
     * @param string $query Search query
     * @return array Array of matching countries
     */
    public static function searchCountries($query)
    {
        $countries = self::getCountries();
        $result = [];
        $queryLower = strtolower($query);
        
        foreach ($countries as $country) {
            $nameMatch = isset($country['name']) && 
                        strpos(strtolower($country['name']), $queryLower) !== false;
            $nativeMatch = isset($country['native_name']) && 
                          strpos(strtolower($country['native_name']), $queryLower) !== false;
            
            if ($nameMatch || $nativeMatch) {
                $result[] = $country;
            }
        }
        
        return $result;
    }

    /**
     * Get all unique regions
     * 
     * @return array Array of region names
     */
    public static function getAllRegions()
    {
        $countries = self::getCountries();
        $regions = [];
        
        foreach ($countries as $country) {
            if (isset($country['region']) && !in_array($country['region'], $regions)) {
                $regions[] = $country['region'];
            }
        }
        
        sort($regions);
        return $regions;
    }

    /**
     * Get all unique subregions
     * 
     * @return array Array of subregion names
     */
    public static function getAllSubregions()
    {
        $countries = self::getCountries();
        $subregions = [];
        
        foreach ($countries as $country) {
            if (isset($country['subregion']) && !in_array($country['subregion'], $subregions)) {
                $subregions[] = $country['subregion'];
            }
        }
        
        sort($subregions);
        return $subregions;
    }
}
