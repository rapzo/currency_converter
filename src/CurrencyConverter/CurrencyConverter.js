import * as React from 'react';

import './CurrencyConverter.scss';

import { converter } from '../services/CurrencyConverterService';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyDropdown } from './CurrencyDropdown';
import { CurrencyConverterResult } from './CurrencyConverterResult';

export function CurrencyConverter() {

  converter();

  return (
    <div className="CurrencyConverter">
      <div className="CurrencyConverter__input">
        <CurrencyInput />
        <div className="CurrencyConverter__dropdown">
          <CurrencyDropdown />
        </div>
      </div>

      <div className="CurrencyConverter__result">
        <CurrencyConverterResult />
      </div>
    </div>
  );
}
