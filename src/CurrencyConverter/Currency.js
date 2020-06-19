import * as React from 'react';
import PropTypes from 'prop-types';
import { CurrencyConverterFlag } from './CurrencyConverterFlag';

import './Currency.scss';

export function Currency({name}) {
  return (
    <div className="Currency">
      <CurrencyConverterFlag
        currency={name}
        className="CurrencyDropdown__flag"
      />
      <span className="CurrencyDropdown__name">
        {name}
      </span>
    </div>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};
