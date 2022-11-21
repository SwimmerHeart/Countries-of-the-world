const baseUrl = 'https://restcountries.com/v2/'

export const allUrlBase = baseUrl + 'all?fields=name,capital,flag,population,region'
export const searchCountry = (name:string) => `${baseUrl}name/${name}`
export const filtersCountry = (codes:string[]) => `${baseUrl}alpha?codes=${codes.join(',')}`