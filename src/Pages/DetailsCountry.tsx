import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {filtersCountry, searchCountry} from "../api/api";
import {IoArrowBack} from "react-icons/io5";
import {IDetailsCountry, TNeighboursCode} from "../types/types";
// import {GetDataAPI, IDetailsCountry} from "../types/types";



const DetailsCountryBlock = styled.div`
  width: 100%;
  background-color: var(--color-bg);
  color: var(--color-text);
  display: grid;
  gap: 3rem;
  align-items: center;
  height: 450px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    justify-content: center;
    gap: 2rem;
  }

`
const Button = styled.button`
  padding: 0 1rem;
  border-radius: 8px;
  background-color: var(--color-ui-base);
  color: var(--color-text);
  border: none;
  width: 80px;
  height: 40px;
  line-height: 2;
  margin: 3rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1024px) {
    margin: 2rem 0;
  }
  @media (max-width: 767px) {
    margin: 1rem 0;
  }
`
const CountryFlag = styled.img.attrs({
    alt: 'flag-country'
})`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const CountryDescription = styled.div`


`
const Title = styled.h1`
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  padding: 0 1rem;
  @media (max-width: 767px){
    margin: 0.5rem 0;
  }
`
const ListGroupBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ListGroup = styled.div`
  :first-child {
    margin-bottom: 2rem;
  }
  @media (max-width: 767px){
    :first-child {
      margin-bottom: 1rem;
    }
  }
`
const List = styled.ul`
  list-style: none;
  line-height: 2;

`
const ListItem = styled.li`
  padding: 0 1rem;
`
const BorderCountry = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`
const BorderGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`
const BorderItem = styled.span`
  cursor: pointer;
  background-color: var(--color-ui-base);
  color: var(--color-text);
  border-radius: 6px;
`


const DetailsCountry:React.FC = () => {
    const [country, setCountry] = useState<IDetailsCountry>({
        name: '',
        flag: '',
        nativeName: '',
        population: '',
        region: '',
        subregion: '',
        capital: '',
        topLevelDomain: [],
        currencies: [{
            code: '',
            name: '',
            symbol: ''
        }],
        languages: [
            {
                "iso639_1": '',
                "iso639_2": '',
                name: '',
                nativeName: ''
            }
        ]
    })
    const navigate = useNavigate()
    const {name} = useParams<{name?: string}>()
    const [neighboursCode, setNeighboursCode] = useState<TNeighboursCode>([])
    const [neighbours, setNeighbours] = useState<string[]>([])
    const goBack = () => navigate(-1)

    useEffect(() => {

        name && axios.get<IDetailsCountry[]>(searchCountry(name)).then(
            ({data}) => {
                try {
                    const temp = data[0]
                    setCountry(temp)
                    temp.borders && setNeighboursCode(temp.borders)
                } catch (err) {
                    console.log('ошибка получения расширенных данных с сервера', err)
                }
            }
        )
    }, [name])

    useEffect(() => {
        if (neighboursCode.length) {
            axios.get<IDetailsCountry[]>(filtersCountry(neighboursCode)).then(
                ({data}) => {
                    try {
                        setNeighbours(data.map(b => b.name))
                    } catch (err) {
                        console.log('ошибка получения данных с сервера', err)
                    }
                }
            )
        }
    }, [neighboursCode])

    const Goto = (name:string) => {
        navigate(`/country/${name}`)
    }

    return (
        <div>
            <Button onClick={goBack}><IoArrowBack/><span>Back</span></Button>
            <DetailsCountryBlock>
                <CountryFlag src={country.flag}/>
                <CountryDescription>
                    <Title>{name}</Title>
                    <ListGroupBlock>
                        <ListGroup>
                            <List>
                                <ListItem><b>Native Name:</b> {country.nativeName}</ListItem>
                                <ListItem><b>Population:</b> {country.population}</ListItem>
                                <ListItem><b>Region:</b> {country.region}</ListItem>
                                <ListItem><b>Sub Region:</b> {country.subregion}</ListItem>
                                <ListItem><b>Capital:</b> {country.capital}</ListItem>
                            </List>
                        </ListGroup>
                        <ListGroup>
                            <List>
                                <ListItem><b>Top Level Domain: </b>{country.topLevelDomain.map((d,index) => <span
                                    key={index}>{d}</span>)}
                                </ListItem>
                                <ListItem><b>Currencies:</b> {country.currencies.map((c) => <span
                                    key={c.symbol}>{c.name}</span>)}
                                </ListItem>
                                <ListItem><b>Languages:</b> {country.languages.map((l) => <span
                                    key={l.nativeName}>{l.name}</span>)}
                                </ListItem>
                            </List>
                        </ListGroup>
                    </ListGroupBlock>
                    <BorderCountry>
                        <b>Border Countries:</b>
                        <BorderGroup>
                            {neighbours.length ? neighbours.map(b => <BorderItem key={b}
                                                                                 onClick={() => Goto(b)}>{b} </BorderItem>)
                                : <span>This no border countries</span>}
                        </BorderGroup>
                    </BorderCountry>
                </CountryDescription>
            </DetailsCountryBlock>
        </div>
    );
};

export default DetailsCountry;