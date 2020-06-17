import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import Login from "./containers/login";
import RoomList from "./containers/roomList";
import Room from "./containers/room";
import MakeRoom from "./containers/makeRoom";
import SignUp from "./containers/signUp";
import LogoBar from "./components/logobar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/makeroom">
          <MakeRoom />
        </Route>
        <Route path="/signup">
          <LogoBar />
          <SignUp />
        </Route>
        <Route path="/">
          <RoomList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
