import * as React from 'react';

import './CurrencyConverter.scss';

import { currencyConverterService } from '../services/CurrencyConverterService';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyDropdown } from './CurrencyDropdown';
import { CurrencyConverterResult } from './CurrencyConverterResult';

export function CurrencyConverter() {
  const [currencies, setCurrencies] = React.useState([]);
  const fetchCurrencies = () => (
    currencyConverterService.currencies$.subscribe(setCurrencies)
  );

  React.useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleSelect = () => {
    currencyConverterService.hydrate();
    fetchCurrencies();
  };

  return (
    <div className="CurrencyConverter">
      <div className="CurrencyConverter__input">
        <CurrencyInput />
        <div className="CurrencyConverter__dropdown">
          <CurrencyDropdown
            currencies={currencies}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="CurrencyConverter__result">
        <CurrencyConverterResult />
      </div>
    </div>
  );
}
