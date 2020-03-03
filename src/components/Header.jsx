import React from "react";
import styled from "styled-components";
import {
  Link,
} from "react-router-dom";

import { useAuth } from "hooks/use-auth.js";

const HeaderContainer = styled.header`
  background-color: #f1eded;
  height: 70px;
  color: black;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const Nav = styled.nav`
  width: 60%;
`

const LinkList = styled.ul`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const UserGreeting = styled.span`
`

const Header = () => {
  const auth = useAuth();

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
          {auth.user &&
            <li>
              <UserGreeting>Olá, {auth.user.name}</UserGreeting>
            </li>
          }
          {
            auth.user ?
              <StyledLink to="/login" onClick={auth.deauth}>Sair</StyledLink>
              : <StyledLink to="/login">Entrar</StyledLink>
          }
        </LinkList>
      </Nav>
      
    </HeaderContainer>
  );
};

export default Header;
