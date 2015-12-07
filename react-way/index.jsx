//Import React Components
import React from 'react';
import ReactDOM from 'react-dom';

//Import Redux Components
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//Import Reducers to change Application State
import { accts } from './reducers/company';

//Import Action Constants
import * as cons from './constants/index'

//Import React Component
import TableDemo from './components/tabledemo';

//Setup reducers for Application
const reducer = combineReducers({accts:accts})

//Compose the middleware, redux DevTools, and apply the createStore Function
const finalCreateStore = compose(applyMiddleware(thunk),devTools())(createStore)

const store = finalCreateStore(reducer);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <TableDemo/>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('container')
);
