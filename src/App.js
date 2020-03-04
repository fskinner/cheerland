import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components"

import { ProvideAuth } from "hooks/use-auth.js";

import Header from "./components/Header"
import Rooms from "./pages/Rooms"
import Login from "./pages/Login"
import Users from "./pages/Users"

const MainContainer = styled.main`
  padding: 50px 10px;
`
export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Header />
        <MainContainer>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/users" component={Users} />
            <Route exact path="/">
              <div>Início</div>
            </Route>
          </Switch>
        </MainContainer>
      </Router>
    </ProvideAuth>
  );
}
