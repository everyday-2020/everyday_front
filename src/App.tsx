import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import Login from "./containers/login";
import RoomList from "./containers/roomList";
import Room from "./containers/room";
import MakeRoom from "./containers/makeRoom";
import SignUp from "./containers/signUp";

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
        <Route path="/makeroom">
          <MakeRoom />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
