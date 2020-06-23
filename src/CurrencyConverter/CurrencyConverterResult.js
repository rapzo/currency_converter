import * as React from 'react';
import PropTypes from 'prop-types';

import './CurrencyConverterResult.scss';
import { CurrencyValue } from './CurrencyValue';

export function CurrencyConverterResult({conversions}) {
  const [result, setResult] = React.useState(conversions);

  React.useEffect(() => {
    setResult(conversions);
  }, [conversions]);

  if (result.length === 0) return (
    <div className="CurrencyConverterResult">
      <p className="CurrencyConverterResult__default">
        Enter an amount to check the rates.
      </p>
    </div>
  );

  return (
    <div className="CurrencyConverterResult">
      {result.map(({currency, price}) => (
        <CurrencyValue
          key={`currency-result_${currency}`}
          price={price}
          currency={currency}
        />
      ))}
    </div>
  );
}

CurrencyConverterResult.propTypes = {
  currencconversionsies: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }),
  ),
};

CurrencyConverterResult.defaultProps = {
  conversions: [],
};
