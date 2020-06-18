import React from 'react';
import { CurrencyConverter } from './components/CurrencyConverter';

import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1 className="title">Currency Converter</h1>
      <h2 className="subtitle">
        Receive competitive and transparent pricing with no hidden spreads. See how we compare.
      </h2>

      <CurrencyConverter />
    </div>
  );
}

export default App;
