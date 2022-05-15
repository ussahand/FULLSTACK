import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
console.clear();
console.log('REACT ROOT:index loaded :)')
  // <React.StrictMode>
  //  </React.StrictMode>
console.log('Environment is: ',process.env.NODE_ENV )
