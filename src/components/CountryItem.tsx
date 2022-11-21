import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {GetDataAPI} from "../types/types";

const CountryItemBlock = styled.div`
  width: 250px;
  height: 300px;
  background-color: var(--color-ui-base);
  color: var(--color-text);
  border-radius: 10px;
  justify-self: center;
  cursor: pointer;
  overflow: hidden;
`
const CountryImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: center;
`
const DescriptionBlock = styled.div`
  padding: 16px 24px 32px;
  font-size: 16px;
  h3{
    margin-bottom: 10px;
  }
  li{
    list-style: none;
    margin: 0;
  }
`

const CountryItem:React.FC<GetDataAPI> = ({name, population, region, capital, flag}) => {
    const navigate = useNavigate()

    return (
        <CountryItemBlock onClick={()=>navigate(`/country/${name}`)}>
            <CountryImg src={flag} alt="flag country"/>
            <DescriptionBlock>
                <h3>{name}</h3>
                <ul>
                    <li><b>Population:</b> {population}</li>
                    <li><b>Region:</b> {region}</li>
                    <li><b>Capital:</b> {capital}</li>
                </ul>
            </DescriptionBlock>
        </CountryItemBlock>
    );
};

export default CountryItem;