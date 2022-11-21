export interface GetDataAPI {
    name: string
    population: string | number
    region: string
    capital: string
    flag: string
    independent?: boolean
}
export interface IDetailsCountry extends GetDataAPI{
    nativeName: string
    subregion: string
    topLevelDomain: string[]
    currencies: [{
        code: string
        name: string
        symbol: string
    }]
    languages: [
        {
            "iso639_1": string
            "iso639_2": string
            name: string
            nativeName: string
        }
    ]
    borders?: string[]
}
export type TSearchProps = {
    search: string
    setSearch: (i:string)=>void
}
export type TSortProps = {
    sort: string
    setSort: (i:string)=>void
}
export type TCountriesProps = {
    filteredCountry: GetDataAPI[]
    search: string
}
export type PopupClick = {
    path: Node[]
}
export type TNeighboursCode = string[]
export type TPropsList = {
    props: GetDataAPI[]
}