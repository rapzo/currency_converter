import * as React from 'react';
import PropTypes from 'prop-types';

import "./CurrencyDropdown.scss";

import { CurrencyConverterFlag } from './CurrencyConverterFlag';

export function CurrencyDropdown({selected, currencies}) {
  return (
    <div className="CurrencyDropdown">
      <div className="CurrencyDropdown__active">
        <CurrencyConverterFlag
          currency={'USD'}
          className="CurrencyDropdown__flag"
        />
        <span className="CurrencyDropdown__name">{selected}</span>
        <span className="CurrencyDropdown__caret" />
      </div>
      <div className="CurrencyDropdown__list">
        {currencies.map(currency => (
          <div
            key={currency}
            className="CurrencyDropdown__item"
          >
            <CurrencyConverterFlag
              currency={currency}
              className="CurrencyDropdown__flag"
            />
            <span className="CurrencyDropdown__name">
              {currency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

CurrencyDropdown.propTypes = {
  selected: PropTypes.string,
  currencies: PropTypes.arrayOf(
    PropTypes.string
  ),
};

CurrencyDropdown.defaultProps = {
  selected: 'USD',
  currencies: [
    'EUR',
    'BTC'
  ],
};
