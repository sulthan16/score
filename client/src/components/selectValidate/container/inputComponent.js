import React from 'react';
import PropTypes from 'prop-types';

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([
      PropTypes.func
    ]),
  };

export default inputComponent;
  