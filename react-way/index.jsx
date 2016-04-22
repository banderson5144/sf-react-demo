//Import React Components
import React from 'react';
import ReactDOM from 'react-dom';

//Import Redux Components
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
// import { devTools } from 'redux-devtools';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//Import Reducers to change Application State
import { accts } from './reducers/company';

//Import Action Constants
import * as cons from './constants/index'

//Import React Component
import TableDemo from './components/tabledemo';
import ModalDemo from './components/modaldemo';
import WizardDemo from './components/wizardDemo';
import Wizard2Demo from './components/wizard2demo';
import Page1Demo from './components/page1';
import Page2Demo from './components/page2';
import Page3Demo from './components/page3';
import Page4Demo from './components/page4';
import Page5Demo from './components/page5';
import Page6Demo from './components/page6';

//Setup reducers for Application
const reducer = combineReducers({accts:accts})

//Compose the middleware, redux DevTools, and apply the createStore Function
const finalCreateStore = compose(applyMiddleware(thunk))(createStore)

const store = finalCreateStore(reducer);

const someStages = [
                    {
                      stageName:'First Stage',
                      pageContent:<Page1Demo/>
                    },
                    {
                      stageName:'Second Stage',
                      pageContent:<Page2Demo/>
                    },
                    {
                      stageName:'Third Stage',
                      pageContent:<Page3Demo/>
                    },
                    {
                      stageName:'Fouth Stage',
                      pageContent:<Page4Demo/>
                    },
                    {
                      stageName:'Fifth Stage',
                      pageContent:<Page5Demo/>
                    },
                    {
                      stageName:'Sixth Stage',
                      pageContent:<Page6Demo/>
                    }
                  ];

ReactDOM.render(
    <Provider store={store}>
        <Wizard2Demo stages={someStages}/>
    </Provider>,
  document.getElementById('container')
);
