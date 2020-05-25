import React, { Component, useState, useEffect, useRef } from "react";
import App from "./App";
import Stats from "./Components/Stats/Stats"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './Components/Routes/Routes.js';   

function Main() {
  return (
    <Router>
      <div>
        <Switch>
          <Route initial={true} exact path={ROUTES.HOME} component={App} />
          <Route exact path={ROUTES.STATS} component={Stats} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
