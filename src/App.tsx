import React from 'react';
import './App.css';
import styled from "styled-components";
import Header from "./components/Header";
import Countries from "./Pages/Countres";
import {Route, Routes} from "react-router-dom";
import DetailsCountry from "./Pages/DetailsCountry";
import NotFound from "./Pages/NotFound";

export const Content = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`

const App:React.FC = () => {
    return (
        <>
            <Header/>
            <Content>
                <Routes>
                    <Route path={'/'} element={<Countries/>}/>
                    <Route path={'/country/:name'} element={<DetailsCountry/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Content>
        </>
    );
}

export default App;
