import React from 'react';
import styled from "styled-components";
import CountryItem from "./CountryItem";
import {TCountriesProps, TPropsList} from "../types/types";

const CountryListBlock = styled.div<TPropsList>`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: ${ props => props.props.length < 3 ? 'flex-start' : 'space-between'};
  padding-top: 3rem;
  @media (max-width: 1024px){
    gap: 2rem 1rem;
    justify-content: space-around;
  }
  @media (max-width: 767px){
    gap: 1.5rem 0.5rem;
  }
`

const CountryList:React.FC<TCountriesProps> = ({filteredCountry}) => {
    return (
        <CountryListBlock props={filteredCountry}>
            {filteredCountry.map((item:any) => <CountryItem key={item.name} {...item}>{item.name}</CountryItem>)}
        </CountryListBlock>
    );
};

export default CountryList;