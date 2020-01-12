import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Export ReactDOM app.
ReactDOM.render(<App />, document.getElementById('root'));

// React serviceWorker setup.
serviceWorker.register();
