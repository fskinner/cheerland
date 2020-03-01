import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import Header from "./containers/Header"
import Rooms from "./containers/Rooms"

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/login">
            {/* <About /> */}
            <div>Login</div>
          </Route>
          <Route path="/rooms">
            {/* <Topics /> */}
            <Rooms/>
          </Route>
          <Route path="/">
            {/* <Home /> */}
            <div>Início</div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
