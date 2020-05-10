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

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/tv" exact component={TV} />
      <Route path="/tv/popular" render={() => <h1>Popular</h1>} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
