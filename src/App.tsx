import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./App.scss";
import Login from "./containers/login";
import RoomList from "./containers/roomList";
import Room from "./containers/room";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/rooms">
          <RoomList />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
