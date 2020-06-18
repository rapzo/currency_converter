import * as React from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';

import './CurrencyInput.scss';

const {format} = new Intl.NumberFormat(
  navigator.locale
);

export function CurrencyInput({setValue}) {
  const initialValue = 0.00;
  const inputRef = React.useRef();
  const input$ = new BehaviorSubject(initialValue).pipe(
    debounceTime(1000),
  );

  input$.subscribe(value => {
    console.log(value)
  });

  const handleChangeValue = ({target}) => {
    input$.next(target.value);
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
