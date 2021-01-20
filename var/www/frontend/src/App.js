import React from 'react';
import ReactDOM from 'react-dom';

import Test from './Test';

const App = () => {
  return (
    <div>
      <h1>Hello World!?</h1> 
      <Test test="わろた" />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));