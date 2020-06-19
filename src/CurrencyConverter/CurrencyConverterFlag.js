import * as React from 'react';
import PropTypes from 'prop-types';

const getSrc = filename => `/assets/${filename}`;
const getSources = (name, ext = 'png') => [
  getSrc(`${name}.${ext}`),
  getSrc(`${name}@2x.${ext}`),
  getSrc(`${name}@3x.${ext}`),
];
const getSourceSets = (small, medium, large) => (
  `${small} 300w, ${medium} 768w, ${large} 1280w`
);

const defaultFlag = 'Crypto';
const [
  defaultSmallSrc,
  defaultMediumSrc,
  defaultLargeSrc,
] = getSources(defaultFlag);
const defaultSrcSet = getSourceSets(
  defaultSmallSrc,
  defaultMediumSrc,
  defaultLargeSrc,
);

export function CurrencyConverterFlag({currency, className}) {
  const [small, medium, large] = getSources(currency.toUpperCase());
  const srcSet = getSourceSets(small, medium, large);
  const [state, setState] = React.useState({
    src: small,
    srcSet,
  });

  const handleError = ({target}) => {
    setState({
      src: defaultSmallSrc,
      srcSet: defaultSrcSet,
    });
  };

  return (
    <img
      src={state.src}
      srcSet={state.srcSet}
      alt={currency}
      onError={handleError}
      className={className}
    />
  );
}

CurrencyConverterFlag.propTypes = {
  currency: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CurrencyConverterFlag.defaultProps = {
  className: 'CurrencyConverterFlag__image',
};
