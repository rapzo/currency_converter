import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import "./CurrencyDropdown.scss";

import { CurrencyConverterFlag } from './CurrencyConverterFlag';
import { Currency } from './Currency';

export function CurrencyDropdown({selected, currencies, onSelect}) {
  const [closed, setClosed] = React.useState(true);
  const listClassNames = () => classnames(
    'CurrencyDropdown__list',
    {
      'CurrencyDropdown__list--open': !closed
    }
  );
  const openList = () => (
    setClosed(false)
  );
  const closeList = () => (
    setClosed(true)
  );
  const handleSelect = ({target}) => {
    console.log(target);
    closeList();
    onSelect();
  };

  return (
    <div
      className="CurrencyDropdown"
      onMouseOver={openList}
      onMouseOut={closeList}
    >
      <div className="CurrencyDropdown__active">
        <CurrencyConverterFlag
          currency={'USD'}
          className="CurrencyDropdown__flag"
        />
        <span className="CurrencyDropdown__name">{selected}</span>
        <span className="CurrencyDropdown__caret" />
      </div>
      <div className={listClassNames()}>
        {currencies.map((currency, i) => (
          <div
            key={`${currency}-${i}`}
            className="CurrencyDropdown__item"
            onClick={handleSelect}
          >
            <Currency name={currency} />
          </div>
        ))}
      </div>
    </div>
  );
}

CurrencyDropdown.propTypes = {
  selected: PropTypes.string,
  currencies: PropTypes.arrayOf(
    // PropTypes.shape(Currency.propTypes),
    PropTypes.string.isRequired,
  ),
  onSelect: PropTypes.func.isRequired,
};

CurrencyDropdown.defaultProps = {
  selected: 'USD',
  currencies: [],
};
