import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import "./CurrencyDropdown.scss";

import { Currency } from './Currency';

export function CurrencyDropdown({selected, currencies, onSelect}) {
  const [closed, setClosed] = React.useState(true);
  // const [selectedCurrency, selectCurrency] = React.useState(selected);
  const listClassNames = () => classnames(
    'CurrencyDropdown__list',
    {
      'CurrencyDropdown__list--open': !closed
    }
  );
  const openList = () => {
    if (!closed) return;
    setClosed(false);
  };
  const closeList = () => {
    if (closed) return;
    setClosed(true);
  };
  const handleSelect = currency => e => {
    onSelect(currency);
    closeList();
  };
  const list = currencies.filter(
    currency => currency !== selected
  );

  return (
    <div
      className="CurrencyDropdown"
      onMouseOver={openList}
      onFocus={openList}
      onMouseLeave={closeList}
      onBlur={closeList}
    >
      <div
        className="CurrencyDropdown__active"
      >
        <Currency name={selected} />
        <span className="CurrencyDropdown__caret" />
      </div>
        <div className={listClassNames()}>
        {list.map((currency, i) => (
          <div
            key={`${currency}-${i}`}
            className="CurrencyDropdown__item"
            onClick={handleSelect(currency)}
          >
            <Currency name={currency} />
          </div>
        ))}
        </div>
    </div>
  );
}

CurrencyDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    // PropTypes.shape(Currency.propTypes),
    PropTypes.string.isRequired,
  ),
  onSelect: PropTypes.func.isRequired,
};

CurrencyDropdown.defaultProps = {
  currencies: [],
};
