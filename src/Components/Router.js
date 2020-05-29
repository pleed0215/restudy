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
      <Route
        path="https://pleed0215.github.io/restudy/search"
        component={Search}
      />
      <Route
        path="https://pleed0215.github.io/restudy/tv"
        exact
        component={TV}
      />
      <Route
        path="https://pleed0215.github.io/restudy/movie/:id"
        component={Detail}
      />
      <Route
        path="https://pleed0215.github.io/restudy/show/:id"
        component={Detail}
      />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
