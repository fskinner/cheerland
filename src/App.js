import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components"

import { ProvideAuth } from "hooks/use-auth.js";

import Header from "./pages/Header"
import Rooms from "./pages/Rooms"
import Login from "./pages/Login"

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
            <Route path="/login" component={Login} />
            <Route path="/rooms" component={Rooms} />
            <Route exact path="/">
              <div>Início</div>
            </Route>
          </Switch>
        </MainContainer>
      </Router>
    </ProvideAuth>
  );
}
