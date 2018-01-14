import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/appReducer';

const store = createStore(
  appReducer
);

WebFont.load({
  google: {
    families: ['Coda', 'cursive']
  }
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
