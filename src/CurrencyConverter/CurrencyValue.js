import * as React from 'react';
import PropTypes from 'prop-types';
import { Currency } from './Currency';

import './CurrencyValue.scss';

export function CurrencyValue({currency, price}) {
  return (
    <div className="CurrencyValue">
      <div className="CurrencyValue__price">
        {price}
      </div>
      <div className="CurrencyValue__currency">
        <Currency name={currency} />
      </div>
    </div>
  );
}

CurrencyValue.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
