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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/rooms">
          <RoomList />
        </Route>
        <Route path="/room">
          <Room></Room>
        </Route>
        <Route path="/">
          <div
            style={{
              display: "flex",
              height: "100vh",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Link to="/login">
                <Button>login</Button>
              </Link>
              <Link to="/rooms">
                <Button>room list</Button>
              </Link>
              <Link to="/room">
                <Button>room</Button>
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
