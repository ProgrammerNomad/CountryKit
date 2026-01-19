"""
CountryKit Python Package
Universal country data library with ISO codes, phone codes, flags, currencies, and languages.
"""

import json
import os

__version__ = "1.0.0"
__author__ = "CountryKit Contributors"
__license__ = "MIT"

# Get the path to data directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, "data")

# Load data files
def _load_json(filename):
    """Helper function to load JSON files"""
    with open(os.path.join(DATA_DIR, filename), 'r', encoding='utf-8') as f:
        return json.load(f)

# Load all data
countries = _load_json("countries.json")
countries_by_cca2 = _load_json("countries_by_cca2.json")
countries_by_cca3 = _load_json("countries_by_cca3.json")
countries_by_calling_code = _load_json("countries_by_calling_code.json")
dial_codes = _load_json("dial-codes.json")
currencies = _load_json("currencies.json")
languages = _load_json("languages.json")


# Helper Functions
def get_country_by_iso2(code):
    """
    Get country by ISO 3166-1 alpha-2 code (e.g., 'US', 'GB')
    
    Args:
        code (str): 2-letter ISO code
        
    Returns:
        dict: Country object or None
    """
    return countries_by_cca2.get(code.upper())


def get_country_by_iso3(code):
    """
    Get country by ISO 3166-1 alpha-3 code (e.g., 'USA', 'GBR')
    
    Args:
        code (str): 3-letter ISO code
        
    Returns:
        dict: Country object or None
    """
    return countries_by_cca3.get(code.upper())


def get_countries_by_calling_code(calling_code):
    """
    Get all countries with a specific calling code
    
    Args:
        calling_code (str): Phone calling code (e.g., '+1', '+44')
        
    Returns:
        list: Array of country objects
    """
    # Normalize calling code
    code = calling_code if calling_code.startswith('+') else f'+{calling_code}'
    return countries_by_calling_code.get(code, [])


def get_countries_by_region(region):
    """
    Get all countries in a region
    
    Args:
        region (str): Region name (e.g., 'Asia', 'Europe')
        
    Returns:
        list: Array of country objects
    """
    return [c for c in countries if c.get('region', '').lower() == region.lower()]


def get_countries_by_subregion(subregion):
    """
    Get all countries in a subregion
    
    Args:
        subregion (str): Subregion name (e.g., 'Western Europe', 'Southern Asia')
        
    Returns:
        list: Array of country objects
    """
    return [c for c in countries if c.get('subregion', '').lower() == subregion.lower()]


def get_countries_by_currency(currency_code):
    """
    Get all countries that use a specific currency
    
    Args:
        currency_code (str): Currency code (e.g., 'USD', 'EUR')
        
    Returns:
        list: Array of country objects
    """
    currency_code = currency_code.upper()
    result = []
    for country in countries:
        if any(c['code'] == currency_code for c in country.get('currency', [])):
            result.append(country)
    return result


def get_countries_by_language(language_code):
    """
    Get all countries that speak a specific language
    
    Args:
        language_code (str): Language code (e.g., 'en', 'es', 'fr')
        
    Returns:
        list: Array of country objects
    """
    language_code = language_code.lower()
    result = []
    for country in countries:
        if any(l['code'] == language_code for l in country.get('languages', [])):
            result.append(country)
    return result


def search_countries(query):
    """
    Search countries by name or native name
    
    Args:
        query (str): Search query
        
    Returns:
        list: Array of matching country objects
    """
    query_lower = query.lower()
    result = []
    for country in countries:
        if (query_lower in country.get('name', '').lower() or 
            query_lower in country.get('native_name', '').lower()):
            result.append(country)
    return result


def get_all_regions():
    """
    Get list of all unique regions
    
    Returns:
        list: Array of region names
    """
    regions = set()
    for country in countries:
        if country.get('region'):
            regions.add(country['region'])
    return sorted(list(regions))


def get_all_subregions():
    """
    Get list of all unique subregions
    
    Returns:
        list: Array of subregion names
    """
    subregions = set()
    for country in countries:
        if country.get('subregion'):
            subregions.add(country['subregion'])
    return sorted(list(subregions))


def get_all_currencies():
    """
    Get list of all currencies with their details
    
    Returns:
        list: Array of currency objects
    """
    return currencies


def get_all_languages():
    """
    Get list of all languages with their details
    
    Returns:
        list: Array of language objects
    """
    return languages


def get_all_calling_codes():
    """
    Get list of all calling codes with country mappings
    
    Returns:
        list: Array of calling code objects
    """
    return dial_codes


# Export public API
__all__ = [
    'countries',
    'countries_by_cca2',
    'countries_by_cca3',
    'countries_by_calling_code',
    'dial_codes',
    'currencies',
    'languages',
    'get_country_by_iso2',
    'get_country_by_iso3',
    'get_countries_by_calling_code',
    'get_countries_by_region',
    'get_countries_by_subregion',
    'get_countries_by_currency',
    'get_countries_by_language',
    'search_countries',
    'get_all_regions',
    'get_all_subregions',
    'get_all_currencies',
    'get_all_languages',
    'get_all_calling_codes',
]
