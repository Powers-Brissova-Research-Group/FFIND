import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import PancreatlasApp from './PancreatlasApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <PancreatlasApp />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
