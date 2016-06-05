import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';


import App from './components/app';
import MainScreen from './components/MainScreen';
import SignUp from './components/Signup';
import Login from './components/Login';

import reducers from './reducers';

const middlewares = [ReduxPromise, routerMiddleware(browserHistory)];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replace) {
  const state = store.getState();
  const user = state.user;
  console.log("user is:");
  console.log(user);
  if (!user) {
    //not authenticated
    replace({ nextPathname: nextState.location.pathname }, '/login')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={MainScreen} onEnter={requireAuth}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/login' component={Login}/>
    </Router>
  </Provider>
  , document.querySelector('.container'));
