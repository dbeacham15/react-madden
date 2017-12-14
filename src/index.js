import React from 'react';
import { render } from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/rootReducer';
import Root from './components/Root';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

render(<Root store = { store }/>, document.getElementById('root'));
registerServiceWorker();
