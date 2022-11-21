import React from 'react';
import styled from "styled-components";

const NotFoundBlock = styled.h1`
  font-size: 2rem;
  margin: 4rem auto;
  text-align: center;
`

const NotFound = () => {
    return (
        <NotFoundBlock>
            К сожалению, данной страницы у нас нет.
        </NotFoundBlock>
    );
};

export default NotFound;