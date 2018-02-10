import React from 'react'
import { Route } from 'react-router'
import App from './components/App';
import Settings from './components/Settings/Settings';

export default (
  <Route path="/" component={App}>
    <Route component={Settings} />
    <Route path="/settings" component={Settings}/>  
    </Route>
)
