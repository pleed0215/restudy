import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "Components/Header";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route
        path="https://pleed0215.github.io/restudy/"
        exact
        component={Home}
      />
      <Route path="/search" component={Search} />
      <Route path="/tv" exact component={TV} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
