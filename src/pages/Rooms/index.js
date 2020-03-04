import React from "react"
import { Route, Switch } from "react-router-dom"

import RoomList from "./components/List"
import RoomDetail from "./components/Detail"
import NewRoom from "./components/New"

export default function() {
  return (
    <Switch>
      <Route exact path="/rooms/new" component={NewRoom}/>
      <Route exact path="/rooms/:roomId" component={RoomDetail}/>
      <Route path="/rooms" component={RoomList}/>
    </Switch>
  )
}
