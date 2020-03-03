import React from "react";
import styled from "styled-components";
import {
  NavLink,
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
const activeClassName = "nav-item-active"
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  padding: 5px;

  &.${activeClassName} {
    color: #c78c08;
    font-weight: bold;
    border-bottom: 3px solid #c78c08;
  }

  &:hover {
    border-bottom: 3px solid #c78c08;
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
            <StyledNavLink to="/rooms">Quartos</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">Usuários</StyledNavLink>
          </li>
          {auth.user &&
            <li>
              <UserGreeting>Olá, {auth.user.name}</UserGreeting>
            </li>
          }
          {
            auth.user ?
              <StyledNavLink to="/login" onClick={auth.deauth}>Sair</StyledNavLink>
              : <StyledNavLink to="/login">Entrar</StyledNavLink>
          }
        </LinkList>
      </Nav>
      
    </HeaderContainer>
  );
};

export default Header;
