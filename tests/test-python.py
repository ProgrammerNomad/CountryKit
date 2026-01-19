"""
Test script for CountryKit Python package
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'packages', 'python'))

# Import the module directly
import __init__ as countrykit

def test_basic_data():
    """Test that data loads correctly"""
    print("Testing basic data loading...")
    assert len(countrykit.countries) > 0, "Countries should not be empty"
    assert len(countrykit.currencies) > 0, "Currencies should not be empty"
    assert len(countrykit.languages) > 0, "Languages should not be empty"
    print(f"[OK] Loaded {len(countrykit.countries)} countries")

def test_lookup_by_iso2():
    """Test ISO2 lookup"""
    print("\nTesting ISO2 lookup...")
    us = countrykit.get_country_by_iso2('US')
    assert us is not None, "US should be found"
    assert us['name'] == 'United States', "Name should match"
    assert us['calling_code'] == '+1', "Calling code should match"
    print(f"[OK] Found {us['name']} ({us['cca2']})")

def test_lookup_by_iso3():
    """Test ISO3 lookup"""
    print("\nTesting ISO3 lookup...")
    gbr = countrykit.get_country_by_iso3('GBR')
    assert gbr is not None, "GBR should be found"
    assert gbr['name'] == 'United Kingdom', "Name should match"
    print(f"[OK] Found {gbr['name']} ({gbr['cca3']})")

def test_by_calling_code():
    """Test calling code lookup"""
    print("\nTesting calling code lookup...")
    countries = countrykit.get_countries_by_calling_code('+1')
    assert len(countries) > 0, "Should find countries with +1"
    print(f"[OK] Found {len(countries)} countries with +1")
    for c in countries:
        print(f"  - {c['name']}")

def test_by_region():
    """Test region lookup"""
    print("\nTesting region lookup...")
    asia = countrykit.get_countries_by_region('Asia')
    assert len(asia) > 0, "Should find Asian countries"
    print(f"[OK] Found {len(asia)} Asian countries")

def test_by_currency():
    """Test currency lookup"""
    print("\nTesting currency lookup...")
    usd_countries = countrykit.get_countries_by_currency('USD')
    assert len(usd_countries) > 0, "Should find USD countries"
    print(f"[OK] Found {len(usd_countries)} countries using USD")
    for c in usd_countries:
        print(f"  - {c['name']}")

def test_by_language():
    """Test language lookup"""
    print("\nTesting language lookup...")
    english = countrykit.get_countries_by_language('en')
    assert len(english) > 0, "Should find English-speaking countries"
    print(f"[OK] Found {len(english)} English-speaking countries")

def test_search():
    """Test search functionality"""
    print("\nTesting search...")
    results = countrykit.search_countries('united')
    assert len(results) > 0, "Should find countries with 'united'"
    print(f"[OK] Found {len(results)} countries matching 'united'")
    for c in results:
        print(f"  - {c['name']}")

def test_helper_functions():
    """Test helper functions"""
    print("\nTesting helper functions...")
    
    regions = countrykit.get_all_regions()
    assert len(regions) > 0, "Should have regions"
    print(f"[OK] {len(regions)} regions: {', '.join(regions)}")
    
    subregions = countrykit.get_all_subregions()
    assert len(subregions) > 0, "Should have subregions"
    print(f"[OK] {len(subregions)} subregions")
    
    currencies = countrykit.get_all_currencies()
    assert len(currencies) > 0, "Should have currencies"
    print(f"[OK] {len(currencies)} currencies")
    
    languages = countrykit.get_all_languages()
    assert len(languages) > 0, "Should have languages"
    print(f"[OK] {len(languages)} languages")

def main():
    """Run all tests"""
    print("=" * 60)
    print("CountryKit Python Package Test Suite")
    print("=" * 60)
    
    try:
        test_basic_data()
        test_lookup_by_iso2()
        test_lookup_by_iso3()
        test_by_calling_code()
        test_by_region()
        test_by_currency()
        test_by_language()
        test_search()
        test_helper_functions()
        
        print("\n" + "=" * 60)
        print("[PASS] All tests passed!")
        print("=" * 60)
        return 0
    except AssertionError as e:
        print(f"\n[FAIL] Test failed: {e}")
        return 1
    except Exception as e:
        print(f"\n[ERROR] Error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == '__main__':
    sys.exit(main())
