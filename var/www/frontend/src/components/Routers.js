import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import Header from './organisms/Header';
import Top from './pages/Top';

const Routers = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path={'/'} component={Top} />
    </Switch>
  </Router>
);

export default Routers;