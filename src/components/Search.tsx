import React from 'react';
import styled from "styled-components";
import {IoSearch} from "react-icons/io5";
import {TSearchProps} from "../types/types";

const InputBlock = styled.div`
  display: flex;
  align-items: center;
  background: var(--color-ui-base);
  border-radius: 8px;
  padding: 1rem 2rem;
  width: 280px;
  height: 50px;
  font-size: 14px;
  @media (max-width: 767px){
    padding: 1rem 1rem;
    width: 200px;
  }
  @media (max-width: 480px){
    width: 100%;
    flex-direction: column;
    margin-bottom: 1rem;
  }
`
const Input = styled.input`
  background-color: var(--color-ui-base);
  color: var(--color-text);
  border: none;
  margin-left: 2rem;
  outline: none;
  @media (max-width: 767px){
    margin-left: 1rem;
  }
`

const Search: React.FC<TSearchProps> = ({search, setSearch}) => {

    return (
        <InputBlock>
            <IoSearch size={'14px'}/>
            <Input type="search"
                   placeholder={'Search for a country'}
                   value={search}
                   onChange={(e)=>setSearch(e.target.value)}
            />
        </InputBlock>
    );
};

export default Search;