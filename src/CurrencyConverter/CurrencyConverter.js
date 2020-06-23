import * as React from 'react';

import './CurrencyConverter.scss';

import { currencyConverterService } from '../services/CurrencyConverterService';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyDropdown } from './CurrencyDropdown';
import { CurrencyConverterResult } from './CurrencyConverterResult';

/**
 * Initial State
 */
const initialState = {
  currencyInput: '0.00',
  selectedCurrency: 'USD',
  currencies: [],
  conversions: [],
};

/**
 * Actions
 */
const FETCH_DATA = 'FETCH_DATA';
const CURRENCY_INPUT = 'CURRENCY_INPUT';
const CURRENCY_SELECT = 'CURRENCY_SELECT';
const RESET = 'RESET';

const handleFetchData = (state, {currencies}) => ({
  ...state,
  currencies,
});

const handleSelectCurrency = (
  state,
  {selectedCurrency, currencies, conversions}
) => ({
  ...state,
  currencies,
  selectedCurrency,
  conversions,
});

const handleCurrencyInput = (state, {currencyInput, conversions}) => ({
  ...state,
  currencyInput,
  conversions,
});

function reducer(state, {type, payload}) {
  switch (type) {
    case FETCH_DATA:
      return handleFetchData(state, payload);
    case CURRENCY_SELECT:
      return handleSelectCurrency(state, payload);
    case CURRENCY_INPUT:
      return handleCurrencyInput(state, payload);
    case RESET:
      return handleCurrencyInput(state, initialState);
    default:
      return initialState;
  }
}

export function CurrencyConverter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    currencyConverterService.currencies$.subscribe(
      currencies => dispatch({
        type: FETCH_DATA,
        payload: {
          currencies,
        },
      })
    );
  }, []);

  const handleSelect = selectedCurrency => {
    currencyConverterService.hydrate();

    currencyConverterService.selectedCurrency$.next(selectedCurrency);

    currencyConverterService.currencies$.subscribe(
      currencies => dispatch({
        type: CURRENCY_SELECT,
        payload: {
          selectedCurrency,
          currencies,
          conversions: !Number(state.currencyInput)
            ? initialState.conversions
            : currencyConverterService.convertCurrencies(
              selectedCurrency,
              state.currencyInput
            ),
        },
      })
    );
  };

  const handleInput = value => {
    const currencyInput = Number(value).toFixed(2);

    if (!Number(value)) {
      currencyConverterService.currencyInput$.next('');

      return dispatch({type: RESET});
    }

    currencyConverterService.currencyInput$.next(currencyInput);

    dispatch({
      type: CURRENCY_INPUT,
      payload: {
        currencyInput,
        conversions: currencyConverterService.convertCurrencies(
          state.selectedCurrency,
          currencyInput
        ),
      },
    });
  };

  const {
    currencyInput,
    selectedCurrency,
    currencies,
    conversions
  } = state;

  return (
    <div className="CurrencyConverter">
      <div className="CurrencyConverter__input">
        <CurrencyInput
          initialValue={currencyInput}
          onInputChange={handleInput}
        />
        <div className="CurrencyConverter__dropdown">
          <CurrencyDropdown
            selected={selectedCurrency}
            currencies={currencies}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="CurrencyConverter__result">
        <CurrencyConverterResult conversions={conversions} />
      </div>
    </div>
  );
}
