import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import "babel-polyfill";

require('./client.scss');
let Settings = require('./../constraints/settings.json');

import Home from './home/home.component';

class App extends React.Component {
  constructor() {
    super();
    if (__DEV__) {
      console.log("DEV mod is active.");
    }
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={browserHistory}>
    <Route path={Settings.uBaseNameForWebPack} component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));
