import * as React from 'react';
import PropTypes from 'prop-types';

import './Currency.scss';

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

const createFlag = name => {
  const [small, medium, large] = getSources(name.toUpperCase());
  const srcSet = getSourceSets(small, medium, large);

  return {
    src: small,
    srcSet,
  };
};

export function Currency({name}) {
  const [{src, srcSet}, setState] = React.useState(createFlag(name));

  React.useEffect(() => {
    setState(createFlag(name));
  }, [name]);

  const handleError = ({target}) => {
    setState({
      src: defaultSmallSrc,
      srcSet: defaultSrcSet,
    });
  };

  return (
    <div className="Currency">
      <div className="Currency__flag">
        <img
          src={src}
          srcSet={srcSet}
          alt={name}
          onError={handleError}
          className=""
        />
      </div>
      <span className="Currency__name">
        {name}
      </span>
    </div>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};
