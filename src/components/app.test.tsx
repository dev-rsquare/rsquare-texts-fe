import React from 'react';
import ReactDOM from 'react-dom';
import App from './wrapper.container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
