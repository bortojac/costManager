import { Provider } from 'react-redux';
import configureStore from './configureStore'
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Settings from './components/Settings/Settings';

const store = configureStore()

export default class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter >
        <Switch >
          <Route exact path="/" component={App} />
          <Route path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}