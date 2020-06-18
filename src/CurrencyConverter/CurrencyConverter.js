import * as React from 'react';
import PropTypes from 'prop-types';

import './CurrencyConverter.scss';

import { converter } from './CurrencyConverterService';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyDropdown } from './CurrencyDropdown';


export function CurrencyConverter() {

  converter();

  return (
    <div className="CurrencyConverter">
      <div className="InputControl">
        <CurrencyInput />
        <CurrencyDropdown />
      </div>
    </div>
  );
}

CurrencyConverter.propTypes = {

};


CurrencyConverter.defaultProps = {

};
