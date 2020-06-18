import React, { FC } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import "./App.scss";
import Login from "./containers/login";
import RoomList from "./containers/roomList";
import Room from "./containers/room";
import MakeRoom from "./containers/makeRoom";
import SignUp from "./containers/signUp";
import { instance } from "./api";

function RoutedApp() {
  const history = useHistory();
  instance.interceptors.response.use(
    (config) => config,
    (error) => {
      if (error.response?.status === 403) {
        history.push("/signin");
      }
      return Promise.reject(error);
    }
  );
  return (
    <Switch>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/room/:inviteCode">
        <Room />
      </Route>
      <Route path="/makeroom">
        <MakeRoom />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <RoomList />
      </Route>
    </Switch>
  );
}

const App: FC = () => {
  return (
    <BrowserRouter>
      <RoutedApp></RoutedApp>
    </BrowserRouter>
  );
};

export default App;
