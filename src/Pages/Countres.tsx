import React, {useEffect, useState} from 'react';
import Search from "../components/Search";
import Sort from "../components/Sort";
import styled from "styled-components";
import CountryList from "../components/CountryList";
import axios from "axios";
import {allUrlBase} from "../api/api";
import {GetDataAPI} from "../types/types";


const CountriesBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  margin: 0 auto;
  @media (max-width: 767px){
    padding-top: 2rem;
  }
  @media (max-width: 480px){
    padding-top: 1rem;
    flex-direction: column;
  }
`
const Loading = styled.div`
  padding-top: 150px;
  font-size: 30px;
  text-align: center;
`

const Countries:React.FC = () => {
    const [country, setCountry] = useState<GetDataAPI[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<string>('')
    const [filteredCountry, setFilteredCountry] = useState<GetDataAPI[]>([])

    const handlerFilter = (search:string, sort:string) => {
        let data = [...country]
        if (sort) {
            data = data.filter(item => item.region.toLowerCase() === sort.toLowerCase())
        }
        if (search) {
            data = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        setFilteredCountry(data)
    }

    useEffect(() => {
        setIsFetching(false)
        axios.get<GetDataAPI[]>(allUrlBase).then(
            ({data}) => {
                try {
                    setCountry(data)
                    setFilteredCountry(data)
                } catch (err) {
                    console.log('ошибка получения данных с сервера', err)
                } finally {
                    setIsFetching(true)
                }
            }
        )
    }, [])

    useEffect(() => {
        handlerFilter(search, sort)
    }, [search, sort])

    return (
        <>
            <CountriesBlock>
                <Search search={search} setSearch={setSearch}/>
                <Sort sort={sort} setSort={setSort}/>
            </CountriesBlock>
            <CountryList filteredCountry={filteredCountry} search={search}/>
        </>
    );
};
export default Countries;