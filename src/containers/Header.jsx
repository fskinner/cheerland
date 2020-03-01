import React from "react";
import styled from "styled-components";
import {
  Link,
} from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #fff;
  height: 70px;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  width: 60%;
`

const LinkList = styled.ul`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <LinkList>
          <li>
            <StyledLink to="/">Início</StyledLink>
          </li>
          <li>
            <StyledLink to="/rooms">Quartos</StyledLink>
          </li>
          <li>
            <StyledLink to="/login">Entrar</StyledLink>
          </li>
        </LinkList>
      </Nav>
      
    </HeaderContainer>
  );
};

export default Header;
