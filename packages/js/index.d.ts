// TypeScript definitions for CountryKit

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Flag {
  emoji: string;
  svg: string;
}

export interface Country {
  cca2: string;
  cca3: string;
  ccn3: string;
  name: string;
  native_name: string;
  calling_code: string;
  currency: Currency[];
  languages: Language[];
  flag: Flag;
  capital: string;
  region: string;
  subregion: string;
  tld: string;
}

export interface DialCode {
  code: string;
  countries: string[];
}

export interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
  countries: string[];
}

export interface LanguageData {
  code: string;
  name: string;
  countries: string[];
}

export interface CountryLookupByCca2 {
  [key: string]: Country;
}

export interface CountryLookupByCca3 {
  [key: string]: Country;
}

export interface CountryLookupByCallingCode {
  [key: string]: Country[];
}

// Raw data exports
export const countries: Country[];
export const dialCodes: DialCode[];
export const currencies: CurrencyData[];
export const languages: LanguageData[];

// Lookup maps
export const byCca2: CountryLookupByCca2;
export const byCca3: CountryLookupByCca3;
export const byCallingCode: CountryLookupByCallingCode;

// Helper functions
export function getCountryByISO2(code: string): Country | null;
export function getCountryByISO3(code: string): Country | null;
export function getCountriesByCallingCode(code: string): Country[];
export function getCountriesByRegion(region: string): Country[];
export function getCountriesByCurrency(currencyCode: string): Country[];
export function getCountriesByLanguage(languageCode: string): Country[];
export function getAllCountries(): Country[];
export function getAllCurrencies(): CurrencyData[];
export function getAllLanguages(): LanguageData[];
export function getAllDialCodes(): DialCode[];
