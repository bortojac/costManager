import { Provider } from 'react-redux';
import configureStore from './configureStore'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';

const store = configureStore()

export default class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}