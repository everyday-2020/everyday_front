import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./containers/login";
import RoomList from "./containers/roomList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>
            <div>
              <Link to="login">login</Link>
            </div>
            <div>
              <Link to="rooms">room list</Link>
            </div>
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/rooms">
          <RoomList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
