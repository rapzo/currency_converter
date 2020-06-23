import * as React from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import './CurrencyInput.scss';

export function CurrencyInput({initialValue, onInputChange}) {
  const inputRef = React.useRef();
  const input$ = new Subject().pipe(
    debounceTime(500),
  );

  React.useEffect(() => {
    const subscription = input$.subscribe(onInputChange);

    return () => subscription.unsubscribe();
  }, [input$, onInputChange]);

  const handleChangeValue = ({target}) => {
    const value = Number(target.value).toFixed(2);

    if (!value) return;

    input$.next(value);
  };

  return (
    <input
      type="number"
      step="0.01"
      min="0"
      placeholder={initialValue}
      className="CurrencyInput"
      onChange={handleChangeValue}
      ref={inputRef}
    />
  );
}

CurrencyInput.propTypes = {
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onInputChange: PropTypes.func.isRequired,
};

CurrencyInput.defaultProps = {
  initialValue: '0.00',
};
