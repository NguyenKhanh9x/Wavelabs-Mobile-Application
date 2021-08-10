import React from 'react';
import './App.css';
import MainLayout from './layout/MainLayout';
import Home from './page/home/home';
import WhatNew from './page/whatNew/whatNew';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HeaderLayout from './layout/LayoutHeader';

function App() {
  return (
    <BrowserRouter>
      <HeaderLayout />
      <MainLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/what-new" component={WhatNew} />
          <Route
            path="*"
            name="Not Found"
            render={() => <a>Page Not Found</a>}
          />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
