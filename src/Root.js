//import { Provider } from 'react-redux'
//import configureStore from './configureStore'
import React from 'react';
import App from './components/App/App';

//const store = configureStore()

export default class Root extends React.Component {
  render() {
    return (
     // <Provider store={store}>
        <App />
      //</Provider>
    )
  }
}