import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {IoMoonOutline, IoMoon} from "react-icons/io5";
import {Link} from "react-router-dom";
import {Content} from "../App";

const HeaderElem = styled.header`
  background: var(--color-ui-base);
  color: var(--color-text);
  width: 100%;
`
const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  @media(max-width: 480px){
    padding: 2rem 1rem;
  }
`
const Title = styled.h1`
  font-size: 1rem;
  color: var(--color-text);
  padding-right: 10px;
`

const Button = styled.button`
  background: var(--color-ui-base);
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 300;
  border: none;
  cursor: pointer;

`
const Header = () => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <HeaderElem>
            <Content>
            <HeaderBlock>
                <Link to={'/'} style={{textDecoration: 'none'}}><Title>Where is the world?</Title></Link>
                <Button onClick={toggleTheme}>
                    {theme === 'light' ? <IoMoonOutline/> : <IoMoon/>}
                    <span style={{marginLeft: '10px', textTransform: 'capitalize'}}>{theme} Mode</span>
                </Button>
            </HeaderBlock>
            </Content>
        </HeaderElem>
    );
};

export default Header;