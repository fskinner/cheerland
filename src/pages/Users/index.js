import React from "react"
import { Route, Switch } from "react-router-dom"

import UserList from "./components/List"
// import UserDetail from "./components/Detail"
import NewUser from "./components/New"

export default function() {
  return (
    <Switch>
      <Route exact path="/users/new" component={NewUser} />
      {/* <Route exact path="/users/:userId" component={UserDetail} /> */}
      <Route path="/users" component={UserList} />
    </Switch>
  )
}
