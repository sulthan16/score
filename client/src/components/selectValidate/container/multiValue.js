import React from 'react';
import PropTypes from 'prop-types';

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  ValueContainer.propTypes = {
    children: PropTypes.node
  };
  export default ValueContainer