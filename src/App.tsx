import React, { FC } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { configure } from "axios-hooks";

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
      if (error.response?.status === 401) {
        history.push(`/signin?redirect=${history.location.pathname}`);
      } else if (error.response && error.response?.status !== 403) {
        console.log(error);
        alert(error.response.body?.join(" ") || "Failed");
      }
      return Promise.reject(error);
    }
  );
  configure({ cache: false, axios: instance });

  return (
    <Switch>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/room/create">
        <MakeRoom />
      </Route>
      <Route path="/room/:inviteCode">
        <Room />
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
