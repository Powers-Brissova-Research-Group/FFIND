import React from 'react';
import ReactDOM from 'react-dom';
import PancreatlasApp from './PancreatlasApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PancreatlasApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
