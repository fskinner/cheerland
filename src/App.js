import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./pages/Header"
import Rooms from "./pages/Rooms"

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/login">
            <div>Login</div>
          </Route>
          <Route path="/rooms" component={Rooms} />
          <Route exact path="/">
            <div>Início</div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
