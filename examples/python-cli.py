#!/usr/bin/env python3
"""
CountryKit - Python CLI Example

A command-line tool demonstrating how to use CountryKit in Python scripts.

Usage:
    python python-cli.py --help
    python python-cli.py list
    python python-cli.py search "united"
    python python-cli.py info US
    python python-cli.py region Asia
    python python-cli.py currency USD
    python python-cli.py language en
"""

import sys
import os
import argparse
import json

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'packages', 'python'))

# Import CountryKit
import __init__ as countrykit


def format_country(country):
    """Format country info for display"""
    currencies = ', '.join(f"{c['code']} ({c['symbol']})" for c in country.get('currency', []))
    languages = ', '.join(l['name'] for l in country.get('languages', []))
    
    return f"""
{country['flag']['emoji']} {country['name']}
{'=' * 50}
Native Name:   {country['native_name']}
ISO Codes:     {country['cca2']} / {country['cca3']} / {country['ccn3']}
Calling Code:  {country['calling_code']}
Capital:       {country.get('capital', 'N/A')}
Region:        {country.get('region', 'N/A')} ({country.get('subregion', 'N/A')})
TLD:           {country.get('tld', 'N/A')}
Currencies:    {currencies}
Languages:     {languages}
"""


def cmd_list(args):
    """List all countries"""
    countries = countrykit.countries
    
    if args.format == 'json':
        print(json.dumps(countries, indent=2, ensure_ascii=False))
    else:
        print(f"\n{len(countries)} countries in dataset:\n")
        for c in sorted(countries, key=lambda x: x['name']):
            print(f"{c['flag']['emoji']} {c['cca2']:3s} - {c['name']}")


def cmd_info(args):
    """Show detailed info for a country"""
    country = countrykit.get_country_by_iso2(args.code)
    
    if not country:
        country = countrykit.get_country_by_iso3(args.code)
    
    if country:
        if args.format == 'json':
            print(json.dumps(country, indent=2, ensure_ascii=False))
        else:
            print(format_country(country))
    else:
        print(f"❌ Country not found: {args.code}")
        sys.exit(1)


def cmd_search(args):
    """Search countries by name"""
    results = countrykit.search_countries(args.query)
    
    if args.format == 'json':
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        if results:
            print(f"\nFound {len(results)} result(s):\n")
            for c in results:
                print(f"{c['flag']['emoji']} {c['cca2']:3s} - {c['name']}")
        else:
            print(f"❌ No countries found matching: {args.query}")


def cmd_region(args):
    """List countries by region"""
    countries = countrykit.get_countries_by_region(args.region)
    
    if args.format == 'json':
        print(json.dumps(countries, indent=2, ensure_ascii=False))
    else:
        if countries:
            print(f"\n{len(countries)} countries in {args.region}:\n")
            for c in sorted(countries, key=lambda x: x['name']):
                print(f"{c['flag']['emoji']} {c['cca2']:3s} - {c['name']}")
        else:
            print(f"❌ No countries found in region: {args.region}")


def cmd_currency(args):
    """List countries by currency"""
    countries = countrykit.get_countries_by_currency(args.code)
    
    if args.format == 'json':
        print(json.dumps(countries, indent=2, ensure_ascii=False))
    else:
        if countries:
            print(f"\n{len(countries)} countries using {args.code}:\n")
            for c in sorted(countries, key=lambda x: x['name']):
                print(f"{c['flag']['emoji']} {c['cca2']:3s} - {c['name']}")
        else:
            print(f"❌ No countries found using currency: {args.code}")


def cmd_language(args):
    """List countries by language"""
    countries = countrykit.get_countries_by_language(args.code)
    
    if args.format == 'json':
        print(json.dumps(countries, indent=2, ensure_ascii=False))
    else:
        if countries:
            print(f"\n{len(countries)} countries speaking {args.code}:\n")
            for c in sorted(countries, key=lambda x: x['name']):
                print(f"{c['flag']['emoji']} {c['cca2']:3s} - {c['name']}")
        else:
            print(f"❌ No countries found speaking language: {args.code}")


def cmd_stats(args):
    """Show statistics"""
    countries = countrykit.countries
    regions = countrykit.get_all_regions()
    currencies = countrykit.get_all_currencies()
    languages = countrykit.get_all_languages()
    
    if args.format == 'json':
        data = {
            'total_countries': len(countries),
            'total_regions': len(regions),
            'total_currencies': len(currencies),
            'total_languages': len(languages),
            'regions': regions
        }
        print(json.dumps(data, indent=2))
    else:
        print("\nCountryKit Statistics:")
        print("=" * 50)
        print(f"Countries:   {len(countries)}")
        print(f"Regions:     {len(regions)}")
        print(f"Currencies:  {len(currencies)}")
        print(f"Languages:   {len(languages)}")
        print(f"\nRegions: {', '.join(regions)}")


def main():
    parser = argparse.ArgumentParser(
        description='CountryKit CLI - Query country data from the command line',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument('--format', choices=['text', 'json'], default='text',
                       help='Output format (default: text)')
    
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # list command
    subparsers.add_parser('list', help='List all countries')
    
    # info command
    parser_info = subparsers.add_parser('info', help='Show country details')
    parser_info.add_argument('code', help='ISO2 or ISO3 country code')
    
    # search command
    parser_search = subparsers.add_parser('search', help='Search countries by name')
    parser_search.add_argument('query', help='Search query')
    
    # region command
    parser_region = subparsers.add_parser('region', help='List countries by region')
    parser_region.add_argument('region', help='Region name (e.g., Asia, Europe)')
    
    # currency command
    parser_currency = subparsers.add_parser('currency', help='List countries by currency')
    parser_currency.add_argument('code', help='Currency code (e.g., USD, EUR)')
    
    # language command
    parser_language = subparsers.add_parser('language', help='List countries by language')
    parser_language.add_argument('code', help='Language code (e.g., en, es)')
    
    # stats command
    subparsers.add_parser('stats', help='Show statistics')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    # Route to appropriate command
    commands = {
        'list': cmd_list,
        'info': cmd_info,
        'search': cmd_search,
        'region': cmd_region,
        'currency': cmd_currency,
        'language': cmd_language,
        'stats': cmd_stats
    }
    
    try:
        commands[args.command](args)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
