import * as React from 'react';
import PropTypes from 'prop-types';

import './CurrencyConverter.scss';

import { TextInput } from './TextInput';
import { CurrencyDropdown } from './CurrencyDropdown';


export function CurrencyConverter() {
  return (
    <div className="CurrencyConverter">
      <div className="CurrencyInput">
        <TextInput />
        <CurrencyDropdown />
      </div>
    </div>
  );
}

CurrencyConverter.propTypes = {

};


CurrencyConverter.defaultProps = {

};
