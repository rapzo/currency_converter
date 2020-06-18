import * as React from 'react';
import PropTypes from 'prop-types';

import './CurrencyConverterResult.scss';

export function CurrencyConverterResult({currencies}) {
  return (
    <div className="CurrencyConverterResult">
      {currencies.length === 0 ? (
        <p className="CurrencyConverterResult__default">
          Enter an amount to check the rates.
        </p>
      ) : currencies.map(({currency, value}) => (
        <div key={`currency-result_${currency}`}>
          <span>{currency}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

CurrencyConverterResult.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
};

CurrencyConverterResult.defaultProps = {
  currencies: [],
};
